import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "../../styles/senior.css";

function SeniorMyRequests() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }

    api.get(`/senior/requests/${userId}`)
      .then(res => setRequests(res.data))
      .catch(err => console.error(err));
  }, [userId, navigate]);

  return (
    <div className="senior-page">
      <div className="senior-card">
        <h3 className="senior-title">My Requests</h3>

        {requests.length === 0 && <p>No requests yet</p>}

        {requests.map(r => (
          <div key={r.id} className="request-item">
            <b>{r.title}</b><br />
            Status: {r.status} {r.emergency && "🚨"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeniorMyRequests;