import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, "projects"));
      const data = snapshot.docs.map(doc => doc.data());
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">💼 My Projects</h1>
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white/60 backdrop-blur shadow-lg border border-gray-200 rounded-2xl p-5"
          >
            {project.imageUrl && (
              <img src={project.imageUrl} alt={project.title} className="rounded-xl mb-3 h-40 w-full object-cover" />
            )}
            <h2 className="text-xl font-semibold mb-1">{project.title} <span>{project.type}</span></h2>
            <p className="text-gray-700 mb-2">{project.description || "No description provided."}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map(tag => (
                <span key={tag} className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
