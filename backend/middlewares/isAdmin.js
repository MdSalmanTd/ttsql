import jwt from 'jsonwebtoken';
import { dbPool } from '../config/db-connection.js';

const isAdmin = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized, please login" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const selectQuery = "SELECT id AS _id, fullname, email, contact, role FROM users WHERE id = ?";
        const [users] = await dbPool.query(selectQuery, [decoded.id]);

        if (users.length === 0) {
            return res.status(401).json({ message: "Unauthorized, user not found" });
        }

        const user = users[0];

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
}

export default isAdmin;