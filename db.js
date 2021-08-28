const mysql = require("mysql");

const conn = mysql.createConnection({
  host: process.env.MYSQL_HOST || "127.0.0.1",
  user: process.env.MYSQL_USER || "root",
  database: process.env.MYSQL_DATABASE || "urlshortener",
  password: process.env.MYSQL_ROOT_PASSWORD || "root",
});

module.exports = conn;
