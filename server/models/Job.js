const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        company: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["applied", "interview", "offer", "rejected"],
            default: "applied"
        },
        appliedDate: {
            type: Date,
            default: Date.now
        },
        notes: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
