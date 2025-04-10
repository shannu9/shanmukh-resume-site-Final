import { motion } from "framer-motion";

const subjects = [
  "Business Analytics",
  "Data Science",
  "Cloud Computing",
  "Project Management",
  "AI & ML",
  "Python Programming",
  "Database Systems",
  "Data Visualization"
];

export default function SubjectsPage() {
  return (
    <div className="bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] min-h-screen py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">📚 Subjects</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {subjects.map((subject, index) => (
          <motion.div
            key={subject}
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
