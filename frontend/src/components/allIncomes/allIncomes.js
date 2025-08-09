import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function allIncomes() {
  const [incomes, setIncomes] = useState([]);
  const URL = "http://88.200.63.148:5555/";
  const navigate = useNavigate();

  async function showAllIncomes(e) {
    e?.preventDefault();
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


  async function showMonthlyIncomes(e) {
    e?.preventDefault();
    try {
      const response = await fetch(`${URL}income/show-monthly`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      console.log(result);

      if (Array.isArray(result)) {
        setIncomes(result);
      } else if (result?.success === false) {
        alert(result.message || "Failed to load monthly incomes.");
      } else {
        setIncomes(result || []);
      }
    } catch (err) {
      console.error("Error loading monthly incomes:", err);
      alert("An error occurred. Please try again later.");
    }
  }

  return (
    <div className="incomes-container">
      <div className="showIncomes" onClick={showAllIncomes}>
        Show All Incomes
      </div>

      <div className="showIncomesMonth" onClick={showMonthlyIncomes}>
        Show All Incomes this Month
      </div>

      {incomes?.length > 0 && (
        <ul style={{ marginTop: 16 }}>
          {incomes.map((it, idx) => (
            <li key={idx}>
              <strong>{it.name}</strong> — {it.amount} ({new Date(it.date_time).toLocaleString()})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default allIncomes;
