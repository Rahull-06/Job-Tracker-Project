const aiRoutes = require("./routes/aiRoutes");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

const app = express();

// middleware
// app.use(
//     cors({
//         origin: ["http://localhost:5173","http://127.0.0.1:5173"],
//         credentials: true,
//         methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//         allowedHeaders: ["Content-Type", "Authorization"]
//     })
// );
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);


app.use(express.json());

// test route (IMPORTANT)
app.get("/", (req, res) => {
    res.send("Server + DB running 🚀");
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
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const authRoutes = require("./routes/authRoutes");
// const jobRoutes = require("./routes/jobRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("MongoDB connected"))
//     .catch((err) => console.error(err));

// app.use("/api/auth", authRoutes);
// app.use("/api/jobs", jobRoutes);

// app.listen(process.env.PORT || 5000, () => {
//     console.log(`Server running on port ${process.env.PORT}`);
// });

