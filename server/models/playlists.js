import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const { Schema } = mongoose;

const playlistSchema = new Schema(
  {
    name: {
      type: String,
      minLength: [3, "Name must be more that 3 characters"],
      maxLength: [20, "Name must be at most 20 characters"],
      trim: true,
      default: "Your playlist",
    },
    description: {
      type: String,
      trim: true,
      maxLength: [300, "Description must be at most 300 characters"],
    },
    img: {
      type: String,
      default:
        "https://ik.imagekit.io/8cs4gpobr/spotify/playlists/default.png?updatedAt=1696157039341",
    },
    user: {
      type: ObjectId,
      ref: "users",
      required: [true],
    },
    songs: {
      type: [
        {
          type: ObjectId,
          ref: "songs",
        },
      ],
      validate: {
        validator: (arr) => arr.length <= 30,
        message: "You can not add more than 30 songs to your playlist",
      },
    },
    is_deleted:{
      type: Boolean,
      default:false
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);

export default mongoose.model("playlists", playlistSchema);
