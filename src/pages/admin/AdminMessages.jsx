import { useEffect, useState } from "react";
import API from "../../api/api";
import "../../styles/admin.css";

function AdminMessages() {

  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState("");
  const [msg, setMsg] = useState("");

  // 🔥 Load requests
  useEffect(() => {
    API.get("/admin/requests-list")
      .then(res => setRequests(res.data))
      .catch(err => console.error(err));
  }, []);

  // 🔥 Send message
  const send = async () => {
    if (!selectedRequest || !msg) {
      alert("Select request & enter message ❗");
      return;
    }

    try {
      await API.post("/admin/send-message", {
        requestId: selectedRequest,
        msg: msg
      });

      alert("Message sent ✅");
      setMsg("");

    } catch (err) {
      console.error(err);
      alert("Error sending ❌");
    }
  };

  return (
    <div className="admin-page">

      <h1 className="admin-title">Send Message</h1>

      {/* 🔥 DROPDOWN */}
      <select
        value={selectedRequest}
        onChange={(e) => setSelectedRequest(e.target.value)}
      >
        <option value="">Select Request</option>

        {requests.map(r => (
          <option key={r.id} value={r.id}>
            #{r.id} - {r.title} ({r.location})
          </option>
        ))}
      </select>

      <br /><br />

      {/* 🔥 MESSAGE BOX */}
      <textarea
        placeholder="Type message..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />

      <br /><br />

      <button className="admin-btn approve" onClick={send}>
        Send Message
      </button>

    </div>
  );
}

export default AdminMessages;