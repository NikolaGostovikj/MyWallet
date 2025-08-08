const mysql = require('mysql2');


const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'SISIII2025_89231044',
})

conn.connect((err) => {
  if (err) {
    console.log("ERROR: " + err.message);
    return;
  }
  console.log('Connection established');
})


let dataPool = {}


dataPool.addStore = (location,name) => {
  return new Promise((resolve,reject) => {
    conn.query(`INSERT INTO store  (location,name) = (?,?)`,[location,name], (err,res) => {
      if (err) {return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.addItem = (storeId,name,category,price) => {
  return new Promise((resolve,reject) => {
    conn.query(`INSERT INTO item (store_id,name,category,price) = (?,?,?,?)`,[storeId,name,category,price],(err,res)=>{
      if(err) {return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.getUser = (userId) => {
  return new Promise((resolve,reject) => {
    conn.query(`SELECT * FROM users WHERE user_id = ?`,[userId], (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}
dataPool.findUser = (userId,name,lastname,email) => {
  return new Promise((resolve,reject) => {
    conn.query(`SELECT user_id,name,lastname,email,
      FROM users WHERE user_id = ? AND name = ?
      AND lastname = ? AND email = ?`,[userId,name,lastname,email], (err,res) => {
        if (err) {return reject(err)}
        return resolve(res)
      })
  })
}
dataPool.registerUser = (name,lastname,password,email,amount,role) => {
  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO users (name,lastname,password,email,amount,role) VALUES (?,?,?,?,?,?)`, [name,lastname,password,email,amount,role], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.allUsers = () => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT user_id, name, lastname FROM users`, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

//Lists all Expenses for a given user
dataPool.allExpenses = (id,email) => {
return new Promise((resolve, reject) => {
  conn.query(`SELECT E.description, E.amount, E.storename, E.date_time, E.category 
      FROM expense E 
      JOIN users U ON E.user_id = U.user_id 
      WHERE E.user_id = ? AND U.email = ?`
    , [id,email], (err,res) => {
      if (err) {return reject(err)}
      return resolve(res)
    })
  })
}
//Lists all Expenses in this month
dataPool.allMonthlyExpenses = (id,email) => {
return new Promise((resolve, reject) => {
  conn.query(`SELECT E.description, E.amount, E.storename, E.date_time, E.category 
      FROM expense E 
      JOIN users U ON E.user_id = U.user_id A 
      WHERE E.user_id = ? AND U.email = ?
      AND MONTH(E.date_time) = MONTH(CURRENT_DATE()) 
      AND YEAR(E.date_time) = YEAR(CURRENT_DATE())`
    , [id,email], (err,res) => {
      if (err) {return reject(err)}
      return resolve(res)
    })
  })
}
//Lists all Expenses for a given user
dataPool.allIncome = (id,email) => {
return new Promise((resolve, reject) => {
  conn.query(`SELECT I.name, I.amount, I.date_time,  
      FROM income I 
      JOIN users U ON I.user_id = U.user_id A 
      WHERE I.user_id = ? AND U.email = ?`
    , [id,email], (err,res) => {
      if (err) {return reject(err)}
      return resolve(res)
    })
  })
}
//Lists all income in this month NE ZABORAVAJ DA GO STAVISH VO SEMINARSKATA
dataPool.allMonthlyIncome = (id,email) => {
return new Promise((resolve, reject) => {
  conn.query(`SELECT I.name, I.amount, I.date_time,  
      FROM income I 
      JOIN users U ON I.user_id = U.user_id A 
      WHERE I.user_id = ? AND U.email = ?
      AND MONTH(I.date_time) = MONTH(CURRENT_DATE()) 
      AND YEAR(I.date_time) = YEAR(CURRENT_DATE())`
    , [id,email], (err,res) => {
      if (err) {return reject(err)}
      return resolve(res)
    })
  })
}
dataPool.addIncome = (userId,amount,name,date) => {
  return new Promise((resolve,reject) => {
    conn.query(`INSERT INTO income (user_id,amount,name,date_time) VALUES (?,?,?,?)`,[userId,amount,name,date], (err,res)=>{
      if(err) {return reject(err)}
      return resolve(res);
    })
  })
}
dataPool.addExpense = (userId,storeId,amount,name,description,category) => {
  return new Promise((resolve,reject) => {
    conn.query(`INSERT INTO expense (user_id,store_id,amount,storename,description,category) = (?,?,?,?,?,?)`,[userId,storeId,amount,name,description,category], (err,res)=>{
      if(err) {return reject(err)}
      return resolve(res);
    })
  })
}


dataPool.currentAmount = (id,email) => {
return new Promise((resolve,reject) => {
   conn.query(``
    , [id,email], (err,res) => {
      if (err) {return reject(err)}
      return resolve(res)
    })
})
}

dataPool.allMonthlyGoals = (id,email) => {
return new Promise((resolve, reject) => {
  conn.query(`SELECT G.name, G.progress_amount, G.target_amount,  
      FROM goal G 
      JOIN users U ON G.user_id = U.user_id A 
      WHERE G.user_id = ? AND U.email = ?
      AND MONTH(G.date_time) = MONTH(CURRENT_DATE()) 
      AND YEAR(G.date_time) = YEAR(CURRENT_DATE())`
    , [id,email], (err,res) => {
      if (err) {return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.AuthUser = (email) => {
  return new Promise((resolve, reject) => {
    conn.query('SELECT * FROM users WHERE email = ?', email, (err, res, fields) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })

}
dataPool.incrementUserAmount = (userId, delta) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `UPDATE users SET amount = amount + ? WHERE user_id = ?`,
      [delta, userId],
      (err, res) => {
        if (err) { return reject(err) }
        return resolve(res)
      }
    )
  })
}

dataPool.getUserAmount = (userId) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `SELECT amount FROM users WHERE user_id = ?`,
      [userId],
      (err, rows) => {
        if (err) { return reject(err) }
        return resolve(rows?.[0]?.amount ?? null)
      }
    )
  })
}

module.exports = dataPool;

