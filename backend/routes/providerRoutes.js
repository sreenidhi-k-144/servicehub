import express from "express";
import {
  createOrUpdateProvider,
  getProviders,
  getProviderById,
  getMyProviderProfile,
  deleteProvider,
} from "../controllers/providerController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProviders);
router.get("/me/profile", protect, authorize("provider"), getMyProviderProfile);
router.get("/:id", getProviderById);
router.post("/", protect, authorize("provider"), createOrUpdateProvider);
router.delete("/:id", protect, authorize("admin"), deleteProvider);

export default router;
