import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

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
        navigate("/family");   // NEW ROLE

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

    <div style={styles.page}>

      <div style={styles.card}>

        <h2 style={styles.title}>
          CareConnect Login
        </h2>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={login}>
          Login
        </button>

        <p style={styles.link} onClick={()=>navigate("/register")}>
          New user? Register
        </p>

      </div>

    </div>

  );

}

export default Login;

const styles = {

  page:{
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"#f0f2f5"
  },

  card:{
    width:350,
    padding:30,
    background:"#fff",
    borderRadius:8,
    boxShadow:"0 0 15px rgba(0,0,0,0.1)"
  },

  title:{
    textAlign:"center",
    marginBottom:20
  },

  input:{
    width:"100%",
    padding:10,
    marginBottom:15,
    fontSize:14
  },

  button:{
    width:"100%",
    padding:10,
    background:"#1976d2",
    color:"#fff",
    border:"none",
    cursor:"pointer",
    fontSize:16
  },

  link:{
    marginTop:15,
    textAlign:"center",
    color:"#1976d2",
    cursor:"pointer"
  }

};