// taskTracks_2.0/backend/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log error stack for debugging
  res.status(500).json({ message: "Something went wrong!" }); // Return a generic error message
};

module.exports = errorHandler;