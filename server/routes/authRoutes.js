const express = require("express");
const router = express.Router();
const { forgotPassword } = require("../controllers/authController");

const {
    signup,
    login,
    forgotPassword,
    resetPassword
} = require("../controllers/authController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/profile", protect, (req, res) => {
    res.json({ user: req.user });
});

router.get("/admin", protect, adminOnly, (req, res) => {
    res.json({ message: "Welcome Admin" });
});

module.exports = router;