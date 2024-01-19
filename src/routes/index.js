// routes/index.js
const express = require('express');
const router = express.Router();

const db = require('../models/db'); // Assuming you have a db.js file in the models folder

// Home route
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM book_note');
    const books = result.rows;
    res.render('index', { books });
  } catch (err) {
    console.error('Error querying the database:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Add route
router.post('/add', async (req, res) => {
  try {
    const { bookName, author, note } = req.body;
    await db.query(
      'INSERT INTO book_note (book_name, note, note_auth_name) VALUES ($1, $2, $3)',
      [bookName, note, author]
    );
    res.redirect('/');
  } catch (err) {
    console.error('Error adding book note to the database:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
