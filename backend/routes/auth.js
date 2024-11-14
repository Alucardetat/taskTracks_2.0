const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// Google OAuth callback route
router.get(
	"/google/callback",
	passport.authenticate("google", { session: false }),
	(req, res) => {
		// Generate short-lived JWT
		const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		// Generate refresh token and store it in HttpOnly cookie
		const refreshToken = jwt.sign(
			{ id: req.user._id },
			process.env.JWT_SECRET,
			{ expiresIn: "7d" },
		);
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // Use secure flag in production
			sameSite: "Strict",
		});

		// Send the JWT token back as a redirect to frontend with the token
		res.redirect(`http://localhost:3000?token=${token}`);
	},
);

// Logout route to clear the refresh token cookie
router.post("/logout", (req, res) => {
	res.clearCookie("refreshToken", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production", // Secure flag in production
		sameSite: "Strict",
	});

	res.status(200).json({ message: "Logged out successfully" });
});

// Refresh token route (to get a new JWT token using the refresh token)
router.post("/refresh", (req, res) => {
	const refreshToken = req.cookies.refreshToken;

	if (!refreshToken) {
		return res
			.status(401)
			.json({ error: "No refresh token, authorization denied" });
	}

	jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(403).json({ error: "Invalid refresh token" });
		}

		// Generate a new JWT token
		const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		// Generate a new refresh token and send it back in the cookie
		const newRefreshToken = jwt.sign(
			{ id: decoded.id },
			process.env.JWT_SECRET,
			{ expiresIn: "7d" },
		);
		res.cookie("refreshToken", newRefreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "Strict",
		});

		// Send the new JWT token
		res.json({ token: newToken });
	});
});

module.exports = router;