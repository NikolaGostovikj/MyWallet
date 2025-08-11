import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./allExpensesCss.css";

function AllExpenses() {
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

      if (Array.isArray(result)) setExpenses(result);
      else if (result?.success === false) alert(result.message || "Failed to load expenses.");
      else setExpenses(result || []);
    } catch (err) {
      console.error("Error loading expenses:", err);
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

      if (Array.isArray(result)) setExpenses(result);
      else if (result?.success === false) alert(result.message || "Failed to load monthly expenses.");
      else setExpenses(result || []);
    } catch (err) {
      console.error("Error loading monthly expenses:", err);
      alert("An error occurred. Please try again later.");
    }
  }

  const parseList = (s) => {
    if (!s) return [];
    try {
      const arr = JSON.parse(s);
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  };

  return (
    <div className="incomes-container">
      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <button className="button" onClick={() => navigate("/bank")}>Back</button>
        <button className="button" onClick={showAllExpenses}>Show All Expenses</button>
        <button className="button" onClick={showMonthlyExpenses}>Show Expenses this Month</button>
      </div>

      {expenses?.length > 0 ? (
        <table className="items-table" style={{ marginTop: 12 }}>
          <thead>
            <tr>
              <th>Store</th>
              <th>Description</th>
              <th>Amount (€)</th>
              <th>Date</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e, idx) => {
              const items = parseList(e.list);
              return (
                <tr key={idx}>
                  <td>{e.storename}</td>
                  <td>{e.description || "-"}</td>
                  <td>{Number(e.amount).toFixed(2)}</td>
                  <td>{new Date(e.date_time).toLocaleString()}</td>
                  <td>
                    {items.length > 0
                      ? items.map((it) => it.name).join(", ")
                      : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: 16 }}>No expenses found.</p>
      )}
    </div>
  );
}

export default AllExpenses;
