const express = require("express");
const router = express.Router();

const {
    createJob,
    getMyJobs,
    updateJob,
    deleteJob,
    getAllJobs
} = require("../controllers/jobController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Create Job
router.post("/", protect, createJob);

// Get logged-in user's jobs
router.get("/", protect, getMyJobs);

// Admin: Get all jobs
router.get("/all", protect, adminOnly, getAllJobs);

// Update Job
router.put("/:id", protect, updateJob);

// Delete Job
router.delete("/:id", protect, deleteJob);

module.exports = router;
