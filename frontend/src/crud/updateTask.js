// taskTracks_2.0/frontend/src/crud/updateTask.js
import axios from "axios";
import { refreshToken } from "../utils/tokenHelper"; // Import the refreshToken function for token refresh

export const updateTask = async (taskId, updatedData, token) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/tasks/${taskId}`,
      updatedData,
      {
        headers: {
          "x-auth-token": token, // Send the JWT token in the request header
        },
      }
    );
    return response.data; // Return the updated task
  } catch (error) {
    console.error("Error updating task:", error);

    // Handle token expiry or invalidation (401)
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, attempt to refresh the token
      try {
        const newToken = await refreshToken(); // Attempt to refresh the token
        // Update the JWT token in localStorage
        localStorage.setItem("jwtToken", newToken);
        // Retry updating the task with the new token
        return await updateTask(taskId, updatedData, newToken);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        throw new Error("Failed to refresh token. Please log in again.");
      }
    }

    // Handle other errors
    throw new Error("Failed to update task. Please try again later.");
  }
};