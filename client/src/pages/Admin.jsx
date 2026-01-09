import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

function Admin() {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState("");

    // extra safety
    if (user?.role !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axiosInstance.get("/jobs/all");
                setJobs(res.data);
            } catch (err) {
                setError(err.response?.data?.message || "Access denied");
            }
        };

        fetchAllJobs();
    }, []);

    return (
        <div className="container">
            <h2 style={{ textAlign: "center", fontWeight: "700" }}>
                Admin Dashboard
            </h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="admin-grid">
                {jobs.map((job) => {
                    const status = job.status.toLowerCase();

                    return (
                        <div className="admin-card" key={job._id}>
                            <h4>{job.company}</h4>

                            <p>
                                <strong>Position:</strong> {job.position}
                            </p>

                            <p>
                                <strong>Status:</strong>{" "}
                                <span className={`status-badge status-${status}`}>
                                    {job.status}
                                    {/* {status === "offer" && "🎉 Offer"}
                                    {status === "interview" && "📅 Interview"}
                                    {status === "applied" && "📝 Applied"}
                                    {status === "rejected" && "❌ Rejected"}
                                    {status} */}
                                </span>
                            </p>

                            <p style={{ fontSize: "13px", color: "#374151" }}>
                                User: {job.user?.email}
                            </p>
                        </div>
                    );
                })}
            </div>

        </div>
    );

}

export default Admin;
