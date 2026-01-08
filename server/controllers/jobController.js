const Job = require("../models/Job");

// CREATE JOB
exports.createJob = async (req, res) => {
    try {
        const { company, position, status, notes } = req.body;

        if (!company || !position) {
            return res.status(400).json({ message: "Company and position required" });
        }

        const job = await Job.create({
            user: req.user.id,
            company,
            position,
            status,
            notes
        });

        res.status(201).json({
            message: "Job created successfully",
            job
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// UPDATE JOB
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // ownership check
        if (job.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Job updated successfully",
            job: updatedJob
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// DELETE JOB
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // ownership check
        if (job.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await job.deleteOne();

        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


// GET LOGGED-IN USER JOBS
exports.getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ user: req.user.id }).sort({
            createdAt: -1
        });

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ADMIN: GET ALL JOBS
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate("user", "name email role")
            .sort({ createdAt: -1 });

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
