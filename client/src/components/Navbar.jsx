// =====================================
// Navbar Component
// - Shows links based on auth
// - Sticky navbar
// - Theme toggle button
// =====================================

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../theme/ThemeContext";

function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const navigate = useNavigate();
    const location = useLocation();

    // Highlight active link
    const isActive = (path) =>
        location.pathname === path ? "nav-link active" : "nav-link";

    // Logout handler
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            
            {/* ===== Left Side Links ===== */}
            <div className="nav-left">
                <Link to="/" className={isActive("/")}>Home</Link>

                {!isAuthenticated && (
                    <>
                        <Link to="/login" className={isActive("/login")}>Login</Link>
                        <Link to="/signup" className={isActive("/signup")}>Signup</Link>
                    </>
                )}

                {isAuthenticated && (
                    <>
                        <Link to="/dashboard" className={isActive("/dashboard")}>Dashboard</Link>
                        <Link to="/add-job" className={isActive("/add-job")}>Add Job</Link>
                        <Link to="/ai-insights" className={isActive("/ai-insights")}>AI Insights</Link>

                        {/* Admin link only if role === admin */}
                        {user?.role === "admin" && (
                            <Link to="/admin" className={isActive("/admin")}>Admin</Link>
                        )}
                    </>
                )}
            </div>

            {/* ===== Right Side Buttons ===== */}
            <div className="nav-right">
                
                {/* Theme Toggle Button */}
                <button onClick={toggleTheme} className="theme-btn">
                    {theme === "light" ? "🌙 Dark" : "☀ Light"}
                </button>

                {/* Logout */}
                {isAuthenticated && (
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
