import { useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate, Link} from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (passwordError) {
            setError("Please fix password requirements");
            return;
        }

        try {
            await axiosInstance.post("/auth/signup", {
                name,
                email,
                password
            });

            // after successful signup → go to login
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        }
    };

    const validatePassword = (pwd) => {
        const regex =
            /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?!.*\s).{8,}$/;

        if (!regex.test(pwd)) {
            setPasswordError(
                "Password must start with capital letter, contain number, special character, no spaces, min 8 chars"
            );
        } else {
            setPasswordError("");
        }
    };


    return (
        <div className="container">
            <h2>Signup</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="form-box">
                <form onSubmit={handleSubmit}>

                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                        />
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


                    </div>

                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;

