import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const { Schema } = mongoose;

const subscriptionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
    },
    user: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    institute: {
      type: String,
      // required: true,
    },
    phone: {
      type: Number,
    },
    planType: {
      type: String,
      default: "free",
      enum: ["student", "family", "individual"],
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);
export default mongoose.model("subscriptions", subscriptionSchema);
