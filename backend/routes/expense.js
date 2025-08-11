const express = require("express");
const expense = express.Router();
const DB = require("../db/dbConn.js");

expense.post("/add", async (req, res) => {
  if (!req.session.logged_in || !req.session.user_id) {
    return res.status(401).json({ success: false, message: "Not logged in" });
  }

  const userId = req.session.user_id;
  const amount = Number(req.body.amount);
  const storeId = Number(req.body.store_id);
  const storename = (req.body.storename || '').trim();
  const description = (req.body.description || '').trim() || null;
  const list = (req.body.list || '').trim(); // JSON string
  const dateTime = new Date();

  if (!Number.isFinite(amount) || amount <= 0 || !storeId || !storename || !list) {
    return res.status(400).json({ success: false, message: "Please provide store_id, storename, positive amount, and list." });
  }

  try {
    // insert expense (with date_time)
    const queryResult = await DB.addExpense(userId, storeId, amount, storename, description, list, dateTime);
    if (!queryResult.affectedRows) {
      return res.status(500).json({ success: false, message: "Failed to add expense." });
    }

    // decrement balance, then return new amount
    await DB.decrementUserAmount(userId, amount);
    const newAmount = await DB.getUserAmount(userId);

    return res.status(201).json({ success: true, message: "Expense added.", expense_id: queryResult.insertId, newAmount });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Server error adding expense." });
  }
});

expense.get('/show', async (req, res) => {
  try {
    const queryResult = await DB.allExpenses(req.session.user_id, req.session.email);
    res.json(queryResult);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

expense.get('/show-monthly', async (req, res) => {
  try {
    const queryResult = await DB.allMonthlyExpenses(req.session.user_id, req.session.email);
    res.json(queryResult);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = expense;
