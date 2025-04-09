import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ResumePage from './pages/ResumePage';
import ProjectsPage from './pages/ProjectsPage';
import CertificationsPage from './pages/CertificationsPage';
import SubjectsPage from './pages/SubjectsPage';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import Header from './components/Header';

export default function App() {
  return (
    <Router>
      <Header />
      <div className="p-4 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<ResumePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
