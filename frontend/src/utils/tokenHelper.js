import axios from "axios";

export const refreshToken = async () => {
	try {
		// Attempt to get a new JWT token using the refresh token
		const response = await axios.post(
			"http://localhost:5000/auth/refresh",
			{},
			{ withCredentials: true },
		);

		// Update the JWT token in localStorage
		localStorage.setItem("jwtToken", response.data.token);

		// Return the new token
		return response.data.token;
	} catch (error) {
		console.error("Failed to refresh token:", error);
		throw error;
	}
};