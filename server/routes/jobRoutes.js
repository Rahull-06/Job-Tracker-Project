const express = require("express");
const router = express.Router();

const {
    createJob,
    getMyJobs,
    updateJob,
    deleteJob,
    getAllJobs
} = require("../controllers/jobController");

const { protect,adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, createJob);
router.get("/", protect, getMyJobs);

// admin route
router.get("/all", protect, adminOnly, getAllJobs);

router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

module.exports = router;
