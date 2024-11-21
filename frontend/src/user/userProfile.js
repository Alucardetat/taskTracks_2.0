// taskTracks_2.0/frontend/src/user/userProfile.js
import axios from "axios";

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get("http://localhost:5000/user/profile", {
      headers: { "x-auth-token": token }, // Send JWT token in the header
    });
    return response.data; // Return the user profile data
  } catch (error) {
    console.error("Error fetching user profile:", error);

    // Provide a more user-friendly error message
    if (error.response && error.response.status === 401) {
      throw new Error("Authentication required. Please log in again.");
    } else if (error.response && error.response.status === 404) {
      throw new Error("User profile not found.");
    } else {
      throw new Error("Failed to fetch user profile. Please try again later.");
    }
  }
};