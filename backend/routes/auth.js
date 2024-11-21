// taskTracks_2.0/backend/routes/auth.js
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware"); // Import the protect middleware

// Google OAuth callback route
router.post("/google/callback", async (req, res, next) => {
  const { token } = req.body;  // Extract the Google token from the body

  if (!token) {
    return res.status(400).json({ error: "Google token is required" });
  }

  // Verify the Google token using Passport's GoogleStrategy
  passport.authenticate("google", { session: false }, async (err, user) => {
    if (err) return next(err); 
    if (!user) return res.status(401).json({ error: "Authentication failed" });

    // Create a JWT for the authenticated user
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",  // Short-lived JWT
    });

    // Send the JWT token to the frontend
    res.json({ token: jwtToken });
  })(req, res, next);
});

module.exports = router;