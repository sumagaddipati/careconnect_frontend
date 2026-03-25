import { useEffect, useState } from "react";
import API from "../../api/api";
import "../../styles/admin.css";

function AdminRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get("/admin/requests")
      .then(res => setRequests(res.data))
      .catch(err => console.error(err));
  }, []);

  const updateStatus = (id, status) => {
    API.put(`/admin/requests/${id}`, { status })
      .then(() => {
        setRequests(prev =>
          prev.map(r => r.id === id ? { ...r, status } : r)
        );
      });
  };

  return (
    <div className="admin-page">
      <h1 className="admin-title">All Requests</h1>

      <div className="admin-list">
        {requests.length === 0 ? (
          <p>No requests found</p>
        ) : (
          requests.map(r => (
            <div key={r.id} className="admin-item">
              <h3>{r.description}</h3>
              <p>Status: {r.status}</p>

              <button
                className="admin-btn approve"
                onClick={() => updateStatus(r.id, "ACCEPTED")}
              >
                Approve
              </button>

              <button
                className="admin-btn reject"
                onClick={() => updateStatus(r.id, "REJECTED")}
              >
                Reject
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminRequests;