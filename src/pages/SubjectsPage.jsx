import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

/* SEO Metadata (for index.html head):
  <title>Subjects – Shanmukh Sri Surya Gopi</title>
  <meta name="description" content="Subjects organized by program from MBA and B.Tech degrees. Includes AI, Analytics, Cloud Computing, and more.">
  <meta name="keywords" content="Subjects, MBA, B.Tech, Analytics, AI, Python, Cloud">
*/

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState({});
  const [linkedSubjects, setLinkedSubjects] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const subjSnap = await getDocs(collection(db, "subjects"));
      const subjectData = subjSnap.docs.map(doc => doc.data());

      const projSnap = await getDocs(collection(db, "projects"));
      const allProjects = projSnap.docs.map(doc => doc.data());
      const taggedSubjects = new Set();
      allProjects.forEach(proj => {
        (proj.subjects || []).forEach(sub => taggedSubjects.add(sub));
      });

      const grouped = subjectData.reduce((acc, sub) => {
        if (!acc[sub.program]) acc[sub.program] = [];
        acc[sub.program].push(sub.name);
        return acc;
      }, {});
      setSubjects(grouped);
      setLinkedSubjects(taggedSubjects);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">📚 Subjects by Program</h1>
      <div className="max-w-6xl mx-auto space-y-10">
        {Object.entries(subjects).map(([program, list], index) => (
          <div key={program}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-xl font-semibold text-gray-800 mb-4"
            >
              {program}
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {list.map((subj, idx) => {
                const isLinked = linkedSubjects.has(subj);
                return (
                  <motion.div
                    key={idx}
                    onClick={() => isLinked && navigate(`/projects?subject=${encodeURIComponent(subj)}`)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className={`p-5 rounded-xl shadow border border-gray-200 text-center text-lg font-medium ${
                      isLinked
                        ? "bg-white/80 text-gray-800 hover:scale-105 cursor-pointer transition transform"
                        : "bg-gray-200 text-gray-500 cursor-default"
                    }`}
                  >
                    {subj}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
