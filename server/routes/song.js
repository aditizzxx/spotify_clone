import { Router } from "express";
// import { protect, restrictTo } from "../controllers/auth.js";
import { createSong, deleteSong, getAllSongs, getSong, renameSongFile, updateSong } from "../controllers/songController.js";
import multer from 'multer';
import { resizeSongImg } from "../middleware/imgResize.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router.post('/songs',upload.fields([
  { name: "song", maxCount: 1, },
  { name: "img", maxCount: 1, },
]),resizeSongImg,renameSongFile,createSong);

router.post('/getSongs',getAllSongs);
router.patch('/updateSong',upload.single('img'),resizeSongImg,updateSong);
router.delete('/deleteSong',deleteSong);
router.get('/:id',getSong);


export default router;
