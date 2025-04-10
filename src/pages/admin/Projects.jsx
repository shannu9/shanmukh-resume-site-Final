import { useState, useEffect } from 'react';
import { db, storage } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProjectManager() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Blog');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/admin");
      return;
    }

    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, "projects"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
    };
    fetchProjects();
  }, [user, navigate]);

  const handleAddProject = async (e) => {
    e.preventDefault();
    let imageUrl = '';
    if (image) {
      const imageRef = ref(storage, `projects/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }
    await addDoc(collection(db, "projects"), {
      title, type, tags: tags.split(',').map(t => t.trim()), imageUrl
    });
    alert("Project added!");
    setTitle(''); setType('Blog'); setTags(''); setImage(null);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "projects", id));
    setProjects(projects.filter(p => p.id !== id));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">🛠 Manage Projects</h1>
      <form onSubmit={handleAddProject} className="max-w-xl mx-auto bg-white/70 p-6 rounded-xl shadow border border-gray-200 mb-10 space-y-4">
        <input className="w-full border rounded px-3 py-2" placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <select className="w-full border rounded px-3 py-2" value={type} onChange={e => setType(e.target.value)}>
          <option>Blog</option>
          <option>Tool</option>
        </select>
        <input className="w-full border rounded px-3 py-2" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="w-full" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add Project</button>
      </form>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map(p => (
          <div key={p.id} className="bg-white/80 p-4 rounded-xl shadow border border-gray-200">
            {p.imageUrl && <img src={p.imageUrl} alt="" className="rounded mb-2 object-cover h-40 w-full" />}
            <h2 className="text-lg font-semibold">{p.title} <span className="text-sm text-gray-500">({p.type})</span></h2>
            <div className="text-sm text-gray-600 mt-1">Tags: {p.tags.join(', ')}</div>
            <button onClick={() => handleDelete(p.id)} className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
