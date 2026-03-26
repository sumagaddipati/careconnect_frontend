import { useEffect, useState } from "react";
import api from "../../api/api";

function VolunteerDashboard() {

  const userId = Number(localStorage.getItem("userId"));
  const [status, setStatus] = useState("LOADING");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/volunteer/profile/${userId}`);

        if (!res.data || !res.data.userId) {
          setStatus("NO_PROFILE");
          return;
        }

        setStatus("ACTIVE");

      } catch (err) {
        console.error(err);
        setStatus("NO_PROFILE");
      }
    };

    if (userId) fetchProfile();

    const interval = setInterval(fetchProfile, 5000);
    return () => clearInterval(interval);

  }, [userId]); // ✅ FIXED (single useEffect)

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

  return (
    <div>

      <h2>Welcome Volunteer 🚀</h2>

      <a href="/volunteer/profile"><button>My Profile</button></a>
      <br /><br />

      <a href="/volunteer/requests"><button>Requests</button></a>
      <br /><br />

      <a href="/volunteer/mytasks"><button>My Tasks</button></a>
      <br /><br />

      <a href="/volunteer/history"><button>History</button></a>
      <br /><br />

      <a href="/volunteer/messages"><button>Messages</button></a>

    </div>
  );
}

export default VolunteerDashboard;