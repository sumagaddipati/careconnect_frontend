import { useEffect, useState } from "react";
import api from "../../api/api";

function AdminVolunteers() {

  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/admin/all-volunteers")
      .then(res => setData(res.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h2>All Volunteers</h2>

      {data.map(v => (
        <div key={v.id} style={{
          border: "1px solid #ccc",
          padding: "15px",
          margin: "10px 0"
        }}>

          <h3>{v.fullName}</h3>
          <p>{v.phone}</p>
          <p>{v.city}</p>

          {v.imagePath && (
            <img
              src={`http://localhost:8080/${v.imagePath}`}
              width="150"
              alt=""
            />
          )}

        </div>
      ))}

    </div>
  );
}

export default AdminVolunteers;