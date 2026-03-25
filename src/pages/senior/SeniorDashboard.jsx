import { useNavigate } from "react-router-dom";
import "../../styles/senior.css";

function SeniorDashboard(){

const nav = useNavigate();
const name = localStorage.getItem("name");

return(

<div className="senior-container">

<h1 className="senior-heading">
Welcome {name}
</h1>

<div className="dashboard-grid">

<div className="card" onClick={()=>nav("/senior/profile")}>
👤
<p>My Profile</p>
</div>

<div className="card" onClick={()=>nav("/senior/request")}>
➕
<p>Request Help</p>
</div>

<div className="card" onClick={()=>nav("/senior/requests")}>
📋
<p>My Requests</p>
</div>

<div className="card emergency" onClick={()=>nav("/senior/request?emergency=true")}>
🚨
<p>Emergency</p>
</div>

</div>

</div>

)

}

export default SeniorDashboard