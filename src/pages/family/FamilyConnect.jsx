import { useState } from "react"
import api from "../../api/api";

function FamilyConnect(){

const familyId = localStorage.getItem("userId")

const [name,setName] = useState("")
const [code,setCode] = useState("")

const connect = async()=>{

const res = await api.post(`/family/link?name=${name}&code=${code}&familyId=${familyId}`)

alert(res.data)

}

return(

<div className="family-page">

<h2>Connect to Senior</h2>

<input placeholder="Senior Name" onChange={e=>setName(e.target.value)}/>

<input placeholder="Senior ID" onChange={e=>setCode(e.target.value)}/>

<button onClick={connect}>Connect</button>

</div>

)

}

export default FamilyConnect