import { Router } from "express";
import { searchArtist, searchPlaylist, searchSong } from "../controllers/searchController.js";
const router = Router();


router.get('/search/song/:name', searchSong);
router.get('/search/playlist/:name', searchPlaylist);
router.get('/search/artist/:name', searchArtist);

export default router;
