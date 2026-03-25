import { useState } from "react";
import api from "../../api/api";
import "../../styles/family.css";

function FamilyCreateRequest(){

  const familyId = localStorage.getItem("userId");

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [location,setLocation] = useState("");
  const [emergency,setEmergency] = useState(false);

  const submit = async () => {

    await api.post("/family/request",{
      title,
      description,
      location,
      emergency,
      createdBy: familyId,
      createdRole: "FAMILY"
    });

    alert("Request Created");

  };

  return(

    <div className="page">

      <h2>Create Help Request</h2>

      <input className="input" placeholder="Title"
        onChange={e=>setTitle(e.target.value)} />

      <input className="input" placeholder="Description"
        onChange={e=>setDescription(e.target.value)} />

      <input className="input" placeholder="Location"
        onChange={e=>setLocation(e.target.value)} />

      <label>

        Emergency?

        <input
          type="checkbox"
          onChange={e=>setEmergency(e.target.checked)}
        />

      </label>

      <button className="button" onClick={submit}>
        Submit Request
      </button>

    </div>

  );

}

export default FamilyCreateRequest;