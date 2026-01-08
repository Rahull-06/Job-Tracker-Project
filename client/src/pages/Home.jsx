function Home() {
    return (
        <div className="container">
            <h1 style={{ fontWeight: "700" }}>
                Job Tracker 🚀
            </h1>

            <p style={{ marginTop: "10px", fontSize: "16px" }}>
                Track your job applications, analyze progress, and
                gain AI-powered insights to improve your chances.
            </p>

            <div
                style={{
                    marginTop: "20px",
                    padding: "16px",
                    borderRadius: "8px",
                    background: "rgba(37,99,235,0.08)"
                }}
            >
                <strong>What you can do:</strong>
                <ul>
                    <li>Add & manage job applications</li>
                    <li>Track interview progress</li>
                    <li>View AI-powered insights</li>
                    <li>Admin-level monitoring</li>
                </ul>
            </div>
        </div>
    );
}

export default Home;
