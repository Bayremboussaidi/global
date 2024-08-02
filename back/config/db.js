require("dotenv").config();
const mysql = require("mysql2");

// Create a connection to the database
const db = mysql.createConnection({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database and handle success/error
db.connect((err) => {
  if (!err) {
    console.log("Database connected successfully");
  } else {
    console.error("Database connection failed:", err);
  }
});

// Export the connection
module.exports = db;