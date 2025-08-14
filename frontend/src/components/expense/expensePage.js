import React from "react";
import { useNavigate } from "react-router-dom";
import "./expenseCss.css";
import lidlImg from "../../images/lidl.jpg";
import mercatorImg from "../../images/mercator.jpg";

function ExpensePage() {
  const navigate = useNavigate();

  return (
    <div className="expense-container">
      <div className="storeExpense">Choose Expense way</div>

      <div className="stores-grid">
        <div className="store-option" onClick={() => navigate("/lidl")}>
          <img src={lidlImg} alt="Lidl" />
        </div>

        <div className="store-option" onClick={() => navigate("/mercator")}>
          <img src={mercatorImg} alt="Mercator" />
        </div>
        <button className="store-option"
        onClick={()=> navigate('/ownExpense')}
        >
          Add own Expense
        </button>
        <button  className="button" onClick={()=>navigate("/bank")}>Go Back</button>
      </div>
      
    </div>
  );
  
}

export default ExpensePage;
