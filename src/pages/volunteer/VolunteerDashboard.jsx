import { useEffect, useState } from "react";
import api from "../../api/api";

function VolunteerDashboard() {

  const userId = Number(localStorage.getItem("userId"));
  const [status, setStatus] = useState("LOADING");

  const fetchProfile = async () => {
    try {
      const res = await api.get(`/volunteer/profile/${userId}`);

      console.log("PROFILE:", res.data);

      if (!res.data || !res.data.userId) {
        setStatus("NO_PROFILE");
        return;
      }

      // 🔥 SIMPLE LOGIC
      setStatus("ACTIVE");

    } catch (err) {
      console.error(err);
      setStatus("NO_PROFILE");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // optional auto refresh
  useEffect(() => {
    const interval = setInterval(fetchProfile, 5000);
    return () => clearInterval(interval);
  }, []);

  // ======================
  // UI STATES
  // ======================

  if (status === "LOADING") return <h2>Loading...</h2>;

  if (status === "NO_PROFILE") {
    return (
      <div>
        <h2>Create Profile First</h2>
        <a href="/volunteer/profile">
          <button>Create Profile</button>
        </a>
      </div>
    );
  }

  // ✅ ACTIVE (MAIN DASHBOARD)
  return (
  <div>

    <h2>Welcome Volunteer 🚀</h2>

    <a href="/volunteer/profile">
      <button>My Profile</button>
    </a>

    <br /><br />

    <a href="/volunteer/requests">
      <button>Requests</button>
    </a>

    <br /><br />

    <a href="/volunteer/mytasks">
      <button>My Tasks</button>
    </a>

    <br /><br />

    <a href="/volunteer/history">
      <button>History</button>
    </a>

    <br /><br />

    <a href="/volunteer/messages">
      <button>Messages</button>
    </a>

  </div>
);
}

export default VolunteerDashboard;