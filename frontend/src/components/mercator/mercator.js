import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./mercatorCss.css";

function Mercator() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const URL = "http://88.200.63.148:5555/";
  const navigate = useNavigate();


  async function addExpense(e) {
  e.preventDefault();

  if (selected.length === 0) return alert("Select at least one item.");

  const amount = Number(total);  
  if (!Number.isFinite(amount) || amount <= 0) {
    return alert("Total must be a positive number.");
  }

  const list = JSON.stringify(
    selected.map(it => ({
      name: it.name,
      category: it.category,
      price: Number(it.price),
    }))
  );

  const res = await fetch(`${URL}expense/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      store_id: 1,            
      storename: "Mercator",
      amount,                  
      list,                    
      description: "Purchase at Mercator",
    }),
  });

  const result = await res.json();
  if (res.ok && result.success) {
    navigate("/bank"); 
  } else {
    alert(result.message || "Failed to add expense.");
  }
}


  async function showAllItems() {
    try {
      const response = await fetch(`${URL}items/showMercator`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (Array.isArray(result)) {
        setItems(result);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error("Error loading items:", err);
    }
  }

  useEffect(() => {
    showAllItems();
  }, []);

  const toggleSelect = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const total = selected.reduce((sum, it) => sum + parseFloat(it.price), 0).toFixed(2);

  return (
    <div className="container">
      <div className="form">
        <h1 className="title">Mercator – Items</h1>

        <button className="button" type="button" onClick={() => navigate("/bank")}>
          Back
        </button>

        {items.length > 0 ? (
          <table className="items-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Name</th>
                <th>Price (€)</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => {
                const active = selected.includes(item);
                return (
                  <tr
                    key={idx}
                    onClick={() => toggleSelect(item)}
                    className={active ? "active" : ""}
                  >
                    <td>{item.category}</td>
                    <td>{item.name}</td>
                    <td>{parseFloat(item.price).toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No items found.</p>
        )}

        <div className="summary">
          <strong>Total amount spent:</strong> € {total}
        </div>

        {selected.length > 0 && (
          <div className="selected-list">
            <h3>Selected Items:</h3>
            <ul>
              {selected.map((it, idx) => (
                <li key={idx}>
                  {it.name} – € {parseFloat(it.price).toFixed(2)} ({it.category})
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="button"
          type="button"
          onClick={addExpense}
          disabled={selected.length === 0}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Mercator;
