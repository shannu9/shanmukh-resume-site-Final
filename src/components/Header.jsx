import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 shadow-md rounded-b-2xl px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold text-gray-800">Shanmukh</div>
      <ul className="flex gap-6 text-gray-700 font-medium">
       <li><a href="/" className="hover:text-blue-600 transition">Resume</a></li>
       <li><a href="/projects" className="hover:text-blue-600 transition">Projects</a></li>
       <li><a href="/subjects" className="hover:text-blue-600 transition">Subjects</a></li>
       <li><a href="/certifications" className="hover:text-blue-600 transition">Certifications</a></li>
       <li><a href="/admin" className="hover:text-blue-600 transition">Admin</a></li>
     </ul>
    </nav>

  );
}