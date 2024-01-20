// src/controllers/bookController.js
const db = require('../models/db');
const { handleDatabaseError } = require('../utils/errorHandlers');

const bookController = {
  // Controller to get all books
  getAllBooks: async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM books');
      const books = result.rows;
      res.render('books', { books });
    } catch (err) {
      handleDatabaseError(err, res);
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
      handleDatabaseError(err, res);
    }
  },

  // Controller to render the form for updating a book
  renderEditForm: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await db.query('SELECT * FROM book_note WHERE id = $1', [id]);
      const book = result.rows[0];
      res.render('editBook', { book });
    } catch (err) {
      handleDatabaseError(err, res);
    }
  },

  // Controller to handle the update operation
  updateBook: async (req, res) => {
    const { id } = req.params;
    const { bookName, author, note } = req.body;
    try {
      await db.query(
        'UPDATE book_note SET book_name = $1, note_auth_name = $2, note = $3 WHERE id = $4',
        [bookName, author, note, id]
      );
      res.redirect('/');
    } catch (err) {
      handleDatabaseError(err, res);
    }
  },

  // Controller to handle the delete operation
  deleteBook: async (req, res) => {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM book_note WHERE id = $1', [id]);
      res.redirect('/');
    } catch (err) {
      handleDatabaseError(err, res);
    }
  },

  // Controller to render the form for creating a new book
  renderAddBookForm: (req, res) => {
    res.render('addBook');
  },

  // Controller to handle the create (insert) operation
  addBook: async (req, res) => {
    try {
      const { bookName, author, note } = req.body;

      // Input validation (you can use a validation library or custom validation logic)
      if (!bookName || !author || !note) {
        return res.status(400).json({ error: 'Invalid input. All fields are required.' });
      }

      await db.query(
        'INSERT INTO book_note (book_name, note_auth_name, note) VALUES ($1, $2, $3)',
        [bookName, author, note]
      );

      res.redirect('/');
    } catch (err) {
      handleDatabaseError(err, res);
    }
  },
};

module.exports = bookController;
