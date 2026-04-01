import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "../../styles/Auth.css";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {

    try{

      const res = await api.post("/auth/login",{
        email,
        password
      });

      const {token,role,userId,name} = res.data;

      localStorage.setItem("token",token);
      localStorage.setItem("role",role);
      localStorage.setItem("userId",userId);
      localStorage.setItem("name",name);

      if(role === "ADMIN")
        navigate("/admin");

      else if(role === "SENIOR")
        navigate("/senior");

      else if(role === "VOLUNTEER")
        navigate("/volunteer");

      else if(role === "FAMILY")
        navigate("/family");

      else
        alert("Unknown role");

    }
    catch(err){

      alert(
        typeof err.response?.data === "object"
        ? JSON.stringify(err.response.data)
        : err.response?.data || "Login failed"
      );

    }

  };

  return(

    <div className="auth-page">

      <div className="auth-card">

        <h2 className="auth-title">
          CareConnect Login
        </h2>

        <input
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />

        <button className="auth-button" onClick={login}>
          Login
        </button>

        <p className="auth-link" onClick={()=>navigate("/register")}>
          New user? Register
        </p>

      </div>

    </div>

  );

}

export default Login;