import express from "express";
import {
  createBooking,
  getMyBookings,
  getProviderBookings,
  updateBookingStatus,
  getAllBookings,
} from "../controllers/bookingController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, authorize("customer"), createBooking);
router.get("/my", protect, authorize("customer"), getMyBookings);
router.get("/provider", protect, authorize("provider"), getProviderBookings);
router.put("/:id/status", protect, authorize("provider"), updateBookingStatus);
router.get("/", protect, authorize("admin"), getAllBookings);

export default router;
