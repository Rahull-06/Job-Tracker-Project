import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

function AIInsights() {
    const [summary, setSummary] = useState(null);
    const [insights, setInsights] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const res = await axiosInstance.get("/api/ai/insights");
                setSummary(res.data.summary);
                setInsights(res.data.insights);
            } catch (err) {
                setError("Failed to load AI insights");
            }
        };

        fetchInsights();
    }, []);

    return (
        <div className="container">
            <h2>AI Job Insights 🤖</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {summary && (
                <div className="ai-summary-grid">
                    <div className="ai-summary-card ai-green">
                        <h4>Total Jobs</h4>
                        <p>{summary.totalJobs}</p>
                    </div>

                    <div className="ai-summary-card ai-blue">
                        <h4>Top Role</h4>
                        <p>{summary.topRole}</p>
                    </div>

                    <div className="ai-summary-card ai-beige">
                        <h4>Interview Rate</h4>
                        <p>{summary.interviewRate}%</p>
                    </div>
                </div>
            )}

            <h3>AI Insights</h3>

            <ul>
                {insights.map((text, index) => (
                    <li key={index} className="ai-insight-item">
                        {text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AIInsights;
