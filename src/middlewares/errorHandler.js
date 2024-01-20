// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (err instanceof CustomDatabaseError) {

    res.status(400).json({ error: err.message });
  } else if (err instanceof CustomValidationError) {

    res.status(422).json({ error: err.message });
  } else {

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = errorHandler;
