import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../theme/ThemeContext";
import { useState } from "react";

function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = (path) =>
        location.pathname === path ? "active-link" : "";

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            {/* Top Navbar */}
            <nav className="top-navbar">
                <h2 className="logo">Job Tracker</h2>

                {/* Desktop Menu */}
                <div className="nav-links">
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
                            {user?.role === "admin" && (
                                <Link to="/admin" className={isActive("/admin")}>Admin</Link>
                            )}
                        </>
                    )}
                </div>

                {/* Theme + Logout */}
                <div className="nav-actions">
                    <button className="theme-btn" onClick={toggleTheme}>
                        {theme === "light" ? "🌙 Dark" : "☀ Light"}
                    </button>

                    {isAuthenticated && (
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </div>
            </nav>

            {/* Mobile Sidebar Menu */}
            {menuOpen && (
                <div className="mobile-menu">
                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

                    {!isAuthenticated && (
                        <>
                            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                            <Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
                        </>
                    )}

                    {isAuthenticated && (
                        <>
                            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                            <Link to="/add-job" onClick={() => setMenuOpen(false)}>Add Job</Link>
                            <Link to="/ai-insights" onClick={() => setMenuOpen(false)}>AI Insights</Link>
                            {user?.role === "admin" && (
                                <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
                            )}

                            <button onClick={handleLogout}>Logout</button>
                        </>
                    )}

                    <button onClick={toggleTheme}>
                        {theme === "light" ? "🌙 Dark Mode" : "☀ Light Mode"}
                    </button>
                </div>
            )}
        </>
    );
}

export default Navbar;