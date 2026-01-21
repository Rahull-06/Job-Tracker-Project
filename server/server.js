const aiRoutes = require("./routes/aiRoutes");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");


const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://YOUR_FRONTEND_URL.vercel.app"
        ],
        credentials: true,
    })
);
// app.use(cors());



app.use(express.json());

// test route (IMPORTANT)
app.get("/", (req, res) => {
    res.send("Server + DB running ");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/ai", aiRoutes);


// DB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("DB error:", err));

// server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
