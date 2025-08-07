import React, {useState} from "react";
import './loginCss.css'; 


function LogIn({onRegister}){
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const URL = "http://88.200.63.148:5550/"

    async function login(e){
        e.preventDefault();
        const response = await fetch(`${URL}users/login`,{method:"POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify({email:email,password:password})})
        const result = await response.json();
        console.log(result);
    }
    async function onRegister(){
        
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
            onClick={onRegister}
            >
            Register
            </button>
        </form>
    </div>);
}

export default LogIn;