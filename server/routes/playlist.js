import { Router } from "express";
// import { protect } from "../controllers/auth.js";
import { addSong, createPlaylist, deletePlaylist, dislikePlaylist, getAllPlaylists, getPlaylist, likePlaylist, removeSong, resizePlaylistImg, updatePlaylist, uploadPlaylistImg } from "../controllers/playlistController.js";
import multer from 'multer';
import { resizeSongImg } from "../middleware/imgResize.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router.post('/createPlaylist',createPlaylist);

router.post('/playlists', getAllPlaylists)
router.get('/playlist/:id',getPlaylist)
router.post('/updatePlaylist',upload.single('img'),resizeSongImg,updatePlaylist);
router.delete('/deletePlaylist',deletePlaylist);
router.post('/playlist/likes/add',likePlaylist)
router.post('/playlist/likes/remove',dislikePlaylist)
router.post('/addToPlaylist',addSong)
router.post('/removeFromPlaylist',removeSong)

  export default router;
