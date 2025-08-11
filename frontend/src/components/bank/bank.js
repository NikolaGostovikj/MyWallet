import React, { useEffect, useState } from "react";
import "./bankCss.css";
import { useNavigate, useLocation } from "react-router-dom";

const URL = "http://88.200.63.148:5555/";

export default function Bank() {
  const [user, setUser] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const s = await fetch(`${URL}users/session`, { credentials: "include" });
        const sess = await s.json();
        if (!sess?.logged_in) return navigate("/");

        const u = await fetch(`${URL}users/get/${sess.user_id}`, { credentials: "include" });
        const data = await u.json();
        setUser(data);

       
        const alertRes = await fetch(`${URL}alert/check-bank`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        });
        const alertData = await alertRes.json();
        if (alertData?.message) {
          setAlertMessage(alertData.message);
          setAlertType(alertData.type || "info");
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [location.key, navigate]);

  async function logout() {
    await fetch(`${URL}users/logout`, { method: "GET", credentials: "include" });
    navigate("/");
  }

  const amount = Number(user?.amount || 0);

  return (
    <div className="bank-container">
      {/*Alert*/}
      {alertMessage && (
        <div className={`popup-alert ${alertType}`}>
          <p>{alertMessage}</p>
          <button onClick={() => setAlertMessage(null)}>OK</button>
        </div>
      )}

      <div className="cloud">
        <div className="money-fill" style={{ height: `100%` }}>
          <span className="money-text">€{amount.toFixed(2)}</span>
        </div>
      </div>

      <div className="buttons">
        <button onClick={() => navigate("/income")}>Add Income</button>
        <button onClick={() => navigate("/allIncomes")}>Show Incomes</button>
        <button onClick={() => navigate("/expensePage")}>Add Expense</button>
        <button onClick={() => navigate("/allExpenses")}>Show Expenses</button>
        <button onClick={() => navigate("/goalPage")}>Your Goals</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
