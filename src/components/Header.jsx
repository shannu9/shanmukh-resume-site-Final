import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow">
      <ul className="flex gap-4 text-sm font-medium">
        <li><Link to="/" className="hover:underline">Resume</Link></li>
        <li><Link to="/projects" className="hover:underline">Projects</Link></li>
        <li><Link to="/subjects" className="hover:underline">Subjects</Link></li>
        <li><Link to="/certifications" className="hover:underline">Certifications</Link></li>
        <li><Link to="/admin" className="hover:underline">Admin</Link></li>
      </ul>
    </nav>
  );
}