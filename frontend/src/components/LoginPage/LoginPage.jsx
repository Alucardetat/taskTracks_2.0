// taskTracks_2.0/frontend/src/components/LoginPage/LoginPage.jsx
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Correctly import named export
import Layout from "../Layout/Layout.jsx";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const user = jwtDecode(credentialResponse.credential); // Decode JWT
      console.log("Google Sign-In Success:", user);

      // Store the Google token
      localStorage.setItem("googleToken", credentialResponse.credential);

      // Navigate to the tasks page
      navigate("/tasks");
    } catch (error) {
      console.error("Error decoding Google token:", error);
    }
  };

  const handleGoogleFailure = () => {
    console.error("Google Sign-In Failed");
  };

  return (
    <Layout showSidebar={false}>
      <div className="login-container">
        <div className="login-box">
          <h2>Welcome Back</h2>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
          />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;