import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation after successful login

const GoogleAuth = () => {
	const navigate = useNavigate();

	const responseGoogle = (response) => {
		const { credential } = response;

		// Send the token to the backend for validation and JWT creation
		axios
			.post("http://localhost:5000/auth/google/callback", { token: credential })
			.then((res) => {
				localStorage.setItem("jwtToken", res.data.token); // Store JWT
				document.cookie = `refreshToken=${res.data.refreshToken}; Secure; HttpOnly`; // Secure refresh token in HTTP-only cookie
				navigate("/tasks"); // Redirect to tasks page
			})
			.catch((error) => {
				console.error("Error logging in:", error);
				alert("Login Failed");
			});
	};

	return (
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
			<GoogleLogin
				onSuccess={responseGoogle}
				onError={() => console.log("Login Failed")}
			/>
		</GoogleOAuthProvider>
	);
};

export default GoogleAuth;