import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image" || file.mimetype.split("/")[0] === "audio") {
    cb(null, true);
  } else {
    cb(new Error("Only images and audios are allowed!"));
  }
};

const upload = multer({ storage, fileFilter });

const uploadSongFiles = upload.fields([
  { name: "song", maxCount: 1 },
  { name: "img", maxCount: 1 },
]);

export { uploadSongFiles };
