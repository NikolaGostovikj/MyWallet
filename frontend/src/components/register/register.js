import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './registerCss.css';


function Register(){
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [lastname,setLastname] = useState("");
    const [confirm,setConfirm] = useState("");
    const URL = "http://88.200.63.148:5555/"
    const navigate = useNavigate();

    async function register(e){
        e.preventDefault();
        if(password!==confirm){
            alert('Passwords need to match!');
            return;
        }
        const response = await fetch(`${URL}users/register`,{ method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", 
            body: JSON.stringify({
                name: name,
                lastname: lastname,
                password: password,
                email: email,
                amount: "0", 
                role: "student"
})

        })
        const result = await response.json();
        

        alert("Account created!");
        console.log(result);
        navigate("/");
    }

return (
    <div className={"container"}>
      <form className={"form"} onSubmit={register}>
        <div className="welcome">
          <h1>Create your MyWallet account</h1>
        </div>

        <input
          className={"input"}
          type="text"
          placeholder="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className={"input"}
          type="text"
          placeholder="Last name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />

        <input
          className={"input"}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className={"input"}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          className={"input"}
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <button className={"button"} type="submit">
          Register
        </button>

        <button
          className={"button"}
          type="button"
          onClick={() => navigate("/")}
        >
          Back to Login
        </button>
      </form>
    </div>
  );

}


export default Register;