import axios from "axios";

export const getUserProfile = async (token) => {
	try {
		const response = await axios.get("http://localhost:5000/user/profile", {
			headers: { "x-auth-token": token },
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching user profile:", error);
		throw error;
	}
};