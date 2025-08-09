const express = require("express")
const expense = express.Router();
const DB = require('../db/dbConn.js')


expense.get('/show',async(req,res)=>{
    try {
            var queryResult = await DB.allExpense(req.session.user_id,req.session.email);
            res.json(queryResult)
        }
        catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
});

expense.get('/show-monthly', async(req,res)=>{
    try{
        const queryResult = await DB.allMonthlyExpenses(req.session.user_id,req.session.email);
        res.json(queryResult)

    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
module.exports = expense