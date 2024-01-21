// index.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./src/models/db');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Require and use the error handler middleware
const errorHandler = require('./src/middlewares/errorHandler');
app.use(errorHandler);

// Use the routes middleware
const routes = require('./src/routes/index');
app.use('/', routes);

// Connect to the database using the pool
const connectDB = async () => {
  try {
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
  }
};

connectDB().then(() => {
  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  process.on('SIGINT', () => {
    console.log('Closing database connection');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
});
