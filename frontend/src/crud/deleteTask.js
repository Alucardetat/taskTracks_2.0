// taskTracks_2.0/frontend/src/crud/deleteTask.js
import axios from "axios";

export const deleteTask = async (taskId, token) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/tasks/${taskId}`,
      {
        headers: {
          "x-auth-token": token, // Send JWT token for authentication
        },
      }
    );
    return response.data; // Return success message
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task. Please try again later.");
  }
};