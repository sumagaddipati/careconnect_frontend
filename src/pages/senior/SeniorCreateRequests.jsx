import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "../../styles/senior.css";

function SeniorCreateRequest() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const emergency =
    new URLSearchParams(window.location.search).get("emergency") === "true";

  const [req, setReq] = useState({
    seniorId: userId,
    title: "",
    description: "",
    location: "",
    emergency
  });

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  const submit = async () => {
    await api.post("/senior/request", req);
    alert("Request submitted");
  };

  return (
    <div className="senior-page">
      <div className="senior-card">
        <h3 className="senior-title">
          {emergency ? "🚨 Emergency Request" : "Create Help Request"}
        </h3>

        <input className="input" placeholder="Title"
          onChange={e => setReq({ ...req, title: e.target.value })} />

        <input className="input" placeholder="Description"
          onChange={e => setReq({ ...req, description: e.target.value })} />

        <input className="input" placeholder="Location"
          onChange={e => setReq({ ...req, location: e.target.value })} />

        <button className="btn" onClick={submit}>Submit</button>
      </div>
    </div>
  );
}

export default SeniorCreateRequest;
