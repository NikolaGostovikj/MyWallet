import React from "react";
import { useNavigate } from "react-router-dom";
import "./expenseCss.css";

function ExpensePage() {
  const navigate = useNavigate();

  return (
    <div className="expense-container">
      <div className="storeExpense">Please choose a store:</div>

      <div className="stores-grid">
        <div className="store-option" onClick={() => navigate("/lidl")}>
          <img src="../../images/lidl.jpg" alt="Lidl" />
        </div>

        <div className="store-option" onClick={() => navigate("/mercator")}>
          <img src="../../images/mercator.jpg" alt="Mercator" />
        </div>
      </div>
      <button  className="button" onClick={()=>navigate("/bank")}>Go Back</button>
    </div>
  );
  
}

export default ExpensePage;
