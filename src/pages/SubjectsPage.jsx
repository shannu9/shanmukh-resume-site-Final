import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

/* SEO Metadata (for index.html head):
  <title>Subjects – Shanmukh Sri Surya Gopi</title>
  <meta name="description" content="Subjects organized by program from MBA and B.Tech degrees. Includes AI, Analytics, Cloud Computing, and more.">
  <meta name="keywords" content="Subjects, MBA, B.Tech, Analytics, AI, Python, Cloud">
*/

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState({});

  useEffect(() => {
    const fetchSubjects = async () => {
      const snapshot = await getDocs(collection(db, "subjects"));
      const rawData = snapshot.docs.map(doc => doc.data());

      const grouped = rawData.reduce((acc, sub) => {
        if (!acc[sub.program]) acc[sub.program] = [];
        acc[sub.program].push(sub.name);
        return acc;
      }, {});
      setSubjects(grouped);
    };
    fetchSubjects();
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
              {list.map((subj, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow border border-gray-200 text-center text-lg font-medium text-gray-800 hover:scale-105 transition transform"
                >
                  {subj}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
