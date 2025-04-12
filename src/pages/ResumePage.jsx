import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

/* SEO Metadata (for index.html head):
  <title>Resume – Shanmukh Sri Surya Gopi</title>
  <meta name="description" content="Explore Shanmukh's resume, including skills like Python, Salesforce, SQL, Tableau, Java, and more.">
  <meta name="keywords" content="Resume, Skills, Python, SQL, Tableau, MBA, Analytics, Shanmukh">
*/

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
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkills = async () => {
      const snap = await getDocs(collection(db, "projects"));
      const tagsSet = new Set();
      snap.docs.forEach(doc => {
        const tags = doc.data().tags || [];
        tags.forEach(tag => tagsSet.add(tag.trim()));
      });
      const deduped = Array.from(tagsSet).filter(Boolean).sort();
      setSkills(deduped);
    };
    fetchSkills();
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] min-h-screen py-10 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto py-10 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">Shanmukh Sri Surya Gopi</h1>
          <p className="text-md text-gray-600 mt-2">MBA Analytics @ Stevens | Ex-Infosys | Tech + Strategy</p>
        </div>
        <div className="flex flex-col gap-6 w-full">
          {sectionCard("📞 Contact", (
            <ul className="space-y-1">
              <li>Email: shanmukhsrisuryagopi@gmail.com</li>
              <li>Phone: +1 201 268 0951</li>
              <li>
                <a href="https://linkedin.com/in/shanmukh-sri-surya-gopi-a164631b0" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center text-blue-600 hover:underline">
                  LinkedIn Profile
                </a>
              </li>
            </ul>
          ))}
          {sectionCard("🛠 Skills", (
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span
                  key={skill}
                  onClick={() => navigate(`/projects?skill=${encodeURIComponent(skill)}`)}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:scale-105 transition cursor-pointer"
                >
                  {skill}
                </span>
              ))}
            </div>
          ))}
          {sectionCard("💼 Experience", (
            <>
              <p className="font-semibold">Infosys – Systems Engineer</p>
              <p className="text-sm text-gray-600 mb-2">Salesforce CRM support.</p>
              <p className="font-semibold">Indian Servers – Pentester Intern</p>
              <p className="text-sm text-gray-600">Web vulnerability testing.</p>
            </>
          ))}
          {sectionCard("🎓 Education", (
            <>
              <p className="font-semibold">MBA – Stevens</p>
              <p className="text-sm text-gray-600 mb-2">2023–2025</p>
              <p className="font-semibold">B.Tech – Lakireddy</p>
              <p className="text-sm text-gray-600">2018–2022</p>
            </>
          ))}
          {sectionCard("📊 Projects", (
            <ul className="list-disc pl-5 space-y-1">
              <li>Attrition Prediction</li>
              <li>Fake News Detection</li>
              <li>Sales Forecast Dashboard</li>
            </ul>
          ))}
          {sectionCard("🏆 Activities", (
            <ul className="list-disc pl-5 space-y-1">
              <li>BI & Analytics Club</li>
              <li>Basketball Runner-up</li>
              <li>NSS Volunteer</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
