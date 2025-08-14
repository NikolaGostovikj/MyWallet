import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./lidlCss.css";

function Mercator() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [quantities, setQuantities] = useState({});
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
      selected.map((it) => ({
        name: it.name,
        category: it.category,
        price: Number(it.price),
        quantity: Number(quantities[it.name] || 1),
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

  const qtyOf = (item) => quantities[item.name] ?? 1;

  const toggleSelect = (item) => {
    setSelected((prev) => {
      if (prev.includes(item)) {
        const next = prev.filter((i) => i !== item);
        setQuantities((q) => {
          const c = { ...q };
          delete c[item.name];
          return c;
        });
        return next;
      } else {
        setQuantities((q) => ({ ...q, [item.name]: 1 }));
        return [...prev, item];
      }
    });
  };

  const changeQty = (item, raw) => {
    const n = Math.floor(Number(raw));
    const val = Number.isFinite(n) && n >= 1 ? n : 1;
    setQuantities((q) => ({ ...q, [item.name]: val }));
    setSelected((p) => (p.includes(item) ? p : [...p, item]));
  };

  const total = selected
    .reduce((sum, it) => sum + qtyOf(it) * parseFloat(it.price || 0), 0)
    .toFixed(2);

  return (
    <div className="container">
      <div className="form">
        <h1 className="title">Lidl – Items</h1>
        <button className="button" type="button" onClick={() => navigate("/bank")}>
          Back
        </button>
        {items.length > 0 ? (
          <div className="table-scroll">
            <table className="items-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Name</th>
                  <th>Price (€)</th>
                  <th>Qty</th>
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
                      <td>
                        <input
                          className="qty-input"
                          type="number"
                          min="1"
                          placeholder={active ? undefined : "—"}
                          value={active ? quantities[item.name] ?? 1 : ""}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!active) toggleSelect(item);
                          }}
                          onChange={(e) => changeQty(item, e.target.value)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
                  {it.name} × {qtyOf(it)} – € {(qtyOf(it) * parseFloat(it.price)).toFixed(2)} ({it.category})
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
