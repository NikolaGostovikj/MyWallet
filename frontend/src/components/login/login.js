import React, {useState} from "react";
import './loginCss.css'; 


function LogIn({onLogin, onRegister}){
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const URL = "http://88.200.63.148:5555/"
    function login(){

    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        onLogin(email,password);
    }

    return(<div className ={"container"}>
    
        <form className = {"form"} onSubmit={handleSubmit}>
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

            <button className={"button"} type="submit" onClick={login}>Sign in</button>


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