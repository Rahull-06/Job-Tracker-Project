import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    // Get stored email automatically
    const email = localStorage.getItem("resetEmail");

    const submitHandler = async () => {
        try {
            const res = await axios.post("/api/auth/reset-password", {
                email,
                otp,
                newPassword
            });

            setMessage(res.data.message);

            // Clear stored email
            localStorage.removeItem("resetEmail");

            // Redirect to login
            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            setMessage(err.response?.data?.message || "Reset failed");
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>

            <input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />

            <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />

            <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer", marginLeft: "8px" }}
            >
                {showPassword ? "🔓" : "🔒"}
            </span>

            <button onClick={submitHandler}>Reset</button>

            <p>{message}</p>
        </div>
    );
}