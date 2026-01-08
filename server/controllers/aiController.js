const Job = require("../models/Job");

exports.getJobInsights = async (req, res) => {
    try {
        // fetch only logged-in user's jobs
        const jobs = await Job.find({ user: req.user.id });

        if (jobs.length === 0) {
            return res.json({
                message: "No job data available for AI insights",
                insights: []
            });
        }

        // ----- AI-style analysis -----
        const totalJobs = jobs.length;

        const statusCount = {
            applied: 0,
            interview: 0,
            offer: 0,
            rejected: 0
        };

        const roleFrequency = {};

        jobs.forEach((job) => {
            // count statuses
            statusCount[job.status]++;

            // role frequency
            roleFrequency[job.position] =
                (roleFrequency[job.position] || 0) + 1;
        });

        // find most applied role
        const mostAppliedRole = Object.keys(roleFrequency).reduce(
            (a, b) => (roleFrequency[a] > roleFrequency[b] ? a : b)
        );

        // interview conversion rate
        const interviewRate = (
            (statusCount.interview / totalJobs) *
            100
        ).toFixed(1);

        // ----- AI insights (human-readable) -----
        const insights = [
            `You applied to ${totalJobs} jobs in total.`,
            `Your most targeted role is "${mostAppliedRole}".`,
            `Your interview conversion rate is ${interviewRate}%.`,
            statusCount.offer > 0
                ? "You are receiving offers — your profile is improving."
                : "Focus on improving resume and interview skills.",
            statusCount.rejected > statusCount.interview
                ? "High rejection rate detected. Consider refining job targeting."
                : "Your application strategy looks balanced."
        ];

        res.json({
            summary: {
                totalJobs,
                statusCount,
                mostAppliedRole,
                interviewRate
            },
            insights
        });
    } catch (error) {
        res.status(500).json({ message: "AI insight generation failed" });
    }
};
