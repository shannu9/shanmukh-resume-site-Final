import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function SubjectsManager() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState('');
  const [program, setProgram] = useState('MBA');

  useEffect(() => {
    const fetchSubjects = async () => {
      const snapshot = await getDocs(collection(db, 'subjects'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubjects(data);
    };
    fetchSubjects();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await addDoc(collection(db, 'subjects'), { name: name.trim(), program });
    setName('');
    setProgram('MBA');
    const snapshot = await getDocs(collection(db, 'subjects'));
    setSubjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'subjects', id));
    setSubjects(subjects.filter(sub => sub.id !== id));
  };

  const groupedSubjects = subjects.reduce((acc, sub) => {
    if (!acc[sub.program]) acc[sub.program] = [];
    acc[sub.program].push(sub);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">📚 Manage Subjects</h1>

      <form onSubmit={handleAdd} className="max-w-md mx-auto bg-white/80 p-6 rounded-xl shadow border border-gray-200 mb-10 space-y-4">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Subject Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <select className="w-full border rounded px-3 py-2" value={program} onChange={e => setProgram(e.target.value)}>
          <option value="MBA">MBA in Analytics</option>
          <option value="B.Tech">B.Tech</option>
          <option value="Certification">Certification</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add Subject</button>
      </form>

      <div className="max-w-5xl mx-auto space-y-10">
        {Object.entries(groupedSubjects).map(([prog, subs]) => (
          <div key={prog}>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{prog}</h2>
            <div className="flex flex-wrap gap-2">
              {subs.map(sub => (
                <span
                  key={sub.id}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm inline-flex items-center gap-2"
                >
                  {sub.name}
                  <button
                    onClick={() => handleDelete(sub.id)}
                    className="text-red-500 hover:text-red-700 ml-1 text-xs"
                    title="Delete"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
