// taskTracks_2.0/frontend/src/crud/readTask.js
import axios from "axios";
import { refreshToken } from "../utils/tokenHelper"; // Import the refreshToken function for token refresh

export const readTasks = async () => {
  const token = localStorage.getItem("jwtToken"); // Get JWT token from localStorage
  if (!token) {
    throw new Error("No valid token found. Please log in.");
  }

  try {
    const response = await axios.get("http://localhost:5000/tasks", {
      headers: {
        "x-auth-token": token, // Pass token in the request header for authentication
      },
    });
    return response.data; // Return the tasks data
  } catch (error) {
    console.error("Error fetching tasks:", error);

    // Handle token expiry or invalidation (401)
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, attempt to refresh the token
      try {
        const newToken = await refreshToken(); // Attempt to refresh the token
        // Update the new token in localStorage
        localStorage.setItem("jwtToken", newToken);
        // Retry fetching tasks with the new token
        return await readTasks();
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        throw new Error("Failed to refresh token. Please log in again.");
      }
    }

    // Handle other errors
    throw new Error("Failed to fetch tasks. Please try again later.");
  }
};