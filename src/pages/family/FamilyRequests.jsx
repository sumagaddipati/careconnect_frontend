import { useEffect, useState } from "react";
import api from "../../api/api";
import "../../styles/family.css";

function FamilyRequests() {

  const [requests, setRequests] = useState([]);
  const familyId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/family/requests/${familyId}`);
      setRequests(res.data);
    };

    if (familyId) fetchData();
  }, [familyId]); // ✅ FIXED

  return (
    <div className="page">

      <h2>Requests</h2>

      {requests.map(r => {

        const color =
          r.status === "COMPLETED" ? "green" :
          r.status === "ACCEPTED" ? "blue" :
          "orange";

        return (
          <div className="card" key={r.id}>

            <h3>{r.title}</h3>
            <p>{r.description}</p>
            <p>Location: {r.location}</p>

            <p style={{ color }}>
              Status: {r.status}
            </p>

            {r.emergency && (
              <p style={{ color: "red" }}>
                🚨 Emergency
              </p>
            )}

          </div>
        );

      })}

    </div>
  );
}

export default FamilyRequests;