import { useEffect, useState } from "react";
import api from "../../api/api";
import "../../styles/volunteer.css";

function VolunteerHistory() {

  const userId = Number(localStorage.getItem("userId"));
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const res = await api.get(`/volunteer/history/${userId}`);
      setHistory(res.data);
    };

    if (userId) loadHistory();
  }, [userId]); // ✅ fixed

  return (
    <div className="vol-page">
      <div className="vol-card">

        <h2>Completed Tasks</h2>

        {history.length === 0 && <p>No completed tasks</p>}

        {history.map(h => (
          <div key={h.id} className="task-card">
            <h4>{h.employeeName}</h4>
            <p>Status: ✅ Completed</p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default VolunteerHistory;