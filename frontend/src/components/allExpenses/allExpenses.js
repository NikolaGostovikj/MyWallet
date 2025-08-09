import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './allExpensesCss.css';

function allExpenses() {
  const [expenses, setExpenses] = useState([]);
  const URL = "http://88.200.63.148:5555/";
  const navigate = useNavigate();

  async function showAllExpenses(e) {
    e?.preventDefault();
    try {
      const response = await fetch(`${URL}expense/show`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      console.log(result);

      if (Array.isArray(result)) {
        setExpenses(result);
      } else if (result?.success === false) {
        alert(result.message || "Failed to load incomes.");
      } else {
        setExpenses(result || []);
      }
    } catch (err) {
      console.error("Error loading incomes:", err);
      alert("An error occurred. Please try again later.");
    }
  }


  async function showMonthlyExpenses(e) {
    e?.preventDefault();
    try {
      const response = await fetch(`${URL}expense/show-monthly`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      console.log(result);

      if (Array.isArray(result)) {
        setExpenses(result);
      } else if (result?.success === false) {
        alert(result.message || "Failed to load monthly incomes.");
      } else {
        setExpenses(result || []);
      }
    } catch (err) {
      console.error("Error loading monthly incomes:", err);
      alert("An error occurred. Please try again later.");
    }
  }

  return (
    <div className="incomes-container">
      <div className="showIncomes" onClick={showAllExpenses}>
        Show All Expenses
      </div>

      <div className="showIncomesMonth" onClick={showMonthlyExpenses}>
        Show All Expenses this Month
      </div>

      {expenses?.length > 0 && (
        <ul style={{ marginTop: 16 }}>
          {expenses.map((it, idx) => (
            <li key={idx}>
              <strong>{it.name}</strong> — {it.amount} ({new Date(it.date_time).toLocaleString()})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default allExpenses;
