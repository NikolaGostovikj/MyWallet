const express = require("express");
const alert = express.Router();
const DB = require("../db/dbConn.js");

const THRESHOLD = 50;

alert.post("/check-bank", async (req, res) => {
  try {
    const userId = req.session.user_id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not logged in" });
    }

    const amount = Number(await DB.getUserAmount(userId)) || 0;
    const goals = await DB.goalsByUserId(userId);
    const now = new Date();
    if(amount < THRESHOLD){
      const msg = `Low balance (€${amount.toFixed(2)}).`;
      await DB.addAlert(userId, msg, "warning", "new");
      return res.json({ success: true, message: msg, type: "warning" });
    }
    
    if (amount < THRESHOLD && goals.some(g => new Date(g.deadline) > now && amount < g.target_amount)) {
      const msg = `Low balance (€${amount.toFixed(2)}). You have pending goals.`;
      await DB.addAlert(userId, msg, "warning", "new");
      return res.json({ success: true, message: msg, type: "warning" });
    }

    
    const finishedGoal = goals.find(g => amount >= g.target_amount && now > new Date(g.deadline));
    if (finishedGoal) {
      const msg = `Great job! You reached your goal "${finishedGoal.name}".`;
      await DB.addAlert(userId, msg, "success", "new");
      return res.json({ success: true, message: msg, type: "success" });
    }

    
    return res.json({ success: true, message: null });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error checking alerts" });
  }
});

module.exports = alert;
