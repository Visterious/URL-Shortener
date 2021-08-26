const mysql = require('mysql')

const conn = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "urlshortener",
    password: "root"
})

module.exports = conn
