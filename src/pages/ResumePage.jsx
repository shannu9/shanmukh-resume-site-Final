import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import SeoHelmet from "../components/SeoHelmet";

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
  const [showAllSkills, setShowAllSkills] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [
        contactSnap,
        skillsSnap,
        expSnap,
        eduSnap,
        actSnap,
        projSnap
      ] = await Promise.all([
        getDocs(collection(db, "resume_contact")),
        getDocs(collection(db, "resume_skills")),
        getDocs(collection(db, "resume_experience")),
        getDocs(collection(db, "resume_education")),
        getDocs(collection(db, "resume_activities")),
        getDocs(collection(db, "projects"))
      ]);

      const resumeSkills = skillsSnap.docs.map(d => d.data());
      const tags = projSnap.docs.flatMap(doc => doc.data().tags || []).map(t => t.trim());
      const allSkillNames = [...resumeSkills.map(s => s.name), ...tags];
      const dedupedSkills = Array.from(new Set(allSkillNames.filter(Boolean))).sort();

      const projectTitles = projSnap.docs.map(d => d.data().title);

      setContact(contactSnap.docs[0]?.data() || {});
      setSkills(dedupedSkills);
      setExperience(expSnap.docs.map(d => d.data()));
      setEducation(eduSnap.docs.map(d => d.data()));
      setActivities(actSnap.docs.map(d => d.data()));
      setProjects(projectTitles);
    };

    fetchData();
  }, []);

  return (
    <>
      <SeoHelmet
        title="Resume"
        description="Hire Shanmukh Sri Surya Gopi – skilled Business Analyst, Salesforce Developer, Product Manager, and Scrum Master."
        keywords="Business Analyst, Salesforce Developer, Resume, MBA Analytics, Python, SQL, Tableau"
        url="https://shanmukh-resume.web.app/"
        image="/cover-image.png"
      />

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
              <li>
                <div className="flex gap-4 flex-wrap">
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded shadow text-blue-700 hover:bg-white transition w-fit"
                  >
                    <FaLinkedin className="text-xl" />
                    LinkedIn Profile
                  </a>

                  <a
                    href="https://github.com/shannu9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded shadow text-gray-800 hover:bg-white transition w-fit"
                  >
                    <FaGithub className="text-xl" />
                    GitHub Profile
                  </a>
                </div>
              </li>
            </ul>
          ))}

          {sectionCard("🛠 Skills", (
            <div>
              <div className="flex flex-wrap gap-2">
                {(showAllSkills ? skills : skills.slice(0, 15)).map(skill => (
                  <span
                    key={skill}
                    onClick={() => navigate(`/projects?skill=${encodeURIComponent(skill)}`)}
                    className="cursor-pointer bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:scale-105 transition"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {skills.length > 15 && (
                <button
                  onClick={() => setShowAllSkills(prev => !prev)}
                  className="mt-3 text-sm text-blue-600 hover:underline"
                >
                  {showAllSkills ? "Show Less" : "Show More"}
                </button>
              )}
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
              {projects.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          ))}

          {sectionCard("🏆 Activities", (
            <ul className="list-disc pl-5 space-y-1">
              {activities.map((a, i) => <li key={i}>{a.name}</li>)}
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
