// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";

// function Navbar() {
//     const { isAuthenticated, user, logout } = useAuth();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         navigate("/login");
//     };
//     const location = useLocation();

//     const isActive = (path) =>
//         location.pathname === path
//             ? { fontWeight: "700", color: "#2563eb" }
//             : {};


//     return (
//         <nav
//             style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "12px",
//                 marginBottom: "20px"
//             }}>
//             <Link to="/" style={isActive("/")}>Home</Link>{" | "}

//             {!isAuthenticated && (
//                 <>
//                     <Link to="/login">Login</Link>{" | "}
//                     <Link to="/signup">Signup</Link>
//                 </>
//             )}

//             {isAuthenticated && (
//                 <>
//                     <Link to="/dashboard" style={isActive("/dashboard")}>Dashboard</Link>{" | "}
//                     <Link to="/add-job" style={isActive("/add-job")}>Add Job</Link>{" | "}
//                     <Link to="/ai-insights" style={isActive("/ai-insights")}>AI Insights</Link>{" | "}

//                     {user?.role === "admin" && (
//                         <>
//                             <Link to="/admin" style={isActive("/admin")}>Admin</Link>{" | "}
//                         </>
//                     )}

//                     <button onClick={handleLogout}>Logout</button>
//                 </>
//             )}
//         </nav>
//     );
// }

// export default Navbar;
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // active link handler
    const isActive = (path) =>
        location.pathname === path ? "nav-link active" : "nav-link";

    return (
        <nav>
            <Link to="/" className={isActive("/")}>
                Home
            </Link>

            {!isAuthenticated && (
                <>
                    <Link to="/login" className={isActive("/login")}>
                        Login
                    </Link>

                    <Link to="/signup" className={isActive("/signup")}>
                        Signup
                    </Link>
                </>
            )}

            {isAuthenticated && (
                <>
                    <Link to="/dashboard" className={isActive("/dashboard")}>
                        Dashboard
                    </Link>

                    <Link to="/add-job" className={isActive("/add-job")}>
                        Add Job
                    </Link>

                    <Link to="/ai-insights" className={isActive("/ai-insights")}>
                        AI Insights
                    </Link>

                    {user?.role === "admin" && (
                        <Link to="/admin" className={isActive("/admin")}>
                            Admin
                        </Link>
                    )}

                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    );
}

export default Navbar;
