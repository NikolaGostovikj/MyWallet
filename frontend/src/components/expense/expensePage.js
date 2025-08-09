import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./expenseCss.css";

const STORES = [
  { key: "lidl", name: "Lidl" },
  { key: "mercator", name: "Mercator" },
  // add more here later: { key: "spar", name: "SPAR" }, etc.
];

function Expense() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  function chooseStore(storeKey) {
   
  }
  return (
    <div className="expense-container">
      <div className="storeExpense">Please choose a store:</div>

      <div className="stores-grid">
        {STORES.map((s) => (
          <button
            key={s.key}
            className={`store-card ${s.key} ${selected === s.key ? "selected" : ""}`}
            onClick={() => chooseStore(s.key)}
            aria-label={`Choose ${s.name}`}
          >
            <span className="store-name">{s.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ExpensePage;