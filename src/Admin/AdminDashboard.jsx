import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link to="/admin/about">Manage About</Link></li>
        <li><Link to="/admin/contacts">Manage Contacts</Link></li>
        <li><Link to="/admin/education">Manage Education</Link></li>
        <li><Link to="/admin/projects">Manage Projects</Link></li>
        <li><Link to="/admin/skills">Manage Skills</Link></li>
      </ul>
    </div>
  );
}
