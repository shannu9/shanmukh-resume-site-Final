import { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function CertificationsManager() {
  const [certs, setCerts] = useState([]);
  const [form, setForm] = useState({ title: "", issuer: "", image: null });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchCerts = async () => {
    const snap = await getDocs(collection(db, "certifications"));
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCerts(data);
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const { title, issuer, image } = form;
    let imageUrl = "";

    if (image) {
      const imageRef = ref(storage, `certifications/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    await addDoc(collection(db, "certifications"), { title, issuer, imageUrl });
    setForm({ title: "", issuer: "", image: null });
    fetchCerts();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "certifications", id));
    fetchCerts();
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    setEditForm({ ...editForm, [name]: files ? files[0] : value });
  };

  const handleEditSubmit = async (id) => {
    const updates = {
      title: editForm.title,
      issuer: editForm.issuer
    };

    if (editForm.image) {
      const imageRef = ref(storage, `certifications/${editForm.image.name}`);
      await uploadBytes(imageRef, editForm.image);
      updates.imageUrl = await getDownloadURL(imageRef);
    }

    await updateDoc(doc(db, "certifications", id), updates);
    setEditingId(null);
    setEditForm({});
    fetchCerts();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">📜 Manage Certifications (with Edit)</h1>

      <form onSubmit={handleAdd} className="max-w-xl mx-auto bg-white/70 p-6 rounded-xl shadow border border-gray-200 mb-10 space-y-4">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Certificate Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Issuer (e.g. Salesforce, Google)"
          value={form.issuer}
          onChange={(e) => setForm({ ...form, issuer: e.target.value })}
        />
        <input type="file" accept="image/*,.pdf" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} className="w-full" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add Certification</button>
      </form>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {certs.map((c) => (
          <div key={c.id} className="bg-white/80 p-4 rounded-xl shadow border border-gray-200">
            {editingId === c.id ? (
              <>
                <input
                  className="w-full border px-2 py-1 rounded mb-2"
                  name="title"
                  defaultValue={c.title}
                  onChange={handleEditChange}
                />
                <input
                  className="w-full border px-2 py-1 rounded mb-2"
                  name="issuer"
                  defaultValue={c.issuer}
                  onChange={handleEditChange}
                />
                <input type="file" name="image" accept="image/*" onChange={handleEditChange} />
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleEditSubmit(c.id)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Save</button>
                  <button onClick={() => setEditingId(null)} className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">Cancel</button>
                </div>
              </>
            ) : (
              <>
                {c.imageUrl && (
                  <img src={c.imageUrl} alt={c.title} className="rounded mb-2 object-contain h-48 w-full" />
                )}
                <h2 className="text-lg font-semibold text-gray-800">{c.title}</h2>
                <p className="text-sm text-gray-600">{c.issuer}</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => { setEditingId(c.id); setEditForm(c); }} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
                  <button onClick={() => handleDelete(c.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
