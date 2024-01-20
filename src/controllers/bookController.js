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

  // Controller to handle the update operation
updateBook: async function(req, res) {
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
// Controller to render the edit form for a book
renderEditForm: async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM book_note WHERE id = $1', [id]);
    const book = result.rows[0];
    res.render('editForm', { book });
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

};

module.exports = bookController;
