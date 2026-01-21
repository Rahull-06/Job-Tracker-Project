import { useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

function AddJob() {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("applied");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await axiosInstance.post("/api/jobs", {
                company,
                position,
                status
            });

            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add job");
        }
    };

    return (
        <div className="container">
            <h2>Add Job</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="form-box">
                <form onSubmit={handleSubmit}>

                    <div>
                        <label>Company</label>
                        <input
                            type="text"
                            placeholder="Enter your Company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Position</label>
                        <input
                            type="text"
                            placeholder="Enter your Position"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="applied">Applied</option>
                            <option value="interview">Interview</option>
                            <option value="offer">Offer</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <button type="submit">Add Job</button>
                </form>
            </div>
        </div>
    );
}

export default AddJob;

