import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const snapshot = await getDocs(collection(db, "subjects"));
      const data = snapshot.docs.map(doc => doc.data().name);
      setSubjects(data);
    };
    fetchSubjects();
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">📚 Subjects</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {subjects.map((subject, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/70 backdrop-blur-sm shadow-xl border border-gray-200 rounded-2xl p-5 text-center text-gray-800 text-lg font-medium"
          >
            {subject}
          </motion.div>
        ))}
      </div>
    </div>
  );
}