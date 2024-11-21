// taskTracks_2.0/backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  // Verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verifies the token using your JWT_SECRET
    req.user = decoded.id; // Attach user ID to the request object
    next();  // Allow the request to proceed to the route handler
  } catch (error) {
    console.error("Token verification failed:", error);  // Log the error for debugging

    // Handle specific cases like token expiration
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired, please log in again" });
    }

    // Default error handling for invalid tokens
    res.status(401).json({ error: "Token is not valid" });
  }
};

module.exports = { protect };