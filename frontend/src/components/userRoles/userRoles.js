import React, { useEffect, useState } from "react";
import "./userRolesCss.css";
import { useNavigate } from "react-router-dom";

const URL = "http://88.200.63.148:5555/";

function UserRoles() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  async function fetchAllUsers() {
    try {
      const res = await fetch(`${URL}users/list`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error loading users:", e);
      alert("Failed to load users.");
    }
  }

  async function handleToggleRole(user) {
    const id = user.user_id ?? user.id;
    if (!id) return alert("Missing user id.");

    const nextRole = user.role === "admin" ? "student" : "admin";

    try {
      const resp = await fetch(`${URL}users/update-role`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ user_id: id, role: nextRole }),
      });

      const result = await resp.json().catch(() => ({}));
      if (!resp.ok || !result?.success) {
        return alert(result?.message || `Role update failed (${resp.status}).`);
      }

    
      setUsers(prev =>
        prev.map(u =>
          (u.user_id ?? u.id) === id ? { ...u, role: nextRole } : u
        )
      );
    } catch (err) {
      console.error("Error updating role:", err);
      alert("An error occurred while updating role.");
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="user-roles-page">
      <div className="container">
        <div className="form">
          <h1 className="title">Manage User Roles</h1>

          <button className="button" type="button" onClick={() => navigate("/adminPage")}>
            Back
          </button>

          {users?.length > 0 ? (
            <ul className="user-list">
              {users.map((u, idx) => {
                const id = u.user_id ?? u.id ?? idx;
                return (
                  <li key={id} className="user-item">
                    <div className="user-meta">
                      <strong>{u.name} {u.lastname}</strong>
                      <span>Email: {u.email || "—"}</span>
                      <span>Role: <b>{u.role || "—"}</b></span>
                    </div>

                    <button
                      className="btn secondary"
                      type="button"
                      onClick={() => handleToggleRole(u)}
                      title="Toggle between admin and student"
                    >
                      Toggle Role
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserRoles;
