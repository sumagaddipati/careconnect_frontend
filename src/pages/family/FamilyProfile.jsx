import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import "../../styles/family.css";

function FamilyProfile(){

const [profile,setProfile]=useState(null);
const navigate=useNavigate();

const familyId=localStorage.getItem("userId");

const IMAGE_BASE="http://localhost:8080/uploads/";

useEffect(()=>{

api.get(`/family/profile/${familyId}`)
.then(res=>{

const data=res.data;

if(data.profileImage){
data.profileImage=IMAGE_BASE+data.profileImage;
}

setProfile(data);

});

},[familyId]);


if(!profile) return <div className="page">Loading...</div>;


const riskClass=
profile.riskLevel==="HIGH"
?"risk-high"
:profile.riskLevel==="MEDIUM"
?"risk-medium"
:"risk-low";


return(

<div className="page">

{/* HEADER */}

<div className="profile-top">

<div className="profile-left">

<img
src={
profile.profileImage ||
"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
}
alt="profile"
className="profile-img"
/>

<div>

<div className="profile-name">
{profile.fullName}
</div>

<div className="profile-sub">
Senior ID: {profile.seniorCode}
</div>

<div className="profile-sub">
Age {profile.age || "-"} • {profile.city || "-"}
</div>

<span className={`risk-badge ${riskClass}`}>
Risk Level: {profile.riskLevel || "LOW"}
</span>

</div>

</div>

<button
className="button"
onClick={()=>navigate("/family/edit-profile")}
>
Update Profile
</button>

</div>


{/* GRID */}

<div className="profile-grid">

{/* BASIC */}

<div className="card">

<h2>Basic Information</h2>

<div className="info-row"><b>Phone:</b> {profile.phone}</div>
<div className="info-row"><b>Gender:</b> {profile.gender}</div>
<div className="info-row"><b>Address:</b> {profile.address}</div>
<div className="info-row"><b>City:</b> {profile.city}</div>

</div>


{/* HEALTH */}

<div className="card">

<h2>Health Information</h2>

<div className="info-row"><b>Conditions:</b> {profile.healthConditions || "None"}</div>
<div className="info-row"><b>Medications:</b> {profile.medications || "None"}</div>
<div className="info-row"><b>Mobility:</b> {profile.mobility}</div>
<div className="info-row"><b>Other Condition:</b> {profile.otherCondition || "None"}</div>

</div>


{/* FAMILY */}

<div className="card">

<h2>Family Support</h2>

<div className="info-row"><b>Lives Alone:</b> {profile.livesAlone ? "Yes":"No"}</div>
<div className="info-row"><b>Family Support:</b> {profile.familySupport ? "Yes":"No"}</div>
<div className="info-row"><b>Family Member:</b> {profile.familyName}</div>
<div className="info-row"><b>Phone:</b> {profile.familyPhone}</div>
<div className="info-row"><b>Email:</b> {profile.familyEmail}</div>

</div>


{/* PREFERENCES */}

<div className="card">

<h2>Preferences</h2>

<div className="info-row"><b>Language:</b> {profile.language}</div>
<div className="info-row"><b>Volunteer Gender:</b> {profile.preferredVolunteerGender}</div>
<div className="info-row"><b>Visit Time:</b> {profile.preferredTime}</div>

</div>

</div>


{/* NOTES */}

<div className="card notes-card">

<h2>Notes</h2>

<div className="info-row"><b>Special Notes:</b> {profile.specialNotes || "None"}</div>
<div className="info-row"><b>Emergency Notes:</b> {profile.emergencyNotes || "None"}</div>

</div>

</div>

);

}

export default FamilyProfile;