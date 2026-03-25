import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

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

    <div style={styles.page}>

      <div style={styles.card}>

        <h2 style={styles.title}>
          CareConnect Register
        </h2>

        <input
          style={styles.input}
          placeholder="Name"
          onChange={e=>setForm({...form,name:e.target.value})}
        />

        <input
          style={styles.input}
          placeholder="Email"
          onChange={e=>setForm({...form,email:e.target.value})}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={e=>setForm({...form,password:e.target.value})}
        />

        <select
          style={styles.input}
          onChange={e=>setForm({...form,role:e.target.value})}
        >

          <option value="SENIOR">Senior</option>
          <option value="VOLUNTEER">Volunteer</option>
          <option value="FAMILY">Family</option>
          <option value="ADMIN">Admin</option>

        </select>


        {/* FAMILY CONNECT SECTION */}

        {form.role === "FAMILY" && (

          <>

            <input
              style={styles.input}
              placeholder="Senior Name"
              onChange={e=>setForm({...form,seniorName:e.target.value})}
            />

            <input
              style={styles.input}
              placeholder="Senior ID (Example: CC-48216)"
              onChange={e=>setForm({...form,seniorCode:e.target.value})}
            />

          </>

        )}


        <button style={styles.button} onClick={register}>
          Register
        </button>

        <p
          style={styles.link}
          onClick={()=>navigate("/")}
        >
          Already have an account? Login
        </p>

      </div>

    </div>

  )

}

export default Register;



const styles = {

  page:{
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"#f0f2f5"
  },

  card:{
    width:380,
    padding:30,
    background:"#fff",
    borderRadius:10,
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
    fontSize:14,
    border:"1px solid #ccc",
    borderRadius:5
  },

  button:{
    width:"100%",
    padding:12,
    background:"#1976d2",
    color:"#fff",
    border:"none",
    borderRadius:5,
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