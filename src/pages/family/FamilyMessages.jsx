import { useEffect, useState } from "react";
import API from "../../api/api";
import "../../styles/sms.css";

function VolunteerMessages() {

  const userId = localStorage.getItem("userId");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    API.get(`/messages/${userId}`)
      .then(res => setMessages(res.data));
  }, [userId]);

  return (
    <div className="sms-page">
      <h2>Messages</h2>

      {messages.length === 0 && <p>No messages</p>}

      {messages.map((m, i) => (
        <div key={i} className="sms-bubble">
          <p>{m.content}</p>
          <small>{m.timestamp}</small>
        </div>
      ))}
    </div>
  );
}

export default VolunteerMessages;