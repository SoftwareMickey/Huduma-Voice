require('dotenv').config();
const jwt = require('jsonwebtoken');


async function verifyToken(req, res, next){
    const token = req.headers.authorization?.split(' ')[1]; // * Expected format: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // * Attach user data to request
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
}

module.exports = { verifyToken }