import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav
            style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px"
            }}>
            <Link to="/">Home</Link>{" | "}

            {!isAuthenticated && (
                <>
                    <Link to="/login">Login</Link>{" | "}
                    <Link to="/signup">Signup</Link>
                </>
            )}

            {isAuthenticated && (
                <>
                    <Link to="/dashboard">Dashboard</Link>{" | "}
                    <Link to="/add-job">Add Job</Link>{" | "}
                    <Link to="/ai-insights">AI Insights</Link>{" | "}

                    {user?.role === "admin" && (
                        <>
                            <Link to="/admin">Admin</Link>{" | "}
                        </>
                    )}

                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    );
}

export default Navbar;
