// taskTracks_2.0/frontend/src/crud/createTask.js
import axios from "axios";

export const createTask = async (taskData, token) => {
	try {
		const response = await axios.post("http://localhost:5000/tasks", taskData, {
			headers: {
				"x-auth-token": token,
			},
		});
		return response.data; // Return the created task
	} catch (error) {
		console.error("Error creating task:", error);
		throw new error("Failed to create task. Please try again later.");
	}
};