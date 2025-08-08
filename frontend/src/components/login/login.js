import React, {useState} from "react";
import './loginCss.css'; 
import { useNavigate } from "react-router-dom";

function LogIn({onRegister}){
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const URL = "http://88.200.63.148:5550/"
    const navigate = useNavigate();

   async function login(e) {

    e.preventDefault();
  try {
    const response = await fetch(`${URL}users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      body: JSON.stringify({ email: email, password: password })
    });

    const result = await response.json();
    console.log(result);

    if (result.success) {
      navigate("/bank");
    } else {
      alert(result.message || "Login failed. Please try again.");
    }
  } catch (err) {
    console.error("Error during login:", err);
    alert("An error occurred. Please try again later.");
  }
}
   
    return(<div className ={"container"}>
    
        <form className = {"form"} onSubmit={login}>
            <div className="welcome">
                <h1>Welcome to MyWallet</h1>
            </div>

            <input
            className = {"input"}
            type = "email"
            placeholder = "Email"
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />

            <input
            className = {"input"}
            type = "password"
            placeholder = "Password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            required
            />

            <button className={"button"} type="submit">Sign in</button>


            <button
            className = {"button"}
            type="button"
            onClick={()=>navigate("/register")}
            >
            Register
            </button>
        </form>
    </div>);
}

export default LogIn;