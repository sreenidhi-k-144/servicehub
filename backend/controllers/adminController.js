import User from "../models/User.js";
import Provider from "../models/Provider.js";

// @desc   Get all users (admin)
// @route  GET /api/admin/users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc   Delete a user (admin)
// @route  DELETE /api/admin/users/:id
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "provider") {
      await Provider.findOneAndDelete({ user: user._id });
    }
    await user.deleteOne();
    res.json({ message: "User removed successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc   Admin dashboard stats
// @route  GET /api/admin/stats
export const getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: "customer" });
    const totalProviders = await Provider.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });

    res.json({ totalUsers, totalProviders, totalAdmins });
  } catch (error) {
    next(error);
  }
};
