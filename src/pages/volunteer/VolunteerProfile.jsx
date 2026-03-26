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
    <div className="vol-page">
      <div className="vol-card">

        <h2 className="vol-title">Volunteer Profile</h2>

        <div className="vol-grid">

          <input className="vol-input" name="fullName" value={profile.fullName || ""} placeholder="Full Name" onChange={handleChange} />
          <input className="vol-input" name="age" value={profile.age || ""} placeholder="Age" onChange={handleChange} />

          <input className="vol-input" name="phone" value={profile.phone || ""} placeholder="Phone" onChange={handleChange} />
          <input className="vol-input" name="city" value={profile.city || ""} placeholder="City" onChange={handleChange} />

          <input className="vol-input vol-grid-full" name="address" value={profile.address || ""} placeholder="Address" onChange={handleChange} />

          <select className="vol-select" name="gender" value={profile.gender || ""} onChange={handleChange}>
            <option value="">Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>

          <input className="vol-input" name="vehicleType" value={profile.vehicleType || ""} placeholder="Vehicle Type" onChange={handleChange} />

          <textarea className="vol-textarea vol-grid-full" name="experienceNotes" value={profile.experienceNotes || ""} placeholder="Experience" onChange={handleChange} />

        </div>

        <div className="vol-checkbox-group">
          <label><input type="checkbox" name="firstAidCertified" checked={profile.firstAidCertified || false} onChange={handleCheck}/> First Aid</label>
          <label><input type="checkbox" name="medicalTraining" checked={profile.medicalTraining || false} onChange={handleCheck}/> Medical</label>
          <label><input type="checkbox" name="hasVehicle" checked={profile.hasVehicle || false} onChange={handleCheck}/> Vehicle</label>
        </div>

        <div className="vol-file">
          <p>Upload Photo</p>
          <input type="file" onChange={handleFile} />
        </div>

        {profile.documentPath && (
          <img
            src={`${process.env.REACT_APP_API_URL}/${profile.documentPath}`}
            className="vol-image"
            alt=""
          />
        )}

        <button className="vol-btn" onClick={saveProfile}>
          {profile.id ? "Update Profile" : "Submit"}
        </button>

      </div>
    </div>
  );
}

export default VolunteerProfile;