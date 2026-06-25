import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    providerName: {
      type: String,
      required: [true, "Provider name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Electrician",
        "Plumber",
        "Carpenter",
        "AC Technician",
        "Painter",
        "Appliance Repair",
      ],
    },
    experience: {
      type: Number,
      required: [true, "Experience in years is required"],
      default: 0,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    pricing: {
      type: Number,
      required: [true, "Starting price is required"],
    },
    description: {
      type: String,
      default: "",
    },
    avgRating: {
      type: Number,
      default: 4.5,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Provider = mongoose.model("Provider", providerSchema);
export default Provider;
