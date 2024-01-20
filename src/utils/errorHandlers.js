// utils/errorHandlers.js

const handleDatabaseError = (err, res) => {
  console.error('Database error:', err.message);

  if (err.code === '23505') {
    // Unique violation error (example: duplicate key)
    res.status(400).json({ error: 'Duplicate entry. The record already exists.' });
  } else {
    // Generic internal server error handling
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  handleDatabaseError,
};
