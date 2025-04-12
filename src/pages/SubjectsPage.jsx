import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

/* SEO Metadata (for index.html head):
  <title>Subjects – Shanmukh Sri Surya Gopi</title>
  <meta name="description" content="Subjects covered during MBA and B.Tech programs including Business Analytics, Python Programming, AI, and more.">
  <meta name="keywords" content="Subjects, Shanmukh, MBA, B.Tech, Python, Data Science, Cloud Computing">
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
            <div className="flex flex-wrap gap-3">
              {list.map((subj, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm shadow"
                >
                  {subj}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
