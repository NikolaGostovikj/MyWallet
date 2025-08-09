const express = require("express");
const income = express.Router();
const DB = require('../db/dbConn.js');

income.post('/add',async (req,res) => {
    if (!req.session.logged_in || !req.session.user_id) {
        return res.status(401).json({ success: false, message: "Not logged in" });
    }
    const amount = Number(req.body.amount);
    const name = (req.body.name || '').trim();
    const userId = req.session.user_id;
    const dateTime = new Date();

    if (!name || !Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ success: false, message: "Please enter a valid name and positive amount." });
  }

    if(amount && name){
        try{
            let queryResult = await DB.addIncome(userId,amount,name,dateTime);
            if(queryResult.affectedRows){
                console.log("Added income to the database");
            }
            await DB.incrementUserAmount(userId, amount);
            const newAmount = await DB.getUserAmount(userId);
            res.status(201).json({ success:true, message:"Income added.", income_id: queryResult.insertId, newAmount });
        }
        catch(err){
            console.log(err)
            return res.status(500).json({ success: false, message: "Server error adding income." });
        }
    }else {
        console.log("Please enter amount and name!")
        res.json({ success: false, message: "Please enter amount and name!" });
        res.status(204)
    }
})


income.get('/show',async(req,res)=>{
    try {
            var queryResult = await DB.allIncome(req.session.user_id,req.session.email);
            res.json(queryResult)
        }
        catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
});

income.get('/show-monthly', async(req,res)=>{
    try{
        const queryResult = await DB.allMonthlyIncome(req.session.user_id,req.session.email);
        res.json(queryResult)

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
module.exports = income
