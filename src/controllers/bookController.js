// src/controllers/bookController.js

const db = require('../models/db');

const bookController = {
  // Controller to get all books
  getAllBooks: async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM books');
      const books = result.rows;
      res.render('books', { books });
    } catch (err) {
      console.error('Error querying the database:', err.message);
      res.status(500).send('Internal Server Error');
    }
  },

  // Controller to get a single book by ID
  getBookById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query('SELECT * FROM books WHERE id = $1', [id]);
      const book = result.rows[0];
      res.render('bookDetail', { book });
    } catch (err) {
      console.error('Error querying the database:', err.message);
      res.status(500).send('Internal Server Error');
    }
  },

  // Other controllers for creating, updating, and deleting books can be added here
};

module.exports = bookController;
