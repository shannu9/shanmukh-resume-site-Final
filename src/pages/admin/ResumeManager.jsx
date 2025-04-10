import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const ResumeSection = ({ title, data, onDelete, onSubmit, fields }) => {
  const [input, setInput] = useState({});

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
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
          <li key={i} className="flex justify-between border-b pb-1">
            <span>{Object.values(item).join(' / ')}</span>
            <button onClick={() => onDelete(item.id)} className="text-red-600 hover:underline">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function AdminResumeManager() {
  const sections = [
    { key: 'resume_contact', title: '📞 Contact', fields: ['email', 'phone', 'linkedin'] },
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
    await addDoc(collection(db, key), input);
    window.location.reload();
  };

  const handleDelete = async (key, id) => {
    await deleteDoc(doc(db, key, id));
    setData(prev => ({
      ...prev,
      [key]: prev[key].filter(d => d.id !== id)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">🧾 Resume Content Manager</h1>
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {sections.map(section => (
          <ResumeSection
            key={section.key}
            title={section.title}
            data={data[section.key] || []}
            fields={section.fields}
            onDelete={(id) => handleDelete(section.key, id)}
            onSubmit={(e, input) => handleAdd(e, input, section.key)}
          />
        ))}
      </div>
    </div>
  );
}
