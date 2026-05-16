import { dbPool } from "../config/db-connection.js";

const formatTrip = (trip) => {
    if (typeof trip.driver === "string") {
        trip.driver = JSON.parse(trip.driver);
    }
    trip._id = trip.id;
    return trip;
};

const createTrip = async (req, res) => {
    try {
        const { vehicle, date, fromLocation, toLocation, deposit, cost, comments } = req.body;
        const driverId = req.user._id;

        const insertQuery = `
            INSERT INTO trips (driver_id, vehicle, date, fromLocation, toLocation, deposit, cost, comments)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await dbPool.query(insertQuery, [
            driverId,
            vehicle,
            date,
            fromLocation,
            toLocation,
            deposit,
            cost,
            comments || null,
        ]);

        res.status(201).json({ message: "Trip created successfully" });
    } catch (error) {
        if (error.code === "ER_BAD_NULL_ERROR" || error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(400).json({ message: "Validation failed or invalid database reference", error: error.message });
        }
        res.status(500).json({ message: "Error creating trip", error: error.message });
    }
};

const getAllTrips = async (req, res) => {
    try {
        const selectQuery = `
            SELECT
                t.*,
                JSON_OBJECT('id', u.id, 'fullname', u.fullname) AS driver
            FROM trips t
            LEFT JOIN users u ON t.driver_id = u.id
        `;

        const [trips] = await dbPool.query(selectQuery);

        res.status(200).json(trips.map(formatTrip));
    } catch (error) {
        res.status(500).json({ message: "Error fetching trips", error: error.message });
    }
};

const getTripById = async (req, res) => {
    try {
        const tripId = req.params.id;
        const selectQuery = `
            SELECT
                t.*,
                JSON_OBJECT('id', u.id, 'fullname', u.fullname) AS driver
            FROM trips t
            LEFT JOIN users u ON t.driver_id = u.id
            WHERE t.id = ?
        `;

        const [trips] = await dbPool.query(selectQuery, [tripId]);

        if (trips.length === 0) {
            return res.status(404).json({ message: "Trip not found" });
        }

        res.status(200).json(formatTrip(trips[0]));
    } catch (error) {
        res.status(500).json({ message: "Error fetching trip", error: error.message });
    }
};

const updateTrip = async (req, res) => {
    try {
        const tripId = req.params.id;
        const updates = req.body;

        const fieldsToUpdate = Object.keys(updates).filter((key) => updates[key] !== undefined);

        if (fieldsToUpdate.length === 0) {
            return res.status(400).json({ message: "No fields provided for update" });
        }

        const [existingTrip] = await dbPool.query("SELECT id FROM trips WHERE id = ?", [tripId]);
        if (existingTrip.length === 0) {
            return res.status(404).json({ message: "Trip not found" });
        }

        const setClause = fieldsToUpdate.map((field) => `${field} = ?`).join(", ");
        const values = fieldsToUpdate.map((field) => updates[field]);
        values.push(tripId);

        const updateQuery = `UPDATE trips SET ${setClause} WHERE id = ?`;
        await dbPool.query(updateQuery, values);

        res.status(200).json({ message: "Trip updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating trip", error: error.message });
    }
};

export { createTrip, getAllTrips, getTripById, updateTrip };
