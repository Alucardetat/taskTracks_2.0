// taskTracks_2.0/frontend/src/utils/refreshToken.js
import axios from 'axios';

// Function to refresh the JWT token using the refresh token
export const refreshToken = async () => {
  try {
    // Send the refresh token request to the backend (refresh token is stored in HTTP-only cookies)
    const response = await axios.post("http://localhost:5000/auth/refresh", {}, { withCredentials: true });

    // Store the new JWT token in localStorage for future requests
    localStorage.setItem("jwtToken", response.data.token);

    // Return the new JWT token
    return response.data.token;
  } catch (error) {
    console.error("Failed to refresh token:", error);

    // Optionally, show a user-friendly error or redirect to login page
    throw new Error("Session expired. Please log in again.");
  }
};