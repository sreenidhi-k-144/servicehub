import Booking from "../models/Booking.js";
import Provider from "../models/Provider.js";

// @desc   Create a new booking (customer)
// @route  POST /api/bookings
export const createBooking = async (req, res, next) => {
  try {
    const { provider, serviceDate, budgetAmount, notes } = req.body;

    if (!provider || !serviceDate || budgetAmount === undefined) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const providerExists = await Provider.findById(provider);
    if (!providerExists) {
      return res.status(404).json({ message: "Provider not found" });
    }

    const booking = await Booking.create({
      customer: req.user._id,
      provider,
      serviceDate,
      budgetAmount,
      notes,
    });

    const populated = await booking.populate("provider", "providerName category location");

    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};

// @desc   Get bookings for the logged-in customer
// @route  GET /api/bookings/my
export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id })
      .populate("provider", "providerName category location phone pricing")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

// @desc   Get bookings for the logged-in provider
// @route  GET /api/bookings/provider
export const getProviderBookings = async (req, res, next) => {
  try {
    const provider = await Provider.findOne({ user: req.user._id });
    if (!provider) {
      return res.status(404).json({ message: "Provider profile not found" });
    }

    const bookings = await Booking.find({ provider: provider._id })
      .populate("customer", "name email phone")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

// @desc   Update booking status (provider accepts/rejects/completes)
// @route  PUT /api/bookings/:id/status
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["pending", "accepted", "rejected", "completed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const provider = await Provider.findOne({ user: req.user._id });
    if (!provider || booking.provider.toString() !== provider._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to update this booking" });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    next(error);
  }
};

// @desc   Get all bookings (admin)
// @route  GET /api/bookings
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("customer", "name email")
      .populate("provider", "providerName category")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};
