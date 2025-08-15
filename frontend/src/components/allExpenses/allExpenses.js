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

  async function handleDelete(expense) {
    const id = expense.expense_id ?? expense.id;
    if (!id) {
      alert("Missing expense id.");
      return;
    }
    try {
      const response = await fetch(`${URL}expense/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ expense_id: id }),
      });

      const result = await response.json();
      if (result?.success) {
       
        setExpenses((prev) => prev.filter((e) => (e.expense_id ?? e.id) !== id));
      } else {
        alert(result?.message || "Deleting an expense failed.");
      }
    } catch (err) {
      console.error("Error during delete:", err);
      alert("An error occurred. Please try again later.");
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
              <li
                key={e.expense_id ?? e.id ?? idx}
                className="expense-item deletable"
              >
                <button
                  className="delete-btn"
                  aria-label={`Delete ${e.description || "expense"}`}
                  title="Delete expense"
                  onClick={() => handleDelete(e)}
                >
                  X
                </button>

                <strong>{e.description}</strong>
                <span>Amount: €{Number(e.amount).toFixed(2)}</span>
                {e.storename && <span>Store: {e.storename}</span>}
                <span>
                  Date:{" "}
                  {e.date_time ? new Date(e.date_time).toLocaleDateString() : "—"}
                </span>
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

export default AllExpenses;
