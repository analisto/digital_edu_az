const { Client } = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'notes',
  password: 'root',
  port: 5432,
});

module.exports = db;
