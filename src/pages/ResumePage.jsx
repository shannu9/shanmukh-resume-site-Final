import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const sectionCard = (title, content) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-white/60 backdrop-blur-sm shadow-xl rounded-2xl p-6 mb-6 border border-gray-200 w-full"
  >
    <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
    <div className="text-gray-700">{content}</div>
  </motion.div>
);

export default function ResumePage() {
  const [contact, setContact] = useState({});
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const getCol = async (name) => (await getDocs(collection(db, name))).docs.map(d => d.data());
      setContact((await getCol("resume_contact"))[0] || {});
      setSkills(await getCol("resume_skills"));
      setExperience(await getCol("resume_experience"));
      setEducation(await getCol("resume_education"));
      setProjects(await getCol("resume_projects"));
      setActivities(await getCol("resume_activities"));
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] min-h-screen py-10 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto py-10 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">Shanmukh Sri Surya Gopi</h1>
          <p className="text-md text-gray-600 mt-2">{contact.headline || "MBA Analytics | Tech + Strategy"}</p>
        </div>

        {sectionCard("📞 Contact", (
          <ul className="space-y-1">
            <li>Email: {contact.email}</li>
            <li>Phone: {contact.phone}</li>
            <li>LinkedIn: {contact.linkedin}</li>
          </ul>
        ))}

        {sectionCard("🛠 Skills", (
          <div className="flex flex-wrap gap-2">
            {skills.map(({ name }) => (
              <span
                key={name}
                onClick={() => navigate(`/projects?skill=${encodeURIComponent(name)}`)}
                className="cursor-pointer bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:scale-105 transition"
              >
                {name}
              </span>
            ))}
          </div>
        ))}

        {sectionCard("💼 Experience", (
          <ul className="space-y-2">
            {experience.map((exp, idx) => (
              <li key={idx}>
                <p className="font-semibold">{exp.role} – {exp.company}</p>
                <p className="text-sm text-gray-600">{exp.description}</p>
              </li>
            ))}
          </ul>
        ))}

        {sectionCard("🎓 Education", (
          <ul className="space-y-2">
            {education.map((edu, idx) => (
              <li key={idx}>
                <p className="font-semibold">{edu.degree} – {edu.institution}</p>
                <p className="text-sm text-gray-600">{edu.period}</p>
              </li>
            ))}
          </ul>
        ))}

        {sectionCard("📊 Projects", (
          <ul className="list-disc pl-5 space-y-1">
            {projects.map((p, i) => <li key={i}>{p.title}</li>)}
          </ul>
        ))}

        {sectionCard("🏆 Activities", (
          <ul className="list-disc pl-5 space-y-1">
            {activities.map((a, i) => <li key={i}>{a.name}</li>)}
          </ul>
        ))}
      </div>
    </div>
  );
}
