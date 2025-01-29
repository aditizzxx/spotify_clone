// const catchAsync = require('../utils/catchAsync');
import Song from "../models/songs.js";
import Playlist from "../models/playlists.js";
import User from "../models/users.js";
import AppError from "../utils/appError.js";
import fileLocation from "../utils/fileLocation.js";

export const searchSong = async (req, res, next) => {
  try {
    const { name } = req.params;
    const songs = await Song.find({
      name: { $regex: name, $options: "ix" },
    }).populate("artist", "name");
    if (songs.length === 0) return res.status(400).json({message: "No song found"});
    return res.status(200).json({
      status: "success",
      data: songs,
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchPlaylist = async (req, res, next) => {
  try {
    const { name } = req.params;

    const playlists = await Playlist.find({
      name: { $regex: name, $options: "ix" },
    }).populate("user", "name");

    if (playlists.length === 0)
      return res.status(400).json("No playlist found");

    return res.status(200).json({
      status: "success",
      data: playlists,
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchArtist = async (req, res, next) => {
  try {
    const { name } = req.params;

    const artists = await User.find({
      name: { $regex: name, $options: "ix" },
      role: "artist",
    });

    if (artists.length === 0) return res.status(400).json("No artist found");

    return res.status(200).json({
      status: "success",
      data: artists,
    });
  } catch (error) {
    console.log(error);
  }
};
