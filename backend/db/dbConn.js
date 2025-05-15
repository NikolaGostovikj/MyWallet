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
/*
dataPool.allNovice = () => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM news`, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}
*/
dataPool.registerUser = (userId,name,lastname,password,email,amount,role) => {
  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO users (user_id,name,lastname,password,email,amount,role) VALUES (?,?,?,?,?,?,?)`, [userId,name,lastname,password,email,amount,role], (err, res) => {
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

/*
dataPool.oneNovica = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM news WHERE id = ?`, id, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.deleteNovica = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(`DELETE FROM news WHERE id = ?`, id, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}


dataPool.creteNovica = (title, slug, text, file) => {
  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO news (title,slug,text,file) VALUES (?,?,?,?)`, [title, slug, text, file], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

dataPool.updateNovica = (title, slug, text, id) => {
  return new Promise((resolve, reject) => {
    conn.query(`UPDATE news SET title = ?, slug = ?, text = ? WHERE id = ?`, [title, slug, text, id], (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

*/ 

dataPool.AuthUser = (email) => {
  return new Promise((resolve, reject) => {
    conn.query('SELECT * FROM users WHERE email = ?', email, (err, res, fields) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })

}

module.exports = dataPool;

