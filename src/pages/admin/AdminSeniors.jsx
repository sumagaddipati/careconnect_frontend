import { useEffect, useState } from "react";
import API from "../../api/api";
import "../../styles/admin.css";

function AdminSeniors() {
  const [seniors, setSeniors] = useState([]);

  useEffect(() => {
    API.get("/admin/seniors")
      .then(res => setSeniors(res.data));
  }, []);

  return (
    <div className="admin-page">
      <h1 className="admin-title">Seniors</h1>

      <div className="admin-list">
        {seniors.map(s => (
          <div key={s.id} className="admin-item">
            <h3>{s.name}</h3>
            <p>{s.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminSeniors;