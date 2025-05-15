const mysql = require('mysql2');


const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'Qcodeigniter',
})

conn.connect((err) => {
  if (err) {
    console.log("ERROR: " + err.message);
    return;
  }
  console.log('Connection established');
})


let dataPool = {}

dataPool.allNovice = () => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT * FROM news`, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}


dataPool.allUsers = () => {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT user_name FROM user_login`, (err, res) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })
}

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

dataPool.AuthUser = (username) => {
  return new Promise((resolve, reject) => {
    conn.query('SELECT * FROM user_login WHERE user_name = ?', username, (err, res, fields) => {
      if (err) { return reject(err) }
      return resolve(res)
    })
  })

}

module.exports = dataPool;

