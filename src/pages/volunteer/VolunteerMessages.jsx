import { useEffect, useState } from "react";
import API from "../../api/api";

function VolunteerMessages() {

  const userId = localStorage.getItem("userId");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    API.get(`/messages/${userId}`)
      .then(res => setMessages(res.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Messages</h2>

      {messages.length === 0 && <p>No messages</p>}

      {messages.map((m, i) => (
        <div key={i} style={{
          background: "#f1f1f1",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "8px"
        }}>
          <p>{m.content}</p>
          <small>{m.timestamp}</small>
        </div>
      ))}
    </div>
  );
}

export default VolunteerMessages;