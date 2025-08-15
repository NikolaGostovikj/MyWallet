import React, { useEffect, useState } from "react";
import "./manageUsersCss.css";
import { useNavigate } from "react-router-dom";

const URL = "http://88.200.63.148:5555/";

function ManageUsers() {
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

  async function handleDelete(user) {
    const id = user.user_id ?? user.id;
    if (!id) {
      alert("Missing user id.");
      return;
    }
    try {
      const response = await fetch(`${URL}users/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ user_id: id }),
      });

      const result = await response.json();
      if (result?.success) {
        setUsers((prev) => prev.filter((u) => (u.user_id ?? u.id) !== id));
        alert("User has been successfully deleted");
      } else {
        alert(result?.message || "Deleting a user failed.");
      }
    } catch (err) {
      console.error("Error during delete:", err);
      alert("An error occurred. Please try again later.");
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="manage-users-page">
    <div className="container">
      <div className="form">
        <h1 className="title">Manage Users</h1>

        <button className="button" type="button" onClick={() => navigate("/bank")}>
          Back
        </button>

        {users?.length > 0 ? (
          <ul className="user-list">
            {users.map((u, idx) => (
              <li
                key={u.user_id ?? u.id ?? idx}
                className="user-item deletable"
              >
                <button
                  className="delete-btn"
                  aria-label={`Delete ${u.name || "user"}`}
                  title="Delete user"
                  onClick={() => handleDelete(u)}
                >
                  X
                </button>

                <strong>{u.name} {u.lastname}</strong>
                <span>Email: {u.email || "—"}</span>
                <span>Role: {u.role || "—"}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
    </div>
  );
}

export default ManageUsers;
