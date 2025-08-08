const express = require("express")
const users = express.Router();
const DB = require('../db/dbConn.js')

//Checks if user submitted both fields, if user exist and if the combination of user and password matches
users.post('/login', async (req, res) => {
//
    var email = req.body.email;
    var password = req.body.password;
    
    if (email && password) {
        try {
            let queryResult = await DB.AuthUser(email);

            if (queryResult.length > 0) {
                if (password === queryResult[0].password) {
                    console.log(queryResult)
                    console.log("LOGIN OK");
                    req.session.logged_in = true;
                    req.session.user_id = queryResult[0].user_id; 
                    req.session.email = queryResult[0].email;     
                    res.json({ success: true, message: "LOGIN OK" });
                    res.status(200)
                }
                else {
                    console.log("INCORRECT PASSWORD");
                    res.json({ success: false, message: "INCORRECT PASSWORD" });
                    res.status(200)
                }
            } else {
                console.log("USER NOT REGISTRED");
                res.json({ success: false, message: "USER NOT REGISTRED" });
                res.status(200)
            }
        }
        catch (err) {
            console.log(err)
            res.status(404)
        }
    }
    else {
        console.log("Please enter Username and Password!")
        res.json({ success: false, message: "Please enter Username and Password!" });
        res.status(204)
    }
    res.end();
});

users.get('/session', async (req, res, next)=>{
    try{
        console.log("session data: ")
        console.log(req.session)
        res.json(req.session);
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
        next()
    }
 })
 
 users.get('/logout', async (req,res, next)=>{
    try{
        req.session.destroy(function(err) {
            res.json({status:{success: true, msg: err}})
        })
        
    }
    catch(err){
        console.log(err)
        res.json({status:{success: false, msg: err}})
        res.sendStatus(500)
        next()
    }
 })

 users.get('/list', async (req, res, next) => {
    try {
        var queryResult = await DB.allUsers();
        res.json(queryResult)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})
 
 
 


//Inserts one new item to the database
users.post('/register', async (req, res, next) => {

    let userId = req.body.userId;
    let name = req.body.name;
    let lastname = req.body.lastname;
    let password = req.body.password;
    let email = req.body.email;
    let amount = req.body.amount;
    let role = req.body.role;


    var isComplete = userId && name && lastname && password && email && amount && role;
    if (isComplete) {
        try {
        
                var queryResult = await DB.registerUser(userId,name,lastname,password,email,amount,role);
                if (queryResult.affectedRows) {
                    console.log("New article added!!")
                    res.json({status:{success: true, msg: "News item added!"}})
                }
            
            }  
           

            
        catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
    else {
        console.log("A field is empty!")
        res.json({status:{success: false, msg: "A field is empty!"}})
        }
    res.end()


})



module.exports = users
