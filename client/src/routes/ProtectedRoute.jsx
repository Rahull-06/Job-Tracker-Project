import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { isAuthenticated, user } = useAuth();

    // not logged in
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // admin-only route
    if (adminOnly && user?.role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
