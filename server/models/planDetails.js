// import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const { Schema } = mongoose;

const planDetailsSchema = new Schema(
  {
    planType: {
      type: String,
      default: "free",
    //   enum: ["student", "family", "individual"],
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);
export default mongoose.model("planDetails", planDetailsSchema);
