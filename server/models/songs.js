// import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const { Schema } = mongoose;

const songSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A song must have a name"],
      trim: true,
      unique: true,
      minLength: [3, "Song name must be more that 3 characters"],
      maxLength: [30, "Song name must be at most 30 characters"],
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "A song must belong to an artist"],
      // _id: {
      //   type: mongoose.Types.ObjectId,
      //   ref: 'users',
      //   required: [true, 'A song must belong to an artist'],
      // },
      // name: {
      //   type: String,
      //   required: [true, 'Artist name is required'],
      // },
    },
    song: {
      type: String,
      required: [true, "A song must have a song file"],
    },
    img: {
      type: String,
      required: [true, "A song must have a cover img"],
    },
    plays: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    is_deleted: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);

export default mongoose.model("songs", songSchema);
