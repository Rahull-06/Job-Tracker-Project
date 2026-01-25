import { useState } from "react";
import API from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await API.post("/api/auth/login", {
                email,
                password,
            });

            login(response.data.user, response.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="form-box">
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>

                    <div style={{ position: "relative" }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p style={{ marginTop: 10 }}>
                        Don’t have an account? <Link to="/signup">Signup</Link>
                    </p>

                    <p style={{ marginTop: 10 }}>
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
