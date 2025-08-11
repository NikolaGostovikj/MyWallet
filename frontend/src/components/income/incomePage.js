import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./incomeCss.css";

const URL = "http://88.200.63.148:5555/";

export default function Income() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  async function addIncome(e) {
    e.preventDefault();
    const num = Number(amount);
    if (!Number.isFinite(num) || num <= 0) return alert("Enter a positive number");

    const res = await fetch(`${URL}income/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ amount: num, name }),
    });

    const result = await res.json();
    if (res.ok && result.success) navigate("/bank"); // Bank will refetch and show the new amount
    else alert(result.message || "Failed to add income.");
  }

  return (
    <div className="income">
      <form className="form" onSubmit={addIncome}>
        <label>
          Please name your income:
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Enter amount:
          <input type="number" step="0.01" className="input" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </label>
        <button className="button" type="submit">Add Income</button>
        <button className="button" onClick={()=>navigate("/bank")}>Go Back</button>
      </form>
    </div>
  );
}
