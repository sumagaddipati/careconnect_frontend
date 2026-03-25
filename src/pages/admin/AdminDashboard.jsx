import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import "../../styles/admin.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});

  useEffect(() => {
    API.get("/admin/stats").then(res => setStats(res.data));
  }, []);

  const cards = [
    { title: "Manage Requests", path: "/admin/requests" },
    { title: "Manage Volunteers", path: "/admin/volunteers" },
    { title: "Manage Seniors", path: "/admin/seniors" },
    { title: "Send Message", path: "/admin/messages" }
    
  ];

  return (
    <div className="admin-page">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="admin-grid">
        <div className="admin-card">Users: {stats.totalUsers}</div>
        <div className="admin-card">Requests: {stats.totalRequests}</div>
        <div className="admin-card">Active: {stats.activeRequests}</div>
      </div>

      <div className="admin-grid" style={{ marginTop: "20px" }}>
        {cards.map((c, i) => (
          <div
            key={i}
            className="admin-card"
            onClick={() => navigate(c.path)}
          >
            {c.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;