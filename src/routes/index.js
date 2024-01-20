// routes/index.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');
const { handleDatabaseError } = require('../utils/errorHandlers');
const bookController = require('../controllers/bookController');

// Home route
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM book_note');
    const books = result.rows;
    res.render('index', { books });
  } catch (err) {
    handleDatabaseError(err, res);
  }
});

// Handle the update request (change method from GET to POST)
router.post('/edit/:id', async (req, res) => {
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
});

// Add route for creating a new book
router.post('/add', bookController.addBook);

// Handle the delete request (GET)
router.get('/delete/:id', bookController.deleteBook);

// Handle the delete request (POST)
router.post('/delete/:id', bookController.deleteBook);

// Render the form for updating a book
router.get('/edit/:id', bookController.renderEditForm);

// Handle the update request
router.post('/edit/:id', bookController.updateBook);

// Render the form for creating a new book
router.get('/add', bookController.renderAddBookForm);

module.exports = router;
