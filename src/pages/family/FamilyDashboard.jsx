import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import "../../styles/family.css";

function FamilyDashboard() {

  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const familyId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/family/profile/${familyId}`);
      setProfile(res.data);
    };

    if (familyId) fetchData();
  }, [familyId]); // ✅ FIXED

  if (!profile)
    return <div className="family-page">No senior connected</div>;

  const riskClass =
    profile.riskLevel === "HIGH" ? "family-risk-high" :
    profile.riskLevel === "MEDIUM" ? "family-risk-medium" :
    "family-risk-low";

  return (
    <div className="family-page">

      <h1>Family Dashboard</h1>

      <div className="family-card">
        <h2>Senior Overview</h2>

        <p><b>Name:</b> {profile.fullName}</p>
        <p><b>Age:</b> {profile.age}</p>
        <p><b>City:</b> {profile.city}</p>
        <p className={riskClass}>Risk Level: {profile.riskLevel}</p>
      </div>

      <div className="family-card">
        <h2>Quick Actions</h2>

        <button onClick={() => navigate("/family/profile")}>
          View Full Profile
        </button>

        <button onClick={() => navigate("/family/create-request")}>
          Create Help Request
        </button>

        <button onClick={() => navigate("/family/requests")}>
          View Requests
        </button>
      </div>

    </div>
  );
}

export default FamilyDashboard;