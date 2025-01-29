import Song from "../models/songs.js";
import imagekit from "../utils/ImageKit.js";
import users from "../models/users.js";
import ActivityLog from "../models/activityLog.js";
import { CONSTANTS } from "../utils/constants.js";

export const renameSongFile = async (req, res, next) => {
  let file;

  if (req.file) {
    // Handling the case for `upload.single('img')`
    file = req.file;
  } else if (req.files && req.files.song) {
    // Handling the case for `upload.fields([{ name: 'img', ... }])`
    file = req.files.song[0];
  }

  if (!file) return next();  
  // if (!req.files.song) return next();

  file.filename = `song-${req.id}-${Date.now()}.mp3`;

  next();
};

export const getAllSongs = async (req, res, next) => {
  try {
    let query = Song.find({ is_deleted: false }).populate("artist");

    // Sort
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    }

    // Limit
    if (req.query.limit) {
      query = query.limit(parseInt(req.query.limit));
    }

    const songs = await query;
    // const songs = await Song.find({ is_deleted: false });
    return res.status(200).json({
      status: "success",
      results: songs.length,
      data: {
        songs,
      },
    });
  } catch (error) {
    console.log(error, "controller/songController/getAllSongs");
  }
};

export const getSong = async (req, res, next) => {
  // console.log(req.params.id);
  
  try {
    const song = await Song.findById(req.params.id).populate('artist');

  if (!song) {
    return res.status(404).json({
      status: "fail",
      message: "Song not found",
    });
  }

  // Increment the plays count
  await Song.updateOne({ _id: req.params.id }, { $inc: { plays: 1 } });

  return res.status(200).json(song);
  } catch (error) {
    console.log(error, "/controller/songController/getSong");
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (
      !req.files.song[0].filename ||
      !req.files.img[0].filename ||
      !req.body.data.name
    ) {
      res.status(400).json({ message: "👎 Something is missing" });
    }

    const imgKit = await imagekit.upload({
      file: req.files.img[0].buffer,
      fileName: req.files.img[0].filename,
      folder: "spotify/songs",
    });

    const songKit = await imagekit.upload({
      file: req.files.song[0].buffer,
      fileName: req.files.song[0].filename,
      folder: "spotify/songs",
    });

    const artist = await users.findById(req.id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    const songData = {
      name: req.body.data.name,
      artist: artist,
      img: imgKit.url,
      song: songKit.url,
    };

    const song = await Song.create(songData);

    // const artist = await users.findById(song.artist);

    // Get the songId from the created song object
    // const songId = song._id;
    const activity = ActivityLog({
      log_name: CONSTANTS.CREATE_SONG,
      causer_id: req.id,
      properties: {
        song: song,
      },
    });
    activity.save();

    return res.status(200).json({
      status: "success",
      data: {
        song,
      },
    });
  } catch (error) {
    console.log(error, "controller/songcontroller/createSong");
  }
};

export const updateSong = async (req, res, next) => {
  try {
    const data = {};

    if (req.file) {
      const imgKit = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.filename,
        folder: "spotify/songs",
      });
      data.img = imgKit.url;
    }

    if (req.body.data.name) data.name = req.body.data.name;

    const song = await Song.findByIdAndUpdate(req.body.id, data, {
      runValidators: true,
      new: true,
    });

    if (!song)
      return res.status(400).json({ message: "No song found with given id" });

    const activity = ActivityLog({
      log_name: CONSTANTS.UPDATE_SONG,
      causer_id: req.id,
      properties: {
        song: song,
      },
    });
    activity.save();

    return res.status(200).json({
      status: "success",
      data: {
        song,
      },
    });
  } catch (error) {
    console.log(error, "controller/songController/updateSong");
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const song = await Song.findByIdAndUpdate(req.body.id, {
      is_deleted: true,
    });

    if (!song)
      return res.status(400).json({ message: "No song found with given id" });

    // fs.unlink(`public/songs/${song.song}`, (err) => console.log(err));
    // fs.unlink(`public/songs/${song.img}`, (err) => console.log(err));

    const activity = ActivityLog({
      log_name: CONSTANTS.DELETE_SONG,
      causer_id: req.id,
      properties: {
        song: song
      },
    });
    activity.save();

    return res.status(200).json({
      status: "success",
      data: song,
    });
  } catch (error) {
    console.log(error, "controller/songController/deleteSong");
  }
};
