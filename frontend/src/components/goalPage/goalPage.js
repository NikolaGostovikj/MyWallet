import React from "react";
import { useNavigate } from "react-router-dom";
import "./goalPageCss.css";

function GoalPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="button-container">
        <h1 className="title">Goals</h1>
        <button className="button" onClick={() => navigate("/goal")}>
          Add Goal
        </button>
        <button className="button" onClick={() => navigate("/showGoals")}>
          Show Goals
        </button>
        <button className="button" onClick={()=>navigate("/deleteGoal")}>
          Delete a goal</button>
        <button className="button" onClick={()=> navigate("/bank")}>
          Go Back</button>
      </div>
    </div>
  );
}

export default GoalPage;
