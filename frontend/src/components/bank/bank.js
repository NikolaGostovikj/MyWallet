import React, { useState } from 'react';
import './bankCss.css'; 

function Bank() {
  const [balance, setBalance] = useState(500); // starting money
  const maxBalance = 1000; // max fullness

  async function logout(){
    
  }
  // fullness percentage
  const fullness = Math.min((balance / maxBalance) * 100, 100);

  return (
    <div className="bank-container">
      <div className="cloud">
        <div
          className="money-fill"
          style={{ height: `${fullness}%` }}
        >
          <span className="money-text">${balance}</span>
        </div>
      </div>

      <div className="buttons">
        <button onClick={() => setBalance(balance + 100)}>Add Income</button>
        <button onClick={() => setBalance(Math.max(balance - 50, 0))}>
          Add Expense
        </button>
        <button onClick={() => alert('Goal creation coming soon!')}>
          Create Goal
        </button>
        <button onClick={logout()}>
            Logout
        </button>
      </div>
    </div>
  );
}

export default Bank;
