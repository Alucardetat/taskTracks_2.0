// taskTracks_2.0/frontend/src/auth/login.js
import axios from "axios";

const Login = async (googleCredential) => {
  try {
    // Send Google OAuth token to the backend to authenticate
    const response = await axios.post(
      "http://localhost:5000/auth/google/callback",  // Make sure this is the correct route for Google login
      { token: googleCredential } // Send Google token (ID token)
    );
    
    // Store the JWT token in localStorage for future authenticated requests
    localStorage.setItem("jwtToken", response.data.token); // JWT token for authorization

    return response.data;  // Return the user data or token
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed. Please try again.");
  }
};

export default Login;  // Add default export