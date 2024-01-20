// routes/index.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');
const { handleDatabaseError } = require('../utils/errorHandlers');
router.get('/book/:id', bookController.getBookById);
const bookController = require('../controllers/bookController');
router.setMaxListeners(15);
router.get('/book/:id', bookController.getBookById);


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

// Add route
router.post('/add', async (req, res) => {
  try {
    const { bookName, author, note } = req.body;

    // Input validation (you can use a validation library or custom validation logic)
    if (!bookName || !author || !note) {
      return res.status(400).json({ error: 'Invalid input. All fields are required.' });
    }

    await db.query(
      'INSERT INTO book_note (book_name, note, note_auth_name) VALUES ($1, $2, $3)',
      [bookName, note, author]
    );
    res.redirect('/');
  } catch (err) {
    handleDatabaseError(err, res);
  }
});


// Route to render the edit form
router.get('/edit/:id', bookController.renderEditForm);

// Route to handle the update operation
router.post('/edit/:id', bookController.updateBook);

// Route to handle the delete operation
router.get('/delete/:id', bookController.deleteBook);




module.exports = router;
