// taskTracks_2.0/backend/routes/tasks.js
const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const { protect } = require("../middleware/authMiddleware");
const validateTask = require("../middleware/taskValidation");  // Import validation middleware

// Create a new task (protected route)
router.post("/", protect, validateTask, async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed || false, // Default to false if not provided
      user: req.user, // Attach the user ID to the task
    });

    await task.save();
    res.status(201).json(task); // Return the created task
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ error: "Failed to create task" });
  }
});

// Get all tasks for the authenticated user (protected route)
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.status(200).json(tasks);  // Return the tasks for the authenticated user
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Delete a task by ID (protected route)
router.delete("/:id", protect, async (req, res) => {
  try {
    // Ensure only the user who created the task can delete it
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user, // Ensure the task belongs to the authenticated user
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;