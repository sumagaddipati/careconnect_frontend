import { useState } from "react";

function SmsBox({ phone }) {

  const [msg, setMsg] = useState("");

  const sendSms = () => {
    alert("SMS sent to " + phone + " : " + msg);
  };

  return (
    <div style={{ marginTop: 10 }}>
      <input
        placeholder="Type message"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button onClick={sendSms}>
        Send SMS
      </button>
    </div>
  );
}

export default SmsBox;