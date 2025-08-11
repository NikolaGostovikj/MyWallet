import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./goalCss.css";

function Goal() {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");

  const URL = "http://88.200.63.148:5555/";
  const navigate = useNavigate();

  async function saveGoal(e) {
    e.preventDefault();

    if (!name.trim() || !targetAmount || !deadline) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const res = await fetch(`${URL}goal/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: name,
          targetAmount: Number(targetAmount),
          deadline: deadline,
        }),
      });

      const result = await res.json();
      console.log(result);

      if(result.success){
        alert("Goal saved!");
        navigate("/bank"); 
      }
      
    } catch (error) {
      console.error(error);
      alert("Failed to save goal.");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Enter your goal</h1>

      <form className="form" onSubmit={saveGoal}>
        <input
          className="input"
          type="text"
          placeholder="Goal name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="input"
          type="number"
          placeholder="Target amount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          required
        />

        <input
          className="input"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />

        <button className="button" type="submit">
          Save Goal
        </button>

        <button className="button" type="button" onClick={() => navigate("/goalPage")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Goal;
