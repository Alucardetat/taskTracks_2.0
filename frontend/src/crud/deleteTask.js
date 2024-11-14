import axios from "axios";

export const deleteTask = async (taskId, token) => {
	try {
		const response = await axios.delete(
			`http://localhost:5000/tasks/${taskId}`,
			{
				headers: {
					"x-auth-token": token,
				},
			},
		);
		return response.data; // Return success message
	} catch (error) {
		console.error("Error deleting task:", error);
		throw error;
	}
};