import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "../../styles/Auth.css";

function Register() {

  const navigate = useNavigate();

  const [form,setForm] = useState({
    name:"",
    email:"",
    password:"",
    role:"SENIOR",
    seniorName:"",
    seniorCode:""
  });

  const register = async () => {

    try{

      const res = await api.post("/auth/register",form);

      alert(res.data);

      navigate("/");

    }
    catch(err){

      alert(
        typeof err.response?.data === "object"
        ? JSON.stringify(err.response.data)
        : err.response?.data || "Register failed"
      );

    }

  };

  return(

    <div className="auth-page">

      <div className="auth-card">

        <h2 className="auth-title">
          CareConnect Register
        </h2>

        <input
          className="auth-input"
          placeholder="Name"
          onChange={e=>setForm({...form,name:e.target.value})}
        />

        <input
          className="auth-input"
          placeholder="Email"
          onChange={e=>setForm({...form,email:e.target.value})}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          onChange={e=>setForm({...form,password:e.target.value})}
        />

        <select
          className="auth-input"
          onChange={e=>setForm({...form,role:e.target.value})}
        >
          <option value="SENIOR">Senior</option>
          <option value="VOLUNTEER">Volunteer</option>
          <option value="FAMILY">Family</option>
          <option value="ADMIN">Admin</option>
        </select>

        {form.role === "FAMILY" && (

          <>
            <input
              className="auth-input"
              placeholder="Senior Name"
              onChange={e=>setForm({...form,seniorName:e.target.value})}
            />

            <input
              className="auth-input"
              placeholder="Senior ID (Example: CC-48216)"
              onChange={e=>setForm({...form,seniorCode:e.target.value})}
            />
          </>

        )}

        <button className="auth-button" onClick={register}>
          Register
        </button>

        <p
          className="auth-link"
          onClick={()=>navigate("/")}
        >
          Already have an account? Login
        </p>

      </div>

    </div>

  )

}

export default Register;