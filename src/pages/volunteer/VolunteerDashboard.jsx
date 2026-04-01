/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "../../styles/volunteer.css";

function VolunteerDashboard() {
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));
  const [status, setStatus] = useState("LOADING");

  const menu = [
    { name: "My Profile", path: "/volunteer/profile" },
    { name: "Requests", path: "/volunteer/requests" },
    { name: "My Tasks", path: "/volunteer/tasks" },
    { name: "History", path: "/volunteer/history" },
    { name: "Messages", path: "/volunteer/messages" },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/volunteer/profile/${userId}`);

        if (!res.data || !res.data.userId) {
          setStatus("NO_PROFILE");
          return;
        }

        setStatus("ACTIVE");
      } catch {
        setStatus("NO_PROFILE");
      }
    };

    if (userId) fetchProfile();

    const interval = setInterval(fetchProfile, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  if (status === "LOADING") return <h2 className="loading">Loading...</h2>;

  if (status === "NO_PROFILE") {
    return (
      <div className="center-box">
        <h2>Create Profile First</h2>
        <button onClick={() => navigate("/volunteer/profile")}>
          Create Profile
        </button>
      </div>
    );
  }

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">🚀 Volunteer</h2>

        {menu.map((item, i) => (
          <button key={i} onClick={() => navigate(item.path)}>
            {item.name}
          </button>
        ))}
      </aside>

      {/* MAIN */}
      <main className="main">
        <h1 className="title">Welcome Volunteer 👋</h1>

        <div className="cards">

          <div onClick={() => navigate("/volunteer/requests")} className="card">
            <h3>📋 Requests</h3>
            <p>View & manage requests</p>
          </div>

          <div onClick={() => navigate("/volunteer/profile")} className="card">
            <h3>🧑 Profile</h3>
            <p>Update your details</p>
          </div>

          <div onClick={() => navigate("/volunteer/tasks")} className="card">
            <h3>🛠 Tasks</h3>
            <p>Check assigned work</p>
          </div>

          <div onClick={() => navigate("/volunteer/messages")} className="card">
            <h3>💬 Messages</h3>
            <p>Chat & updates</p>
          </div>

        </div>
      </main>
    </div>
  );
}

export default VolunteerDashboard;