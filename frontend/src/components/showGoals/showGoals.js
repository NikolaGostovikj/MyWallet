import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./showGoalsCss.css";

function ShowGoals() {
  const [goals, setGoals] = useState([]);
  const URL = "http://88.200.63.148:5555/";
  const navigate = useNavigate();

  async function showAllGoals() {
    try {
      const response = await fetch(`${URL}goal/show`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      console.log(result);

      if (Array.isArray(result)) {
        setGoals(result);
      } else if (result?.success === false) {
        alert(result.message || "Failed to load goals.");
      } else {
        setGoals(result || []);
      }
    } catch (err) {
      console.error("Error loading goals:", err);
      alert("An error occurred. Please try again later.");
    }
  }

  useEffect(() => {
    showAllGoals();
  }, []);

  return (
    <div className="container">
      <div className="form">
        <h1 className="title">Your Goals</h1>

        <button className="button" type="button" onClick={() => navigate("/goalPage")}>
          Back
        </button>

        {goals?.length > 0 ? (
          <ul className="goal-list">
            {goals.map((g, idx) => (
              <li key={idx} className="goal-item">
                <strong>{g.name}</strong>
                <span>Target: €{g.target_amount}</span>
                <span>Deadline: {new Date(g.deadline).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No goals found.</p>
        )}
      </div>
    </div>
  );
}

export default ShowGoals;
