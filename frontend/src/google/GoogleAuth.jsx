// taskTracks_2.0/frontend/src/google/GoogleAuth.jsx
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // React Router v6's `useNavigate`

const GoogleAuth = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    const { credential } = response; // Token from Google OAuth

    if (!credential) {
      alert("Google authentication failed. Please try again.");
      return;
    }

    // Send the token to the backend for validation and JWT creation
    axios.post('http://localhost:5000/auth/google/callback', { token: credential })
      .then((res) => {
        // Store the JWT in localStorage and refresh token in HTTP-only cookie
        localStorage.setItem('jwtToken', res.data.token); // Store JWT for short-lived access
        document.cookie = `refreshToken=${res.data.refreshToken}; Secure; HttpOnly; SameSite=Strict`; // Secure, HttpOnly cookie for refresh token
        navigate('/tasks'); // Redirect to tasks page
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        alert('Login Failed: Please try again.');
      });
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div>
        <GoogleLogin
          onSuccess={responseGoogle}
          onError={() => alert("Google Login failed. Please try again.")}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;