// taskTracks_2.0/backend/middleware/taskValidation.js
const { body, validationResult } = require("express-validator");

// Task creation/validation middleware
const validateTask = [
  body("title").not().isEmpty().withMessage("Title is required"),
  body("description").not().isEmpty().withMessage("Description is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // If validation passes, proceed to the next middleware or route handler
  },
];

module.exports = validateTask;