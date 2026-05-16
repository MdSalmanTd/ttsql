import express from 'express';
import { createTrip, getAllTrips, getTripById, updateTrip } from '../controllers/tripController.js';
import isAdmin from '../middlewares/isAdmin.js';
import isLoggedIn from '../middlewares/isLoggedin.js';
const router = express.Router();

router.post("/create", isLoggedIn, createTrip);
router.get("/all", isLoggedIn, isAdmin, getAllTrips);
router.get("/:id", isLoggedIn, isAdmin, getTripById);
router.put("/update/:id", isLoggedIn, isAdmin, updateTrip);

export default router;