const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const { protect } = require("../middleware/authMiddleware");

// Create a new task (protected route)
router.post("/", protect, async (req, res) => {
	try {
		if (!req.body.title || !req.body.description) {
			return res
				.status(400)
				.json({ error: "Title and description are required" });
		}

		const task = new Task({
			title: req.body.title,
			description: req.body.description,
			completed: req.body.completed || false, // Default to false if not provided
			user: req.user, // Attach the user ID to the task
		});

		await task.save();
		res.status(201).json(task); // Return the created task
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: "Failed to create task" });
	}
});

// Get all tasks for the authenticated user (protected route)
router.get("/", protect, async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.user }); // Get tasks only for the authenticated user
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch tasks" });
	}
});

// Delete a task by ID (protected route)
router.delete("/:id", protect, async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({
			_id: req.params.id,
			user: req.user,
		});
		if (!task) {
			return res.status(404).json({ error: "Task not found" });
		}
		res.status(200).json({ message: "Task deleted" });
	} catch (error) {
		res.status(500).json({ error: "Failed to delete task" });
	}
});

module.exports = router;