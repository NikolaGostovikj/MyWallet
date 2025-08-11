import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./allIncomesCss.css"; 

function AllIncomes() {
  const [incomes, setIncomes] = useState([]);
  const URL = "http://88.200.63.148:5555/";
  const navigate = useNavigate();

  async function showAllIncomes() {
    try {
      const response = await fetch(`${URL}income/show`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      console.log(result);

      if (Array.isArray(result)) {
        setIncomes(result);
      } else if (result?.success === false) {
        alert(result.message || "Failed to load incomes.");
      } else {
        setIncomes(result || []);
      }
    } catch (err) {
      console.error("Error loading incomes:", err);
      alert("An error occurred. Please try again later.");
    }
  }

  useEffect(() => {
    showAllIncomes();
  }, []);

  return (
    <div className="container">
      <div className="form">
        <h1 className="title">Your Incomes</h1>

        <button className="button" type="button" onClick={() => navigate("/bank")}>
          Back
        </button>

        {incomes?.length > 0 ? (
          <ul className="income-list">
            {incomes.map((it, idx) => (
              <li key={idx} className="income-item">
                <strong>{it.name}</strong>
                <span>Amount: €{it.amount}</span>
                <span>Date: {new Date(it.date_time).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No incomes found.</p>
        )}
      </div>
    </div>
  );
}

export default AllIncomes;
