import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";

/* SEO Metadata (for index.html head):
  <title>Projects – Shanmukh Sri Surya Gopi</title>
  <meta name="description" content="Explore professional projects built with Python, ML, Salesforce, and more. Filter by skill or subject to see relevant work.">
  <meta name="keywords" content="Shanmukh Projects, Python, Tableau, SQL, MBA, Tool, Blog">
*/

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [params] = useSearchParams();
  const skill = params.get("skill");
  const subject = params.get("subject");

  useEffect(() => {
    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, "projects"));
      const data = snapshot.docs.map(doc => doc.data());
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(p => {
    if (skill) {
      return (p.tags || []).includes(skill);
    }
    if (subject) {
      return (p.subjects || []).includes(subject);
    }
    return true;
  });

  return (
    <div className="bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">💼 My Projects</h1>
      {(skill || subject) && (
        <div className="text-center mb-6">
          <p className="text-gray-600 text-sm">
            Showing projects tagged with <span className="font-semibold text-blue-700">{skill || subject}</span>
          </p>
        </div>
      )}

      {filteredProjects.length === 0 ? (
        <p className="text-center text-gray-500 text-md mt-10">No project is tagged with "{skill || subject}".</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {filteredProjects.map((project, i) => (
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
              <h2 className="text-xl font-semibold mb-1">
                {project.title}
                {project.type && <span className="text-sm text-gray-500"> ({project.type})</span>}
              </h2>
              <p className="text-gray-700 mb-2">{project.description || "No description provided."}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {(project.tags || []).map(tag => (
                  <a
                    key={tag}
                    href={`/projects?skill=${encodeURIComponent(tag)}`}
                    className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full hover:bg-purple-200 transition"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
