import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  deleteDoc
} from "firebase/firestore";

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [dragIndex, setDragIndex] = useState(null);

  const fetchSkills = async () => {
    const resumeSnap = await getDocs(query(collection(db, "resume_skills"), orderBy("order")));
    const resumeSkills = resumeSnap.docs.map((d, i) => ({ id: d.id, ...d.data(), index: i }));
    setSkills(resumeSkills);

    const projectSnap = await getDocs(collection(db, "projects"));
    const tags = projectSnap.docs.flatMap(doc => doc.data().tags || []).map(t => t.trim());
    const combined = [...resumeSkills.map(s => s.name), ...tags];
    const deduped = Array.from(new Set(combined.filter(Boolean))).sort();
    setAllSkills(deduped);
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

  const handleEdit = (skill) => {
    setEditId(skill.id);
    setEditName(skill.name);
  };

  const handleEditSave = async () => {
    if (!editName.trim()) return;
    const ref = doc(db, "resume_skills", editId);
    await updateDoc(ref, { name: editName.trim() });
    setEditId(null);
    setEditName("");
    fetchSkills();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "resume_skills", id));
    fetchSkills();
  };

  const handleDragStart = (index) => setDragIndex(index);

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

      <div className="max-w-xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">🔃 Reorderable Resume Skills</h2>
        <div className="space-y-2 mb-6">
          {skills.map((skill, i) => (
            <div
              key={skill.id}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(i)}
              className="cursor-move bg-white/90 px-4 py-2 rounded shadow border border-gray-300 text-gray-800 hover:bg-white flex items-center justify-between gap-2"
            >
              {editId === skill.id ? (
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-grow border px-2 py-1 rounded text-sm"
                />
              ) : (
                <span className="flex-grow">{i + 1}. {skill.name}</span>
              )}

              {editId === skill.id ? (
                <>
                  <button onClick={handleEditSave} className="text-green-600 text-xs hover:underline">Save</button>
                  <button onClick={() => setEditId(null)} className="text-gray-500 text-xs hover:underline">Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(skill)} className="text-blue-600 text-xs hover:underline">Edit</button>
                  <button onClick={() => handleDelete(skill.id)} className="text-red-500 text-xs hover:underline">Delete</button>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mb-10">
          <button
            onClick={saveOrder}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Save Order
          </button>
        </div>

        <h2 className="text-lg font-semibold text-gray-700 mb-2">📦 All Skills Found in Projects & Resume</h2>
        <div className="flex flex-wrap gap-2 mb-10">
          {allSkills.map((s, i) => (
            <span key={i} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
