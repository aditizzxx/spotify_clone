import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const { Schema } = mongoose;

const becomeArtist = new Schema({
  forcedLogout: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
  }, 
  status : {
    type : String,
    default: null
  },
},{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
}
);

const userSchema = new Schema(
  {
    // _id:{
    //   type: mongoose.Schema.ObjectId,
    // },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String, // Assuming the password will be stored as a string
      required: true,
    },
    img: {
      type: String,
      default:
        "https://ik.imagekit.io/8cs4gpobr/spotify/users/default.jpg?updatedAt=1696157096636",
    },
    becomeArtist : {
      type : becomeArtist,
      default : {}
    },
    likedSongs: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "songs",
        },
      ],
      validate: {
        validator: (arr) => arr.length <= 50,
        message: "You can not like more than 50 songs",
      },
    },
    playlists: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "playlists",
        },
      ],
    },
    likedPlaylists: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "playlists",
        },
      ],
    },
    followedArtists: [
      {
        _id: {
          type: mongoose.Schema.ObjectId,
          ref: "users",
          required: [true, "A followed artist must have an ID"],
        },
        name: {
          type: String,
        },
        img: {
          type: String,
        },
        role: {
          type: String,
        },
      },
    ],
    role: {
      type: String,
      enum: ["user", "artist", "superAdmin"],
      default: "user",
    },
    passwordConfirm: {
      type: String,
      required: true,
    },
    subscriptionId: {
      type: ObjectId,
    },
    passwordChangedAt: { type: Date },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);

userSchema.virtual("Songs", {
  ref: "songs", // Name of the model to which the virtual field is linked
  foreignField: "artist._id", // Field in the referenced model (Song) that holds the reference to the user
  localField: "_id", // Field in the current model (User) that is used to establish the relationship
});

export default mongoose.model("users", userSchema);
