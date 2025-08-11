const conn = require("./db/conn.js")
const express = require('express')
require('dotenv').config()
const app = express()
const cors = require("cors")
const path = require('path')
const port = process.env.PORT || 5555


//const novice = require('./routes/novice')
const users = require('./routes/users')
const goal = require('./routes/goal')
const items = require('./routes/items')
const income = require('./routes/income')
const expense = require('./routes/expense')
const store = require('./routes/store')
const alert = require('./routes/alert')
//const upload = require('./routes/upload')


const session = require('express-session')

app.set('trust proxy', 1)
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));


app.use(express.urlencoded({extended : true}));
app.use(cors({
   origin: ["http://localhost:3000/", 'http://88.200.63.148:5556'],
   methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
   credentials: true
}))


app.use(express.json());              
app.use(express.urlencoded({extended:true}));




app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.get("/health", async (req, res) => {
    function checkDatabaseConnection() {
        return new Promise((resolve, reject) => {
            conn.query("SELECT 1", (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
        });
    }

    try {
        await checkDatabaseConnection();
        res.status(200).send("DB is OK");
    } catch (err) {
        console.error("DB is not healthy:", err.message);
        res.status(500).send("Not healthy");
    }
})

//app.use('/novice', novice)
app.use('/users', users)
app.use('/alert', alert)
app.use('/store', store)
app.use('/items', items)
app.use('/goal', goal)
app.use('/income', income)
app.use('/expense', expense)
//app.use('/uploadFile', upload)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});