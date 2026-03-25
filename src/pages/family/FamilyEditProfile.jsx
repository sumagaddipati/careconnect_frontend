import { useEffect, useState } from "react";
import api from "../../api/api";
import "../../styles/family.css";

function FamilyEditProfile() {

const familyId = localStorage.getItem("userId");

const [profile,setProfile] = useState(null);
const [imagePreview,setImagePreview] = useState(null);

const conditionsList = [
"Diabetes",
"High Blood Pressure",
"Heart Disease",
"Arthritis",
"Asthma",
"Kidney Disease",
"Stroke History",
"Parkinson's",
"Dementia / Alzheimer",
"Vision Problems",
"Hearing Loss",
"Depression",
"None"
];

const IMAGE_BASE = "http://localhost:8080/uploads/";

useEffect(()=>{

api.get(`/family/profile/${familyId}`)
.then(res=>{

setProfile(res.data);

// convert filename to full URL
if(res.data.profileImage){
setImagePreview(IMAGE_BASE + res.data.profileImage);
}

})

},[familyId])



const handleImage = async (e) => {

const file = e.target.files[0]
if(!file) return

const formData = new FormData()
formData.append("file",file)

const res = await api.post("/senior/upload-image",formData,{
headers:{ "Content-Type":"multipart/form-data" }
})

setImagePreview(URL.createObjectURL(file))

setProfile({
...profile,
profileImage: res.data
})

}


const toggleCondition = (condition)=>{

let current = profile.healthConditions
? profile.healthConditions.split(",")
: []

if(current.includes(condition)){
current = current.filter(c=>c!==condition)
}else{
current.push(condition)
}

setProfile({...profile,healthConditions:current.join(",")})

}


const calculateRisk = ()=>{

let risk = 0

if(profile.mobility === "Wheelchair") risk += 2
if(profile.mobility === "Bedridden") risk += 3

if(profile.healthConditions){

const c = profile.healthConditions.split(",")

if(c.includes("Heart Disease")) risk += 3
if(c.includes("Stroke History")) risk += 3
if(c.includes("Diabetes")) risk += 1
if(c.includes("High Blood Pressure")) risk += 1
}

if(profile.livesAlone === true) risk += 1

if(risk >=5) return "HIGH"
if(risk >=3) return "MEDIUM"
return "LOW"

}


const saveProfile = async()=>{

const riskLevel = calculateRisk()

await api.post("/senior/profile",{...profile,riskLevel})

alert("Profile Updated Successfully")

}


if(!profile) return <p>Loading...</p>


return(

<div className="profile-page">

<div className="profile-card">

<div className="profile-header">

<div className="image-box">

<img
src={imagePreview || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
alt="profile"
/>

<input type="file" onChange={handleImage}/>

</div>

<div>

<h2>{profile.fullName || "Senior Profile"}</h2>

<p className="senior-id">
Senior ID: {profile.seniorCode}
</p>

</div>

</div>


<h3 className="section-title">Basic Information</h3>

<div className="form-grid">

<input
placeholder="Full Name"
value={profile.fullName || ""}
onChange={e=>setProfile({...profile,fullName:e.target.value})}
/>

<select
value={profile.age || ""}
onChange={e=>setProfile({...profile,age:Number(e.target.value)})}
>
<option value="">Age</option>
<option value={60}>60</option>
<option value={65}>65</option>
<option value={70}>70</option>
<option value={75}>75</option>
<option value={80}>80</option>
<option value={85}>85</option>
</select>

<select
value={profile.gender || ""}
onChange={e=>setProfile({...profile,gender:e.target.value})}
>
<option value="">Gender</option>
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>

<input
placeholder="Phone"
value={profile.phone || ""}
onChange={e=>setProfile({...profile,phone:e.target.value})}
/>

<input
placeholder="Address"
value={profile.address || ""}
onChange={e=>setProfile({...profile,address:e.target.value})}
/>

<input
placeholder="City"
value={profile.city || ""}
onChange={e=>setProfile({...profile,city:e.target.value})}
/>

</div>


<h3 className="section-title">Health Conditions</h3>

<div className="checkbox-grid">

{conditionsList.map(c=>{

const selected = profile.healthConditions?.includes(c)

return(

<label key={c}>

<input
type="checkbox"
checked={selected || false}
onChange={()=>toggleCondition(c)}
/>

{c}

</label>

)

})}

</div>


<input
placeholder="Other condition"
value={profile.otherCondition || ""}
onChange={e=>setProfile({...profile,otherCondition:e.target.value})}
/>


<div className="form-grid">

<input
placeholder="Medications"
value={profile.medications || ""}
onChange={e=>setProfile({...profile,medications:e.target.value})}
/>

<select
value={profile.mobility || ""}
onChange={e=>setProfile({...profile,mobility:e.target.value})}
>
<option value="">Mobility Type</option>
<option>Independent Walking</option>
<option>Walking Stick</option>
<option>Walker</option>
<option>Wheelchair</option>
<option>Bedridden</option>
</select>

</div>


<h3 className="section-title">Family Support</h3>

<div className="form-grid">

<select
value={profile.livesAlone ?? ""}
onChange={e=>setProfile({...profile,livesAlone:e.target.value === "true"})}
>
<option value="">Lives Alone?</option>
<option value="true">Yes</option>
<option value="false">No</option>
</select>

<select
value={profile.familySupport ?? ""}
onChange={e=>setProfile({...profile,familySupport:e.target.value === "true"})}
>
<option value="">Family Support Available?</option>
<option value="true">Yes</option>
<option value="false">No</option>
</select>

<input
placeholder="Family Member Name"
value={profile.familyName || ""}
onChange={e=>setProfile({...profile,familyName:e.target.value})}
/>

<input
placeholder="Family Phone"
value={profile.familyPhone || ""}
onChange={e=>setProfile({...profile,familyPhone:e.target.value})}
/>

<input
placeholder="Family Email"
value={profile.familyEmail || ""}
onChange={e=>setProfile({...profile,familyEmail:e.target.value})}
/>

</div>


<h3 className="section-title">Preferences</h3>

<div className="form-grid">

<select
value={profile.language || ""}
onChange={e=>setProfile({...profile,language:e.target.value})}
>
<option value="">Preferred Language</option>
<option>English</option>
<option>Telugu</option>
<option>Hindi</option>
<option>Tamil</option>
</select>

<select
value={profile.preferredVolunteerGender || ""}
onChange={e=>setProfile({...profile,preferredVolunteerGender:e.target.value})}
>
<option value="">Volunteer Gender Preference</option>
<option>No Preference</option>
<option>Male</option>
<option>Female</option>
</select>

<select
value={profile.preferredTime || ""}
onChange={e=>setProfile({...profile,preferredTime:e.target.value})}
>
<option value="">Preferred Visit Time</option>
<option>Morning</option>
<option>Afternoon</option>
<option>Evening</option>
<option>Anytime</option>
</select>

</div>


<h3 className="section-title">Emergency Notes</h3>

<textarea
placeholder="Special Notes"
value={profile.specialNotes || ""}
onChange={e=>setProfile({...profile,specialNotes:e.target.value})}
/>

<textarea
placeholder="Emergency Notes"
value={profile.emergencyNotes || ""}
onChange={e=>setProfile({...profile,emergencyNotes:e.target.value})}
/>


<button className="save-btn" onClick={saveProfile}>
Update Profile
</button>

</div>

</div>

)

}

export default FamilyEditProfile