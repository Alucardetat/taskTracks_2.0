// taskTracks_2.0/frontend/src/auth/logout.js
import axios from "axios";

export const logoutUser = () => {
  // Remove JWT from localStorage
  localStorage.removeItem("jwtToken");

  // Clear refresh token from HTTP-only cookie by making a logout request to backend
  axios
    .post("http://localhost:5000/auth/logout", {}, { withCredentials: true })
    .then(() => {
      alert("Logged out successfully!");
      // Optionally, you can use state management or context to update app state and reroute
      // instead of doing a full page reload
      window.location.href = "/";  // Redirect to home or login page after logout
    })
    .catch((error) => {
      console.error("Logout error:", error);
      alert("Logout failed.");
    });
};