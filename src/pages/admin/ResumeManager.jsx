import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const ResumeSection = ({ title, data, onDelete, onSubmit, onUpdate, fields }) => {
  const [input, setInput] = useState({});
  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border shadow space-y-4">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <form onSubmit={(e) => onSubmit(e, input)} className="space-y-3">
        {fields.map(field => (
          <input
            key={field}
            name={field}
            onChange={handleChange}
            placeholder={field}
            className="w-full border rounded px-3 py-2"
            required
          />
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add</button>
      </form>
      <ul className="text-sm text-gray-700 space-y-2">
        {data.map((item, i) => (
          <li key={item.id} className="border-b pb-1">
            {editId === item.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onUpdate(item.id, editValues);
                  setEditId(null);
                }}
                className="space-y-2"
              >
                {fields.map(f => (
                  <input
                    key={f}
                    name={f}
                    defaultValue={item[f]}
                    onChange={handleEditChange}
                    className="w-full border px-2 py-1 rounded"
                  />
                ))}
                <div className="flex gap-2">
                  <button type="submit" className="text-green-600 hover:underline">Save</button>
                  <button type="button" onClick={() => setEditId(null)} className="text-gray-500 hover:underline">Cancel</button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-center">
                <span>{fields.map(f => item[f]).join(" / ")}</span>
                <div className="flex gap-3">
                  <button onClick={() => setEditId(item.id)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => onDelete(item.id)} className="text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function ResumeManager() {
  const sections = [
    { key: 'resume_contact', title: '📞 Contact', fields: ['email', 'phone', 'linkedin', 'headline'] },
    { key: 'resume_skills', title: '🛠 Skills', fields: ['name'] },
    { key: 'resume_experience', title: '💼 Experience', fields: ['company', 'role', 'description'] },
    { key: 'resume_education', title: '🎓 Education', fields: ['institution', 'degree', 'period'] },
    { key: 'resume_projects', title: '📊 Projects', fields: ['title'] },
    { key: 'resume_activities', title: '🏆 Activities', fields: ['name'] }
  ];

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchAll = async () => {
      const allData = {};
      for (const section of sections) {
        const snap = await getDocs(collection(db, section.key));
        allData[section.key] = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
      setData(allData);
    };
    fetchAll();
  }, []);

  const handleAdd = async (e, input, key) => {
    e.preventDefault();
    const sanitized = {};
    sections.find(s => s.key === key).fields.forEach(f => {
      sanitized[f] = input[f];
    });
    await addDoc(collection(db, key), sanitized);
    window.location.reload();
  };

  const handleDelete = async (key, id) => {
    await deleteDoc(doc(db, key, id));
    setData(prev => ({
      ...prev,
      [key]: prev[key].filter(d => d.id !== id)
    }));
  };

  const handleUpdate = async (key, id, updates) => {
    await updateDoc(doc(db, key, id), updates);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">🧾 Resume Content Manager (Edit Enabled)</h1>
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {sections.map(section => (
          <ResumeSection
            key={section.key}
            title={section.title}
            data={data[section.key] || []}
            fields={section.fields}
            onDelete={(id) => handleDelete(section.key, id)}
            onSubmit={(e, input) => handleAdd(e, input, section.key)}
            onUpdate={(id, input) => handleUpdate(section.key, id, input)}
          />
        ))}
      </div>
    </div>
  );
}
