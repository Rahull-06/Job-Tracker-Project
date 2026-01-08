import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

function AIInsights() {
    const [summary, setSummary] = useState(null);
    const [insights, setInsights] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const res = await axiosInstance.get("/ai/insights");
                setSummary(res.data.summary);
                setInsights(res.data.insights);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load AI insights");
            }
        };

        fetchInsights();
    }, []);

    return (
        <div className="container">
            <h2>AI Job Insights 🤖</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {summary && (
                <div
                    style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "20px"
                    }}
                >
                    <div
                        className="ai-summary-card"
                        style={{ flex: 1, padding: "12px", background: "#eef2ff", borderRadius: "6px" }}
                    >

                        <strong>Total Jobs</strong>
                        <p>{summary.totalJobs}</p>
                    </div>

                    <div
                        className="ai-summary-card"
                        style={{ flex: 1, padding: "12px", background: "#eef2ff", borderRadius: "6px" }}
                    >

                        <strong>Top Role</strong>
                        <p>{summary.mostAppliedRole}</p>
                    </div>

                    <div
                        className="ai-summary-card"
                        style={{ flex: 1, padding: "12px", background: "#eef2ff", borderRadius: "6px" }}
                    >

                        <strong>Interview Rate</strong>
                        <p>{summary.interviewRate}%</p>
                    </div>
                </div>
            )}

            <h3>AI Insights</h3>

            <ul>
                {insights.map((text, index) => (
                    <li
                        className="ai-insight-item"
                        style={{
                            background: "#f8fafc",
                            padding: "10px",
                            borderRadius: "4px",
                            marginBottom: "8px"
                        }}
                    >
                        {text}
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default AIInsights;
