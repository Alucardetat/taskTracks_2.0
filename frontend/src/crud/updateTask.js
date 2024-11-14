import axios from "axios";

export const updateTask = async (taskId, updatedData, token) => {
	try {
		const response = await axios.put(
			`http://localhost:5000/tasks/${taskId}`,
			updatedData,
			{
				headers: {
					"x-auth-token": token,
				},
			},
		);
		return response.data; // Return the updated task
	} catch (error) {
		console.error("Error updating task:", error);
		throw error;
	}
};