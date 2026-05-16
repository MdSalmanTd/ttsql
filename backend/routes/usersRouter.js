import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPasswordRequest,
  resetPasswordWithToken,
} from "../controllers/userController.js";
import isLoggedIn from "../middlewares/isLoggedin.js";
import isAdmin from "../middlewares/isAdmin.js";
import { updateDriverLocation, getDriverLocations } from "../controllers/locationController.js";

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/forgot-password", forgotPasswordRequest);

router.post("/reset-password", resetPasswordWithToken);

router.post("/logout", logoutUser);

router.get("/me", isLoggedIn, (req, res) => {
  res.json({ user: req.user });
});

router.post("/location", isLoggedIn, updateDriverLocation);

router.get("/drivers/locations", isLoggedIn, isAdmin, getDriverLocations);

export default router;