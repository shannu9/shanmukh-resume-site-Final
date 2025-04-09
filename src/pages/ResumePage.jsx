import { motion } from 'framer-motion';

const sectionCard = (title, content) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-white/60 backdrop-blur-sm shadow-xl rounded-2xl p-6 w-full max-w-3xl mx-auto mb-6 border border-gray-200"
  >
    <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
    <div className="text-gray-700">{content}</div>
  </motion.div>
);

export default function ResumePage() {
  return (
    <div className="bg-gradient-to-br from-[#f0f4f8] to-[#ffffff] min-h-screen py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Shanmukh Sri Surya Gopi</h1>
        <p className="text-md text-gray-600 mt-2">MBA Analytics @ Stevens | Ex-Infosys | Tech + Strategy</p>
      </div>

      {sectionCard(
        "📞 Contact",
        <ul className="space-y-1">
          <li>Email: shanmukh@example.com</li>
          <li>Phone: +1 (234) 567-8900</li>
          <li>LinkedIn: linkedin.com/in/shanmukh</li>
        </ul>
      )}

      {sectionCard(
        "🛠 Skills",
        <div className="flex flex-wrap gap-2">
          {["Python", "Java", "SQL", "R", "Tableau", "Salesforce", "Excel", "Firebase", "Git"].map(skill => (
            <span key={skill} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:scale-105 transition">
              {skill}
            </span>
          ))}
        </div>
      )}

      {sectionCard(
        "💼 Experience",
        <>
          <p className="font-semibold">Infosys Limited – Systems Engineer</p>
          <p className="text-sm text-gray-600 mb-2">Worked on Salesforce CRM development & support.</p>
          <p className="font-semibold">Indian Servers – Web App Pentester Intern</p>
          <p className="text-sm text-gray-600">Audited web vulnerabilities and conducted testing exercises.</p>
        </>
      )}

      {sectionCard(
        "🎓 Education",
        <>
          <p className="font-semibold">MBA in Business Analytics – Stevens Institute of Technology</p>
          <p className="text-sm text-gray-600 mb-2">2023 – 2025</p>
          <p className="font-semibold">B.Tech in Computer Science – Lakireddy Bali Reddy College of Engineering</p>
          <p className="text-sm text-gray-600">2018 – 2022</p>
        </>
      )}

      {sectionCard(
        "📊 Projects",
        <ul className="list-disc pl-5 space-y-1">
          <li>Employee Attrition Prediction using Machine Learning</li>
          <li>Fake News Detection using NLP</li>
          <li>Sales Forecasting Dashboard in Tableau</li>
        </ul>
      )}

      {sectionCard(
        "🏆 Activities",
        <ul className="list-disc pl-5 space-y-1">
          <li>Business Intelligence & Analytics Club – Stevens</li>
          <li>Basketball Team – Zone B Runner-up</li>
          <li>NSS Volunteer – Led COVID awareness drives</li>
        </ul>
      )}
    </div>
  );
}
