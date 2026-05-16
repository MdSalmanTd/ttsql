import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db-connection.js"; // This now handles your MySQL connection pool
import dotenv from "dotenv";   
import usersRouter from "./routes/usersRouter.js";
import tripsRouter from "./routes/tripsRouter.js";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware setup
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Base route
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

// Routes
app.use("/api/users", usersRouter);
app.use("/api/trips", tripsRouter);

// Start Server wrapped in an async function to guarantee a clean MySQL connection
const startServer = async () => {
  try {
    // Wait for MySQL Pool initialization to verify database connectivity
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the backend server:", error.message);
    process.exit(1);
  }
};

startServer();