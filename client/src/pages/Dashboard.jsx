import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState("");

    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/jobs/${id}`);
            setJobs(jobs.filter((job) => job._id !== id));
        } catch (err) {
            alert("Failed to delete job");
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await axiosInstance.put(`/jobs/${id}`, {
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



    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axiosInstance.get("/jobs");
                setJobs(res.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load jobs");
            }
        };

        fetchJobs();
    }, []);

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
                <div
                    style={{
                        fontSize: "14px",
                        color: "#374151",
                        textAlign: "right"
                    }}
                >
                    <div><strong>Status:</strong> Logged In</div>
                    <div><strong>User:</strong> {user?.email}</div>
                </div>
            </div>

            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
                My Jobs
            </h3>

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

    // return (
    //     <div className="container">
    //         <h2>Dashboard</h2>

    //         <p>Logged in: {isAuthenticated ? "Yes" : "No"}</p>
    //         <p>User: {user?.email}</p>

    //         <button onClick={handleLogout}>Logout</button>

    //         <hr />

    //         <h3>My Jobs</h3>

    //         {error && <p style={{ color: "red" }}>{error}</p>}

    //         {jobs.length === 0 && <p>No jobs found</p>}

    //         <div>
    //             {jobs.map((job) => (
    //                 <div
    //                     key={job._id}
    //                     style={{
    //                         border: "1px solid #e5e7eb",
    //                         padding: "12px",
    //                         borderRadius: "6px",
    //                         marginBottom: "12px",
    //                         background: "#f9fafb"
    //                     }}
    //                 >
    //                     <h4 style={{ margin: "0 0 6px 0" }}>
    //                         {job.company}
    //                     </h4>

    //                     <p style={{ margin: "4px 0" }}>
    //                         Position: <strong>{job.position}</strong>
    //                     </p>

    //                     <select
    //                         value={job.status}
    //                         onChange={(e) =>
    //                             handleStatusChange(job._id, e.target.value)
    //                         }
    //                     >
    //                         <option value="applied">Applied</option>
    //                         <option value="interview">Interview</option>
    //                         <option value="offer">Offer</option>
    //                         <option value="rejected">Rejected</option>
    //                     </select>

    //                     <br />
    //                     <br />

    //                     <button onClick={() => handleDelete(job._id)}>
    //                         Delete
    //                     </button>
    //                 </div>
    //             ))}
    //         </div>

    //     </div>
    // );
}

export default Dashboard;
