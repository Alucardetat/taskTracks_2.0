// taskTracks_2.0/backend/index.jsx
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const winston = require("winston");

// Import routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

dotenv.config(); // Load environment variables

const app = express();

// Set up winston logger
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) }),
    new winston.transports.File({ filename: "logs/app.log" }), // Store logs in a file
  ],
});

// Middleware to log HTTP requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);  // Log method and URL
  next();
});

// MongoDB connection
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Middleware setup
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Use routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Error handler middleware
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// Set up the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});