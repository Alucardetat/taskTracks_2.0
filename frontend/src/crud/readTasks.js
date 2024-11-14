import axios from "axios";

export const readTasks = async () => {
	const token = localStorage.getItem("jwtToken"); // Get JWT token from localStorage
	if (!token) {
		throw new Error("No valid token found");
	}

	try {
		const response = await axios.get("http://localhost:5000/tasks", {
			headers: {
				"x-auth-token": token, // Pass token in the request header
			},
		});
		return response.data; // Return the tasks data
	} catch (error) {
		console.error("Error fetching tasks:", error);
		throw error;
	}
};