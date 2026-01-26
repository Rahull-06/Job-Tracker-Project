import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const sendOtp = async () => {
        if (!email) {
            setMessage("Please enter your email");
            return;
        }
        try {
            const res = await axios.post("/api/auth/forgot-password", { email });
            setMessage(res.data.message);
            // alert("OTP sent to your email");

            localStorage.setItem("resetEmail", email);

            setTimeout(() => navigate("/reset-password"), 1000);

        } catch (err) {
            setMessage(err.response?.data?.message || "Error sending OTP");
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            {/* <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" /> */}
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
            />
            <button onClick={sendOtp}>Send OTP</button>

            <p>{message}</p>
        </div>
    );
}
