
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");


// SIGNUP
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields required" });

        const existing = await User.findOne({ email });
        if (existing)
            return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // create token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};


// LOGIN
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!email || !password)
        return res.status(400).json({ message: "All fields required" });

    if (!user)
        return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};

// ===== FORGOT PASSWORD =====
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const otp = crypto.randomInt(100000, 999999).toString();

        user.resetOtp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();

        await sendEmail(user.email, "Password Reset OTP", `Your OTP is ${otp}`);

        res.json({ message: "OTP sent successfully" });
    } catch {
        res.status(500).json({ message: "Error sending OTP" });
    }
};

// ===== RESET PASSWORD =====
exports.resetPassword = async (req, res) => {
    try {
        const { otp, newPassword } = req.body;

        const user = await User.findOne({
            resetOtp: otp,
            otpExpiry: { $gt: Date.now() }
        });

        if (!user)
            return res.status(400).json({ message: "Invalid or expired OTP" });

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetOtp = undefined;
        user.otpExpiry = undefined;

        await user.save();

        res.json({ message: "Password reset successful" });

    } catch {
        res.status(500).json({ message: "Reset failed" });
    }
};