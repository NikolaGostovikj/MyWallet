import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./deleteGoalCss.css"; 
const URL = "http://88.200.63.148:5555/";

function DeleteGoal() {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  async function loadGoals() {
    try {
      const res = await fetch(`${URL}goal/show`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setGoals(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading goals:", err);
      alert("Failed to load goals.");
    }
  }

  
  async function handleDelete(g) {
      const id = g.goal_id;
      try {
    const response = await fetch(`${URL}goal/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      body: JSON.stringify({goal_id:id})
    });

    const result = await response.json();
    console.log(result);

    if (result.success) {
      navigate("/bank");
    } else {
      alert(result.message || "Deleting a goal failed.");
    }
  } catch (err) {
    console.error("Error during delete:", err);
    alert("An error occurred. Please try again later.");
  }
}

  useEffect(() => {
    loadGoals();
  }, []);

  return (
    <div className="container">
      <div className="form">
        <h1 className="title">Delete Goals</h1>

        <button className="button" type="button" onClick={() => navigate("/goalPage")}>
          Back
        </button>

        {goals?.length > 0 ? (
          <ul className="goal-list">
            {goals.map((g, idx) => (
              <li key={g.goal_id ?? g.id ?? idx} className="goal-item deletable">
                <button
                  className="delete-btn"
                  aria-label={`Delete ${g.name}`}
                  title="Delete goal"
                  onClick={() => handleDelete(g)}
                >
                  X
                </button>

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

export default DeleteGoal;
