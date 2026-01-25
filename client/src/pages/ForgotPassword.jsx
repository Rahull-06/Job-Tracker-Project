import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const submitHandler = async () => {
        try {
            const res = await axios.post("/api/auth/forgot-password", { email });
            setMessage(res.data.message);

            // Save email for next step
            localStorage.setItem("resetEmail", email);

            // Redirect to reset password page after 1 second
            setTimeout(() => {
                navigate("/reset-password");
            }, 1000);


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
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
            />
            <button onClick={submitHandler}>Send OTP</button>
            <p>{message}</p>
        </div>
    );
}