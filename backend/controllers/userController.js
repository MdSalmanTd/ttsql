import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { dbPool } from "../config/db-connection.js";
import { generateToken } from "../utils/generateToken.js";
import { sendPasswordResetEmail } from "../utils/sendPasswordResetEmail.js";

const PASSWORD_RESET_EXPIRY_MS = 60 * 60 * 1000;
const GENERIC_RESET_RESPONSE =
  "If an account exists for this email, you will receive password reset instructions shortly.";

const registerUser = async (req, res) => {
    try {
        let { fullname, email, password, contact } = req.body;

        const checkQuery = "SELECT id AS _id, fullname, email, password, contact FROM users WHERE email = ?";
        const [existingUsers] = await dbPool.query(checkQuery, [email]);
        
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const insertQuery = `
            INSERT INTO users (fullname, email, password, contact) 
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await dbPool.query(insertQuery, [fullname, email, hashedPassword, contact]);

        const newUserId = result.insertId;
        const [newUserRows] = await dbPool.query(
            "SELECT id AS _id, fullname, email, contact FROM users WHERE id = ?", 
            [newUserId]
        );
        const newUser = newUserRows[0];
        
        const token = generateToken(newUser);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const selectQuery = "SELECT id AS _id, fullname, email, password, contact FROM users WHERE email = ?";
        const [users] = await dbPool.query(selectQuery, [email]);
        
        if (users.length === 0) {
            return res.status(400).json({ message: "Email or Password is incorrect" });
        }
        
        const user = users[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Email or Password is incorrect" });
        }

        delete user.password;

        const token = generateToken(user);
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        
        res.status(200).json({ message: "User logged in successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error logging in user", error: error.message });
    }
}

const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
};

const forgotPasswordRequest = async (req, res) => {
    try {
        const emailRaw = req.body?.email;
        if (!emailRaw || typeof emailRaw !== "string") {
            return res.status(400).json({ message: "Email is required" });
        }
        const email = emailRaw.trim().toLowerCase();

        const [users] = await dbPool.query(
            "SELECT id, email FROM users WHERE LOWER(TRIM(email)) = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(200).json({ message: GENERIC_RESET_RESPONSE });
        }

        const rawToken = crypto.randomBytes(32).toString("hex");
        const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
        const expires = new Date(Date.now() + PASSWORD_RESET_EXPIRY_MS);

        await dbPool.query(
            "UPDATE users SET password_reset_token_hash = ?, password_reset_expires = ? WHERE id = ?",
            [tokenHash, expires, users[0].id]
        );

        const frontendBase = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
        const resetUrl = `${frontendBase}/reset-password?token=${rawToken}`;

        await sendPasswordResetEmail(users[0].email, resetUrl);

        return res.status(200).json({ message: GENERIC_RESET_RESPONSE });
    } catch (error) {
        res.status(500).json({ message: "Error requesting password reset", error: error.message });
    }
};

const resetPasswordWithToken = async (req, res) => {
    try {
        const { token, password } = req.body || {};

        if (!token || typeof token !== "string") {
            return res.status(400).json({ message: "Reset token is required" });
        }
        if (!password || typeof password !== "string") {
            return res.status(400).json({ message: "New password is required" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        const tokenHash = crypto.createHash("sha256").update(token.trim()).digest("hex");

        const [rows] = await dbPool.query(
            `SELECT id FROM users
             WHERE password_reset_token_hash = ?
             AND password_reset_expires IS NOT NULL
             AND password_reset_expires > NOW()`,
            [tokenHash]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid or expired reset link. Please request a new one." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await dbPool.query(
            `UPDATE users SET
               password = ?,
               password_reset_token_hash = NULL,
               password_reset_expires = NULL
             WHERE id = ?`,
            [hashedPassword, rows[0].id]
        );

        return res.status(200).json({ message: "Password has been reset successfully. You can log in now." });
    } catch (error) {
        res.status(500).json({ message: "Error resetting password", error: error.message });
    }
};

export { registerUser, loginUser, logoutUser, forgotPasswordRequest, resetPasswordWithToken };