import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState("");

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Fetch Jobs
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axiosInstance.get("/api/jobs");
                setJobs(res.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load jobs");
            }
        };

        fetchJobs();
    }, []);

    // Delete Job
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/api/jobs/${id}`);
            setJobs(jobs.filter((job) => job._id !== id));
        } catch (err) {
            alert("Failed to delete job");
        }
    };

    // Update Job Status
    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await axiosInstance.put(`/api/jobs/${id}`, {
                status: newStatus
            });

            setJobs(
                jobs.map((job) =>
                    job._id === id ? res.data.job : job
                )
            );
        } catch (err) {
            alert("Failed to update status");
        }
    };

    return (
        <div className="container">

            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
                }}
            >
                <h2 style={{ fontWeight: "700" }}>Dashboard</h2>

                {/* User Info */}
                <div style={{ fontSize: "14px", textAlign: "right" }}>
                    <div><strong>Status:</strong> Logged In</div>
                    <div><strong>User:</strong> {user?.email}</div>
                    <button onClick={handleLogout} style={{ marginTop: "6px" }}>
                        Logout
                    </button>
                </div>
            </div>

            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
                My Jobs
            </h3>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {jobs.length === 0 && (
                <p style={{ textAlign: "center" }}>No jobs found</p>
            )}

            <div className="jobs-grid">
                {jobs.map((job) => (
                    <div className="job-grid-card" key={job._id}>
                        <h4>{job.company}</h4>

                        <p>
                            <strong>Position:</strong> {job.position}
                        </p>

                        <select
                            value={job.status}
                            onChange={(e) =>
                                handleStatusChange(job._id, e.target.value)
                            }
                        >
                            <option value="applied">Applied</option>
                            <option value="interview">Interview</option>
                            <option value="offer">Offer</option>
                            <option value="rejected">Rejected</option>
                        </select>

                        <button
                            style={{ marginTop: "12px" }}
                            onClick={() => handleDelete(job._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Dashboard;
