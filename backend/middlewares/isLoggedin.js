import jwt from 'jsonwebtoken';
import { dbPool } from '../config/db-connection.js';

const isLoggedIn = async (req, res, next) => {
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

        req.user = users[0];
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
}

export default isLoggedIn;