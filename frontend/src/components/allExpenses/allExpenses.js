import React, { useEffect, useState } from "react";
import "./allExpensesCss.css";
import { useNavigate } from "react-router-dom";

const URL = "http://88.200.63.148:5555/";

function AllExpenses() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  async function fetchAllExpenses() {
    try {
      const res = await fetch(`${URL}expense/show`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setExpenses(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error loading expenses:", e);
      alert("Failed to load expenses.");
    }
  }

  useEffect(() => {
    fetchAllExpenses();
  }, []);

  return (
    <div className="container">
      <div className="form">
        <h1 className="title">Your Expenses</h1>

        <button className="button" type="button" onClick={() => navigate("/bank")}>
          Back
        </button>

        {expenses?.length > 0 ? (
          <ul className="expense-list">
            {expenses.map((e, idx) => (
              <li key={idx} className="expense-item">
                <strong>{e.description}</strong>
                <span>Amount: €{e.amount}</span>
                {e.storename && <span>Store: {e.storename}</span>}
                <span>Date: {new Date(e.date_time).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No expenses found.</p>
        )}
      </div>
    </div>
  );
}
export default AllExpenses