// models/db.js
const { Pool } = require('pg');

// Default values for local configuration
const defaultConfig = {
  DB_USER: 'uktdsojj',
  DB_HOST: 'manny.db.elephantsql.com',
  DB_NAME: 'uktdsojj',
  DB_PASSWORD: 'bzh-xoqMZlgM5RbXvg2OmGvSHEWDXhJi',
  DB_PORT: '5432',
  ELEPHANTSQL_URL: 'postgres://uktdsojj:bzh-xoqMZlgM5RbXvg2OmGvSHEWDXhJi@manny.db.elephantsql.com/uktdsojj',
};

// Use environment variables for configuration, falling back to default values
const {
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  ELEPHANTSQL_URL,
} = process.env;

// Use ElephantSQL connection string if available, otherwise use local configuration
const conString = ELEPHANTSQL_URL || `postgres://${DB_USER || defaultConfig.DB_USER}:${DB_PASSWORD || defaultConfig.DB_PASSWORD}@${DB_HOST || defaultConfig.DB_HOST}:${DB_PORT || defaultConfig.DB_PORT}/${DB_NAME || defaultConfig.DB_NAME}`;

// Create a connection pool
const pool = new Pool({
  connectionString: conString,
});

// Handle errors during the connection pool
pool.on('error', (err) => {
  console.error('Database pool error:', err.message);
});

// Export the pool for use in other modules
module.exports = pool;
