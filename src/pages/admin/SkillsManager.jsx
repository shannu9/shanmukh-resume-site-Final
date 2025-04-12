import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  orderBy
} from "firebase/firestore";

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [dragIndex, setDragIndex] = useState(null);

  const fetchSkills = async () => {
    const q = query(collection(db, "resume_skills"), orderBy("order"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d, i) => ({ id: d.id, ...d.data(), index: i }));
    setSkills(data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAdd = async () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    const alreadyExists = skills.some(s => s.name.toLowerCase() === trimmed.toLowerCase());
    if (alreadyExists) {
      alert("Skill already exists.");
      return;
    }
    await addDoc(collection(db, "resume_skills"), {
      name: trimmed,
      order: skills.length
    });
    setNewSkill("");
    fetchSkills();
  };

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDrop = (dropIndex) => {
    if (dragIndex === null || dragIndex === dropIndex) return;
    const reordered = [...skills];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, moved);
    setSkills(reordered.map((skill, i) => ({ ...skill, order: i })));
    setDragIndex(null);
  };

  const saveOrder = async () => {
    for (let i = 0; i < skills.length; i++) {
      const skill = skills[i];
      const ref = doc(db, "resume_skills", skill.id);
      await updateDoc(ref, { order: i });
    }
    alert("Skill order updated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">🧠 Manage Resume Skills</h1>

      <div className="max-w-xl mx-auto flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Add new skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="flex-1 px-3 py-2 border rounded shadow-sm"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      <div className="max-w-xl mx-auto space-y-3">
        {skills.map((skill, i) => (
          <div
            key={skill.id}
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(i)}
            className="cursor-move bg-white/80 px-4 py-2 rounded shadow border border-gray-200 text-gray-800 hover:bg-white"
          >
            {skill.name}
          </div>
        ))}
      </div>

      <div className="max-w-xl mx-auto mt-6 text-center">
        <button
          onClick={saveOrder}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Save Order
        </button>
      </div>
    </div>
  );
}
