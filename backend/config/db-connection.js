import mysql from "mysql2/promise";
import dbgr from "debug";

const debug = dbgr("development:mysql");

export let dbPool;

const connectDB = async () => {
  try {
    dbPool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASS || "",
      database: process.env.DB_NAME || "TrackTruck",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const connection = await dbPool.getConnection();
    debug("MySQL connected successfully via XAMPP");
    
    connection.release(); 
  } catch (error) {
    debug("MySQL connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;