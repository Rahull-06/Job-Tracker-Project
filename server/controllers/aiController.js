const Job = require("../models/Job");

exports.getJobInsights = async (req, res) => {
    try {
        // Fetch only logged-in user's jobs
        const jobs = await Job.find({ user: req.user.id });

        if (jobs.length === 0) {
            return res.json({
                summary: {
                    totalJobs: 0,
                    topRole: "N/A",
                    interviewRate: 0
                },
                insights: ["No job data available yet."]
            });
        }

        const totalJobs = jobs.length;

        // Status counters
        const statusCount = {
            applied: 0,
            interview: 0,
            offer: 0,
            rejected: 0
        };

        // Role frequency map
        const roleFrequency = {};

        jobs.forEach((job) => {
            // normalize status
            const status = job.status.toLowerCase();
            if (statusCount[status] !== undefined) {
                statusCount[status]++;
            }

            // normalize role
            if (job.position) {
                const role = job.position.trim().toLowerCase();
                roleFrequency[role] = (roleFrequency[role] || 0) + 1;
            }
        });

        // Find top role
        let topRole = "N/A";
        let maxCount = 0;

        for (const role in roleFrequency) {
            if (roleFrequency[role] > maxCount) {
                maxCount = roleFrequency[role];
                topRole = role;
            }
        }

        // Interview conversion rate
        const interviewRate = Number(
            ((statusCount.interview / totalJobs) * 100).toFixed(1)
        );

        // Human-readable AI insights
        const insights = [
            `You applied to ${totalJobs} jobs in total.`,
            `Your most targeted role is "${topRole}".`,
            `Your interview conversion rate is ${interviewRate}%.`,
            statusCount.offer > 0
                ? "You are receiving offers — your profile is improving."
                : "Focus on improving your resume and interview skills.",
            statusCount.rejected > statusCount.interview
                ? "High rejection rate detected. Refine job targeting."
                : "Your application strategy looks balanced."
        ];

        res.json({
            summary: {
                totalJobs,
                topRole: topRole
                    ? topRole.charAt(0).toUpperCase() + topRole.slice(1)
                    : "N/A",
                interviewRate
            },
            insights
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "AI insight generation failed" });
    }
};
