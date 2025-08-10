import React from "react";
import { useNavigate } from "react-router-dom";
import "./goalPageCss.css";

function GoalPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="button-container">
        <button className="button" onClick={() => navigate("/goal")}>
          Add Goal
        </button>
        <button className="button" onClick={() => navigate("/showGoals")}>
          Show Goals
        </button>
      </div>
    </div>
  );
}

export default GoalPage;
