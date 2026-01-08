const express = require("express");
const router = express.Router();

const { getJobInsights } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

// AI Insights (logged-in user only)
router.get("/insights", protect, getJobInsights);

module.exports = router;
