import axios from "axios";

export const logoutUser = () => {
	// Remove JWT from localStorage
	localStorage.removeItem("jwtToken");

	// Clear refresh token cookie
	axios
		.post("http://localhost:5000/auth/logout", {}, { withCredentials: true })
		.then(() => {
			alert("Logged out successfully!");
			window.location.reload(); // Refresh the page to reset session
		})
		.catch((error) => {
			console.error("Logout error:", error);
			alert("Logout failed.");
		});
};