const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config(); // Load environment variables

const app = express();

// Import routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

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

// Set up the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});