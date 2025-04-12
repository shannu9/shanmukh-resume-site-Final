import { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', type: 'Tool', tags: '', subjects: '', image: null });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchProjects = async () => {
    const snapshot = await getDocs(collection(db, "projects"));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault();
    const { title, description, type, tags, subjects, image } = form;
    let imageUrl = '';
    if (image) {
      const imageRef = ref(storage, `projects/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    const newProject = {
      title,
      description,
      type,
      tags: tags.split(',').map(t => t.trim()),
      subjects: subjects.split(',').map(s => s.trim()),
      imageUrl
    };

    await addDoc(collection(db, "projects"), newProject);
    setForm({ title: '', description: '', type: 'Tool', tags: '', subjects: '', image: null });
    fetchProjects();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "projects", id));
    fetchProjects();
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    setEditForm({ ...editForm, [name]: files ? files[0] : value });
  };

  const handleEditSubmit = async (id) => {
    let updates = {
      title: editForm.title,
      description: editForm.description,
      type: editForm.type,
      tags: editForm.tags.split(',').map(t => t.trim()),
      subjects: editForm.subjects.split(',').map(s => s.trim())
    };

    if (editForm.image) {
      const imageRef = ref(storage, `projects/${editForm.image.name}`);
      await uploadBytes(imageRef, editForm.image);
      updates.imageUrl = await getDownloadURL(imageRef);
    }

    await updateDoc(doc(db, "projects", id), updates);
    setEditingId(null);
    setEditForm({});
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">🛠 Manage Projects (with Edit)</h1>

      <form onSubmit={handleAddProject} className="max-w-xl mx-auto bg-white/70 p-6 rounded-xl shadow border border-gray-200 mb-10 space-y-4">
        <input className="w-full border rounded px-3 py-2" placeholder="Project Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <textarea className="w-full border rounded px-3 py-2" placeholder="Description" rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <select className="w-full border rounded px-3 py-2" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
          <option>Tool</option>
          <option>Blog</option>
          <option>Presentation</option>
          <option>Case Study</option>
          <option>Research</option>
          <option>MVP</option>
        </select>
        <input className="w-full border rounded px-3 py-2" placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
        <input className="w-full border rounded px-3 py-2" placeholder="Subjects (comma separated)" value={form.subjects} onChange={e => setForm({ ...form, subjects: e.target.value })} />
        <input type="file" accept="image/*" onChange={e => setForm({ ...form, image: e.target.files[0] })} className="w-full" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add Project</button>
      </form>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map(p => (
          <div key={p.id} className="bg-white/80 p-4 rounded-xl shadow border border-gray-200">
            {editingId === p.id ? (
              <div className="space-y-2">
                <input className="w-full border px-2 py-1 rounded" defaultValue={p.title} name="title" onChange={handleEditChange} />
                <textarea className="w-full border px-2 py-1 rounded" rows="2" defaultValue={p.description} name="description" onChange={handleEditChange} />
                <select name="type" defaultValue={p.type} onChange={handleEditChange} className="w-full border px-2 py-1 rounded">
                  <option>Tool</option>
                  <option>Blog</option>
                  <option>Presentation</option>
                  <option>Case Study</option>
                  <option>Research</option>
                  <option>MVP</option>
                </select>
                <input className="w-full border px-2 py-1 rounded" name="tags" defaultValue={p.tags?.join(', ')} onChange={handleEditChange} />
                <input className="w-full border px-2 py-1 rounded" name="subjects" defaultValue={p.subjects?.join(', ')} onChange={handleEditChange} />
                <input type="file" name="image" accept="image/*" onChange={handleEditChange} />
                <div className="flex gap-2">
                  <button onClick={() => handleEditSubmit(p.id)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Save</button>
                  <button onClick={() => setEditingId(null)} className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">Cancel</button>
                </div>
              </div>
            ) : (
              <>
                {p.imageUrl && <img src={p.imageUrl} alt="" className="rounded mb-2 object-cover h-40 w-full" />}
                <h2 className="text-lg font-semibold">{p.title} <span className="text-sm text-gray-500">({p.type})</span></h2>
                <p className="text-sm text-gray-700 mt-1 mb-2">{p.description}</p>
                <div className="text-xs text-gray-600">Tags: {p.tags?.join(', ')}</div>
                <div className="text-xs text-gray-600">Subjects: {p.subjects?.join(', ')}</div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => { setEditingId(p.id); setEditForm(p); }} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
