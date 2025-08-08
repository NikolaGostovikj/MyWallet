import React, { useState, useEffect } from 'react';
import './bankCss.css'; 
import { useNavigate, useLocation } from 'react-router-dom';
function Bank() {
  const [balance, setBalance] = useState(500); // starting money
  const maxBalance = 1000; // max fullness
  const navigate = useNavigate();
  const URL = "http://88.200.63.148:5555/";
  const location = useLocation();
  const user = location.state.user;


 async function logout() {
    try {
      await fetch(`${URL}users/logout`, {
        method: "GET",
        credentials: "include"
      });

      navigate("/"); // back to login
    
    } catch (err) {
    console.error("Logout failed", err);
    }
}

  const fullness = Math.min((balance / maxBalance) * 100, 100);

  return (
    <div className="bank-container">
      <div className="cloud">
        <div
          className="money-fill"
          style={{ height: `${fullness}%` }}
        >
          <span className="money-text">${user.amount}</span>
        </div>
      </div>

      <div className="buttons">
        <button onClick={() => navigate("/income")}>Add Income</button>
        <button onClick={() => setBalance(Math.max(balance - 50, 0))}>
          Add Expense
        </button>
        <button onClick={() => alert('Goal creation coming soon!')}>
          Create Goal
        </button>
        <button onClick={logout}>
            Logout
        </button>
      </div>
    </div>
  );
}

export default Bank;
