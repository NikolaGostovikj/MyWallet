import React, { useEffect, useState } from "react";
import "./bankCss.css";
import { useNavigate, useLocation } from "react-router-dom";

const URL = "http://88.200.63.148:5555/";

export default function Bank() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const s = await fetch(`${URL}users/session`, { credentials: "include" });
        const sess = await s.json();
        console.log(sess)
        if (!sess?.logged_in) return navigate("/");

        const u = await fetch(`${URL}users/get/${sess.user_id}`, { credentials: "include" });
        const data = await u.json();
        setUser(data);
      } catch (e) {
        console.error(e);
      }
    })();
  // refetch each time you land on /bank (location.key changes even if the path is the same)
  }, [location.key, navigate]);

  async function logout() {
    await fetch(`${URL}users/logout`, { method: "GET", credentials: "include" });
    navigate("/");
  }

  const amount = Number(user?.amount || 0);
  const maxBalance = 1000;
  const fullness = Math.min((amount / maxBalance) * 100, 100);

  return (
    <div className="bank-container">
      <div className="cloud">
        <div className="money-fill" style={{ height: `100%` }}>
          <span className="money-text">€{amount.toFixed(2)}</span>
        </div>
      </div>

      <div className="buttons">
        <button onClick={() => navigate("/income")}>Add Income</button>
        <button onClick={()=> navigate("/allIncomes")}>Show Incomes</button>
        <button onClick={() => alert("Goal creation coming soon!")}>Create Goal</button>
        <button onClick={logout}>Logout</button>
        
      </div>
    </div>
  );
}