import Provider from "../models/Provider.js";
import User from "../models/User.js";

// @desc   Create or update the logged-in provider's profile
// @route  POST /api/providers
export const createOrUpdateProvider = async (req, res, next) => {
  try {
    const { providerName, category, experience, location, phone, pricing, description } = req.body;

    if (!providerName || !category || !location || !phone || pricing === undefined) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    let provider = await Provider.findOne({ user: req.user._id });

    if (provider) {
      provider.providerName = providerName;
      provider.category = category;
      provider.experience = experience;
      provider.location = location;
      provider.phone = phone;
      provider.pricing = pricing;
      provider.description = description;
      await provider.save();
      return res.json(provider);
    }

    provider = await Provider.create({
      user: req.user._id,
      providerName,
      category,
      experience,
      location,
      phone,
      pricing,
      description,
    });

    res.status(201).json(provider);
  } catch (error) {
    next(error);
  }
};

// @desc   Get all providers (with optional search/category filter)
// @route  GET /api/providers
export const getProviders = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const query = { isActive: true };

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { providerName: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const providers = await Provider.find(query).sort({ createdAt: -1 });
    res.json(providers);
  } catch (error) {
    next(error);
  }
};

// @desc   Get a single provider by id
// @route  GET /api/providers/:id
export const getProviderById = async (req, res, next) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    res.json(provider);
  } catch (error) {
    next(error);
  }
};

// @desc   Get logged-in provider's own profile
// @route  GET /api/providers/me/profile
export const getMyProviderProfile = async (req, res, next) => {
  try {
    const provider = await Provider.findOne({ user: req.user._id });
    res.json(provider);
  } catch (error) {
    next(error);
  }
};

// @desc   Delete provider (admin only)
// @route  DELETE /api/providers/:id
export const deleteProvider = async (req, res, next) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    await provider.deleteOne();
    res.json({ message: "Provider removed successfully" });
  } catch (error) {
    next(error);
  }
};
