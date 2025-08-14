import React, { useEffect, useState } from "react";
import "./bankCss.css";
import { useNavigate, useLocation } from "react-router-dom";

const URL = "http://88.200.63.148:5555/";

export default function Bank() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
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
        setIsAdmin(sess?.role === "admin");

        const u = await fetch(`${URL}users/get/${sess.user_id}`, { credentials: "include" });
        const data = await u.json();
        setUser(data);

        if (sess?.role === "admin") {
          const resp = await fetch(`${URL}users/list`, { credentials: "include" });
          const list = await resp.json();
          setAllUsers(Array.isArray(list) ? list : []);
        }

        const alertRes = await fetch(`${URL}alert/check-bank`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
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
      {alertMessage && (
        <div className={`popup-alert ${alertType}`}>
          <p>{alertMessage}</p>
          <button onClick={() => setAlertMessage(null)}>OK</button>
        </div>
      )}

      <header className="header">
        <h1 className="app-title">Your Balance</h1>
      </header>

      <div className="cloud">
        <div className="money-fill" style={{ height: `100%` }}>
          <span className="money-text">€{amount.toFixed(2)}</span>
        </div>
      </div>

      {isAdmin && (
        <div className="admin-panel">
          <p><strong>Hello, admin{user?.name ? ` ${user.name}` : ""}!</strong></p>
          <h3>All users</h3>
          {allUsers.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <ul className="admin-user-list">
              {allUsers.map((u) => (
                <li key={u.user_id}>
                  <span>{u.name} {u.lastname}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <nav className="buttons">
        <button onClick={() => navigate("/income")}>Add Income</button>
        <button onClick={() => navigate("/allIncomes")}>Show Incomes</button>
        <button onClick={() => navigate("/expensePage")}>Add Expense</button>
        <button onClick={() => navigate("/allExpenses")}>Show Expenses</button>
        <button onClick={() => navigate("/goalPage")}>Your Goals</button>
        <button onClick={logout}>Logout</button>
      </nav>
    </div>
  );
}
