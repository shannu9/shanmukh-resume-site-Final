import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Resume", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Subjects", path: "/subjects" },
    { name: "Certifications", path: "/certifications" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/60 shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between">
        <div className="text-xl font-semibold text-gray-800 tracking-wide">Shanmukh</div>
        
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <ul className="hidden sm:flex gap-6 text-gray-700 font-medium text-sm sm:text-base">
          {navItems.map(item => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`hover:text-blue-600 transition ${
                  location.pathname === item.path ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="sm:hidden px-4 pb-4 space-y-2 text-gray-700 font-medium text-base bg-white/70 backdrop-blur-md shadow-sm border-t border-gray-200">
          {navItems.map(item => (
            <li key={item.name}>
              <Link
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 hover:text-blue-600 transition ${
                  location.pathname === item.path ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
