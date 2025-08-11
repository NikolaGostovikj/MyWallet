import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./deleteGoalCss.css"; // uses same base look as your ShowGoals CSS
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
    try {
      
      if (g.goal_id || g.id) {
        const id = g.goal_id ?? g.id;
        const res = await fetch(`${URL}goal/delete/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        const out = await res.json();
        if (out?.success === false) return alert(out.message || "Delete failed.");
      } else {
        
        const res = await fetch(`${URL}goal/delete`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: g.name, deadline: g.deadline }),
        });
        const out = await res.json();
        if (out?.success === false) return alert(out.message || "Delete failed.");
      }

      
      setGoals((prev) =>
        prev.filter((it) => (it.goal_id ?? it.id) !== (g.goal_id ?? g.id) || (g.goal_id == null && g.id == null && !(it.name === g.name && it.deadline === g.deadline)))
      );
    } catch (err) {
      console.error("Delete error:", err);
      alert("Could not delete goal.");
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
                  ×
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
