import { useState } from "react";
import axiosInstance from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axiosInstance.post("/auth/login", {
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

    // ✅ JSX MUST BE HERE (outside handleSubmit)
    return (
        <div className="container">
            <h2>Login</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="form-box">
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p style={{ marginTop: "10px", fontSize: "14px" }}>
                        Don’t have an account?{" "}
                        <Link to="/signup" style={{ color: "#2563eb", fontWeight: "600" }}>
                            Signup
                        </Link>
                    </p>

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
