import { dbPool } from "../config/db-connection.js";

const updateDriverLocation = async (req, res) => {
    try {
        if (req.user.role === "admin") {
            return res.status(403).json({ message: "Admins cannot share driver location" });
        }

        const { latitude, longitude } = req.body;
        const lat = Number(latitude);
        const lng = Number(longitude);

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
            return res.status(400).json({ message: "Valid latitude and longitude are required" });
        }
        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            return res.status(400).json({ message: "Coordinates out of range" });
        }

        await dbPool.query(
            `INSERT INTO driver_locations (user_id, latitude, longitude, updated_at)
             VALUES (?, ?, ?, NOW())
             ON DUPLICATE KEY UPDATE
               latitude = VALUES(latitude),
               longitude = VALUES(longitude),
               updated_at = NOW()`,
            [req.user._id, lat, lng]
        );

        res.status(200).json({ message: "Location updated" });
    } catch (error) {
        res.status(500).json({ message: "Error updating location", error: error.message });
    }
};

const getDriverLocations = async (req, res) => {
    try {
        const [drivers] = await dbPool.query(
            `SELECT
               u.id AS _id,
               u.fullname,
               u.email,
               dl.latitude,
               dl.longitude,
               dl.updated_at
             FROM users u
             INNER JOIN driver_locations dl ON dl.user_id = u.id
             WHERE u.role IN ('driver', 'owner')
               AND dl.updated_at >= DATE_SUB(NOW(), INTERVAL 30 MINUTE)
             ORDER BY dl.updated_at DESC`
        );

        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching driver locations", error: error.message });
    }
};

export { updateDriverLocation, getDriverLocations };
