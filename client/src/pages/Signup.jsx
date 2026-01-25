import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const validatePassword = (pwd) => {
        const regex =
            /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?!.*\s).{8,}$/;

        if (!regex.test(pwd)) {
            setPasswordError(
                "Password must contain 1 uppercase, 1 number, 1 special character, min 8 chars"
            );
        } else {
            setPasswordError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (passwordError) {
            setError("Please fix password requirements");
            return;
        }

        try {
            await API.post("/api/auth/signup", {
                name,
                email,
                password,
            });

            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="container">
            <h2>Signup</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="form-box">
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>

                    <div style={{ position: "relative" }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                            style={{ paddingRight: "40px" }}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                            }}
                        >
                            {showPassword ? "🔓" : "🔒"}
                        </span>
                    </div>

                    {passwordError && (
                        <p style={{ color: "red", fontSize: "13px" }}>
                            {passwordError}
                        </p>
                    )}

                    <p style={{ marginTop: "10px", fontSize: "14px" }}>
                        Already have an account?{" "}
                        <Link to="/login" style={{ color: "#2563eb", fontWeight: "600" }}>
                            Login
                        </Link>
                    </p>

                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;