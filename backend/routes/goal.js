const express = require("express")
const goal = express.Router();
const DB = require('../db/dbConn.js')

goal.post('/create', async (req,res)=>{
    try{
        
        if (!req.session.logged_in || !req.session.user_id) {
            return res.status(401).json({ success: false, message: "Not logged in" });
        }

         const userId = req.session.user_id;
         const name = req.body.name;
         const date = req.body.deadline;
         const targetAmount = req.body.targetAmount;
        
         if(userId && name && date && targetAmount){
            let queryResult = await DB.addGoal(userId,name,targetAmount,date);
             if(queryResult.affectedRows){
                console.log("Added goal to the database");
                res.status(201).json({ success:true, message:"Goal added."});
            }

         }else{
            console.log("Please fill all fields");
            res.json({ success: false, message: "Please fill fields!" });
            res.status(204)
         }

    }catch(err){
        console.log(err)
        res.sendStatus(500);
    }
})

module.exports = goal
