const express = require("express")
const items = express.Router();
const DB = require('../db/dbConn.js')


items.get('/showLidl',async(req,res)=>{
    try {
            var queryResult = await DB.allItemsLidl();
            res.json(queryResult)
        }
        catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
});

items.get('/showMercator',async(req,res)=>{
    try {
            var queryResult = await DB.allItemsMercator();
            res.json(queryResult)
        }
        catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
});
module.exports = items
