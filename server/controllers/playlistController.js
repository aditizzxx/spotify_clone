import multer from "multer";
import sharp from "sharp";

// const catchAsync = require('../utils/catchAsync');
import AppError from "../utils/appError.js";
import Playlist from "../models/playlists.js";
import User from "../models/users.js";
import Song from "../models/songs.js";
import fs from "fs";
import fileLocation from "../utils/fileLocation.js";
import imagekit from "../utils/ImageKit.js";
import ActivityLog from "../models/activityLog.js";
import { CONSTANTS } from "../utils/constants.js";

// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination directory for storing uploaded files
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Specify the filename for the uploaded file
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// const upload = multer({ storage: storage });
const upload = multer({ storage });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.split("/")[0] === "image") {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images are allowed!"));
//   }
// };

export const resizePlaylistImg = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `playlist-${req.params.id}-${Date.now()}.jpeg`;

  console.log("buffer", req.file);
  req.file.buffer = await sharp(req.file.buffer)
    .resize(512, 512)
    .toFormat("jpeg")
    .toBuffer();
  next();
};

// const upload = multer({ storage, fileFilter });

export const uploadPlaylistImg = async (req, res, next) => {
  upload.single("img");
};

export const getAllPlaylists = async (req, res, next) => {
  try {
    const playlists = await Playlist.find({
      user: req.id,
      is_deleted: false,
    });
    return res.status(200).json({
      status: "success",
      length: playlists.length,
      data: {
        playlists,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Playlist not found",
    });
  }
};

export const getPlaylist = async (req, res, next) => {
  const playlist = await Playlist.findById(req?.params?.id)
    .populate("songs")
    .populate("user", "name img");

  if (!playlist) {
    return res.send(new AppError("❓ No playlist found with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      playlist,
    },
  });
};

export const createPlaylist = async (req, res, next) => {
  const { name} = req.body;
  try {
    const newPlaylist = new Playlist({
      name,
      user: req.id,
      // other fields...
    });
    const savedPlaylist = await newPlaylist.save();
    const user = await User.findByIdAndUpdate(
      req.id,
      { $addToSet: { playlists: savedPlaylist._id } },
      { runValidators: true, new: true }
    ).populate("playlists");

    const activity = ActivityLog({
      log_name: CONSTANTS.CREATE_PLAYLIST,
      causer_id: req.id,
      properties: {
        playlist: savedPlaylist,
      },
    });
    activity.save();

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error, "controller/playlistcontroller/createPlaylist");
    res.status(500).json({ error: error.message });
  }
};

export const updatePlaylist = async (req, res, next) => {
  try {
    const data = {};

    if (req.file) {
      const imgKit = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.filename,
        folder: "spotify/playlists",
      });
      data.img = imgKit.url;
    }

    const playlist = await Playlist.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          img: data.img,
          name: req.body.data.name,
          description: req.body.data.description,
        },
      }
    );
    if (!playlist) {
      return res
        .status(404)
        .json(new AppError("❓ No playlist found with that id", 404));
    }

    const activity = ActivityLog({
      log_name: CONSTANTS.UPDATE_PLAYLIST,
      causer_id: req.id,
      properties: {
        playlist: playlist,
      },
    });
    activity.save();

    res.status(200).json({
      status: "success",
      data: {
        playlist,
      },
    });
  } catch (error) {
    console.log(error, "controller/playlistcontroller/updateplaylist");
  }
};

export const deletePlaylist = async (req, res, next) => {
  const playlist = await Playlist.findByIdAndUpdate(req.body.id, {
    is_deleted: true,
  });

  if (!playlist) {
    return next(new AppError("❓ No playlist found with that id", 404));
  }
  const user = await User.findByIdAndUpdate(
    playlist.user,
    { $pull: { playlists: req.body.id } },
    { runValidators: true, new: true }
  ).populate("playlists");

  const activity = ActivityLog({
    log_name: CONSTANTS.DELETE_PLAYLIST,
    causer_id: req.id,
    properties: {
      playlist: playlist,
    },
  });
  activity.save();

  res.status(200).json({
    status: "success",
    data: user,
  });
};

export const addSong = async (req, res, next) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(
      req.body.id,
      { $addToSet: { songs: req.body.songId } },
      { runValidators: true, new: true }
    );

    return res.status(200).json({
      status: "success",
      message: `Song added to ${playlist.name}`,
    });
  } catch (error) {
    console.log(error, "controller/playlistController/addSong");
  }
};

export const removeSong = async (req, res, next) => {
  try {
    const playlist = await Playlist.findByIdAndUpdate(
      req.body.id,
      { $pull: { songs: req.body.songId } },
      { runValidators: true, new: true }
    );

    return res.status(200).json({
      status: "success",
      data: {
        playlist,
      },
    });
  } catch (error) {
    console.log(error, "controller/playlistController/removeSong");
  }
};

export const likePlaylist = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await User.findByIdAndUpdate(
      req.id,
      { $addToSet: { likedPlaylists: id } },
      { runValidators: true, new: true }
    ).populate("likedPlaylists", "name img");
    return res.status(200).json({
      status: "success",
      playlists: user.likedPlaylists,
    });
  } catch (error) {
    console.log(error, "controller/playlistController/likePlaylist");
  }
};

export const dislikePlaylist = async (req, res, next) => {
  try {
    const { id } = req.body;

    const user = await User.findByIdAndUpdate(
      req.id,
      { $pull: { likedPlaylists: id } },
      { runValidators: true, new: true }
    ).populate("likedPlaylists", "name img");

    return res.status(200).json({
      status: "success",
      playlists: user.likedPlaylists,
    });
  } catch (error) {
    console.log(error, "controller/playlistController/dislikePlaylsit");
  }
};
