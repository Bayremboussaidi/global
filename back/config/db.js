require("dotenv").config();
const mysql = require("mysql2");

// Create a connection pool to the database
const pool = mysql.createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Adjust this value based on your application's needs
  queueLimit: 0,       // No limit on waiting connections
});

// Check and log connection pool status (optional)
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection pool failed:", err);
    return;
  }
  console.log("Database connected successfully");
  connection.release(); // Release the connection back to the pool
});

// Export the pool for use in other parts of your application
module.exports = pool;