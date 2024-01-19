// index.js

const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const axios = require('axios');
const path = require('path'); // Added to handle static files
const app = express();
const port = process.env.PORT || 3000;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'notes',
  password: 'root',
  port: 5432,
});

// Async function to connect to the database
const connectDB = async () => {
  try {
    await db.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1);
  }
};

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', async (req, res) => {
  try {
    // Fetch data from your PostgreSQL database
    const result = await db.query('SELECT * FROM book_note');
    const books = result.rows;

    // Fetch book covers from the Open Library Covers API (replace with your actual ISBN field)
    const bookCoverPromises = books.map(async (book) => {
      const isbn = book.isbn; // Replace 'isbn' with your actual ISBN field
      const coverResponse = await axios.get(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`);
      return { ...book, coverUrl: coverResponse.data };
    });

    const booksWithCovers = await Promise.all(bookCoverPromises);

    res.render('index', { books: booksWithCovers });
  } catch (err) {
    console.error('Error querying the database or fetching book covers:', err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Graceful shutdown on SIGINT (Ctrl+C)
const shutdown = () => {
  console.log('Closing database connection');
  db.end();
  process.exit(0);
};

// Connect to the database and start the server
connectDB().then(() => {
  // Start the server
  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    shutdown();
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
});
