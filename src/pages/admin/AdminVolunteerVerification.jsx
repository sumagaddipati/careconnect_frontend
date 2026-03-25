import { useEffect, useState } from "react";
import API from "../../api/api";
import "../../styles/admin.css";

function AdminVolunteerVerification() {

  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/admin/volunteer-verifications")
      .then(res => setData(res.data));
  }, []);

  const verify = (id, status) => {
    API.put(`/admin/volunteer-verifications/${id}`, { status })
      .then(() => {
        setData(prev => prev.filter(v => v.id !== id));
      });
  };

  return (
    <div className="admin-page">
      <h1 className="admin-title">Volunteer Verification</h1>

      {data.map(v => (
        <div key={v.id} className="admin-item">
          <h3>{v.fullName}</h3>
          <p>{v.idType} - {v.idNumber}</p>

          {/* 🔥 IMAGE VIEW */}
          <img
            src={`http://localhost:8080/${v.documentPath}`}
            alt="ID"
            width="200"
          />

          <br /><br />

          <button
            className="admin-btn approve"
            onClick={() => verify(v.id, "APPROVED")}
          >
            Approve
          </button>

          <button
            className="admin-btn reject"
            onClick={() => verify(v.id, "REJECTED")}
          >
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminVolunteerVerification;