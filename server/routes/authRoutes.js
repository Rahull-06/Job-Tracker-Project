const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);

router.get("/profile", protect, (req, res) => {
    res.json({ user: req.user });
});

router.get("/admin", protect, adminOnly, (req, res) => {
    res.json({ message: "Welcome Admin" });
});

module.exports = router;
