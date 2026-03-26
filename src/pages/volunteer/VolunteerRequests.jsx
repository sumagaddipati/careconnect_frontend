import { useEffect, useState } from "react";
import api from "../../api/api";

function VolunteerRequests() {

  const userId = localStorage.getItem("userId");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const loadRequests = async () => {
      try {
        const res = await api.get(`/volunteer/requests/${userId}`);
        setRequests(res.data);
      } catch {
        alert("Not approved yet ❌");
      }
    };

    loadRequests();
  }, [userId]); // ✅ fixed

  const accept = async (id) => {
    const res = await api.post(`/volunteer/accept/${id}/${userId}`);

    if (res.data === "ACCEPTED") {
      alert("Accepted ✅");
    } else {
      alert("Not approved ❌");
    }
  };

  return (
    <div>
      <h2>Requests</h2>

      {requests.map(r => (
        <div key={r.id}>
          <p>{r.employeeName}</p>
          <button onClick={() => accept(r.id)}>Accept</button>
        </div>
      ))}
    </div>
  );
}

export default VolunteerRequests;