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
    <div className="admin-container">

      <h1 className="admin-title">Admin Dashboard</h1>

      {/* 🔥 STATS CARDS */}
      <div className="stats-grid">
        <div className="glass-card">
          <h3>Users</h3>
          <p>{stats.totalUsers || 0}</p>
        </div>

        <div className="glass-card">
          <h3>Requests</h3>
          <p>{stats.totalRequests || 0}</p>
        </div>

        <div className="glass-card">
          <h3>Active</h3>
          <p>{stats.activeRequests || 0}</p>
        </div>
      </div>

      {/* 🔥 ACTION CARDS */}
      <div className="action-grid">
        {cards.map((c, i) => (
          <div
            key={i}
            className="glass-card clickable"
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