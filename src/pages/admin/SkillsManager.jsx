import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy
} from "firebase/firestore";

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      const q = query(collection(db, "resume_skills"), orderBy("order"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d, i) => ({ id: d.id, ...d.data(), index: i }));
      setSkills(data);
    };
    fetchSkills();
  }, []);

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
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">🧠 Reorder Resume Skills</h1>
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Order
        </button>
      </div>
    </div>
  );
}
