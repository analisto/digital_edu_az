// models/db.js
const { Client, Pool } = require('pg');

// Use environment variables for configuration
const {
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
} = process.env;

// Create a connection pool
const pool = new Pool({
  user: DB_USER || 'postgres',
  host: DB_HOST || 'localhost',
  database: DB_NAME || 'notes',
  password: DB_PASSWORD || 'root',
  port: DB_PORT || 5432,
});

// Handle errors during the connection pool
pool.on('error', (err) => {
  console.error('Database pool error:', err.message);
});

// Export the pool for use in other modules
module.exports = pool;

// Connect to the database using a client
const db = new Client({
  user: DB_USER || 'postgres',
  host: DB_HOST || 'localhost',
  database: DB_NAME || 'notes',
  password: DB_PASSWORD || 'root',
  port: DB_PORT || 5432,
});

// Connect to the database
db.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
    process.exit(1); // Exit the process if the connection fails
  });

// Handle errors during the database connection
db.on('error', (err) => {
  console.error('Database error:', err.message);
});
