// const jwt = require("jsonwebtoken");

// exports.protect = (req, res, next) => {
//     let token;

//     // 1. get token from header
//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer")
//     ) {
//         token = req.headers.authorization.split(" ")[1];
//     }

//     // 2. if no token
//     if (!token) {
//         return res.status(401).json({ message: "Not authorized, no token" });
//     }

//     try {
//         // 3. verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // 4. attach user info to request
//         req.user = decoded;

//         next(); // allow request
//     } catch (error) {
//         return res.status(401).json({ message: "Token invalid" });
//     }
// };

// exports.adminOnly = (req, res, next) => {
//     if (req.user.role !== "admin") {
//         return res.status(403).json({ message: "Admin access only" });
//     }
//     next();
// };

const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
        return res.status(401).json({ message: "No token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
};

exports.adminOnly = (req, res, next) => {
    if (req.user.role !== "admin")
        return res.status(403).json({ message: "Admin only" });
    next();
};
