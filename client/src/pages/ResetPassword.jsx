import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const submitHandler = async () => {
        if (!otp || !newPassword) {
            setMessage("Please fill all fields");
            return;
        }

        try {
            const res = await axios.post("/api/auth/reset-password", {
                otp,
                newPassword
            });

            setMessage(res.data.message);

            setTimeout(() => navigate("/login"), 1500);

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
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />

            <button onClick={submitHandler}>Reset</button>

            <p>{message}</p>
        </div>
    );
}