import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const sections = [
    { title: "Projects", path: "/admin/projects", icon: "🛠" },
    { title: "Skills", path: "/admin/skills", icon: "🧠" },
    { title: "Certifications", path: "/admin/certifications", icon: "📜" },
    { title: "Subjects", path: "/admin/subjects", icon: "📚" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0f7fa] py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">🔧 Admin Dashboard</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {sections.map(({ title, path, icon }) => (
          <Link key={title} to={path} className="bg-white/70 backdrop-blur-sm shadow-md border border-gray-200 rounded-2xl p-6 text-center hover:scale-105 transition">
            <div className="text-4xl mb-2">{icon}</div>
            <div className="text-lg font-medium text-gray-800">{title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
