/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "../../styles/volunteer.css";

function VolunteerProfile() {

  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));

  const [profile, setProfile] = useState({
    userId,
    fullName: "",
    age: "",
    phone: "",
    city: "",
    address: "",
    gender: "",
    experienceNotes: "",
    firstAidCertified: false,
    medicalTraining: false,
    hasVehicle: false,
    vehicleType: "",
    documentPath: ""
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/volunteer/profile/${userId}`);
        if (res.data) setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleCheck = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.checked });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const saveProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("profile", JSON.stringify(profile));
      if (file) formData.append("file", file);

      const res = await api.post("/volunteer/profile", formData);

      if (res.data.includes("Saved")) {
        alert("Saved ✅");
        navigate("/volunteer/dashboard");
      } else {
        alert(res.data);
      }

    } catch (err) {
      console.error(err);
      alert("Error ❌");
    }
  };

  return (
  <div className="layout">

    {/* SIDEBAR */}
    <aside className="sidebar">
      <h2 className="logo">🚀 Volunteer</h2>

      <button onClick={() => navigate("/volunteer/profile")}>My Profile</button>
      <button onClick={() => navigate("/volunteer/requests")}>Requests</button>
      <button onClick={() => navigate("/volunteer/tasks")}>My Tasks</button>
      <button onClick={() => navigate("/volunteer/history")}>History</button>
      <button onClick={() => navigate("/volunteer/messages")}>Messages</button>
    </aside>

    {/* MAIN */}
    <main className="main">

      <h1 className="title">Volunteer Profile</h1>

      <div className="profile-card">

        {/* GRID */}
        <div className="form-grid">

          <input name="fullName" value={profile.fullName || ""} placeholder="Full Name" onChange={handleChange} />
          <input name="age" value={profile.age || ""} placeholder="Age" onChange={handleChange} />

          <input name="phone" value={profile.phone || ""} placeholder="Phone" onChange={handleChange} />
          <input name="city" value={profile.city || ""} placeholder="City" onChange={handleChange} />

          <input className="full" name="address" value={profile.address || ""} placeholder="Address" onChange={handleChange} />

          <select name="gender" value={profile.gender || ""} onChange={handleChange}>
            <option value="">Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>

          <input name="vehicleType" value={profile.vehicleType || ""} placeholder="Vehicle Type" onChange={handleChange} />

        </div>

        {/* EXPERIENCE */}
        <textarea
          name="experienceNotes"
          value={profile.experienceNotes || ""}
          placeholder="Experience"
          onChange={handleChange}
        />

        {/* CHECKBOX */}
        <div className="checks">
          <label>
            <input type="checkbox" name="firstAidCertified" checked={profile.firstAidCertified || false} onChange={handleCheck}/>
            First Aid
          </label>

          <label>
            <input type="checkbox" name="medicalTraining" checked={profile.medicalTraining || false} onChange={handleCheck}/>
            Medical
          </label>

          <label>
            <input type="checkbox" name="hasVehicle" checked={profile.hasVehicle || false} onChange={handleCheck}/>
            Vehicle
          </label>
        </div>

        {/* FILE */}
        <div className="file-upload">
          <p>Upload Photo</p>
          <input type="file" onChange={handleFile} />
        </div>

        {/* IMAGE PREVIEW */}
        {profile.documentPath && (
          <img
            src={`${process.env.REACT_APP_API_URL}/${profile.documentPath}`}
            className="preview-img"
            alt="profile"
          />
        )}

        {/* BUTTON */}
        <button className="primary-btn" onClick={saveProfile}>
          {profile.id ? "Update Profile" : "Submit"}
        </button>

      </div>

    </main>
  </div>
);
}

export default VolunteerProfile;