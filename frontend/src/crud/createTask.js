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
		throw error;
	}
};