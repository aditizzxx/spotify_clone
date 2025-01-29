import { Router } from "express";
import {
  approveRequest,
  becomeArtist,
  disapproveRequest,
  dislikeSong,
  followArtist,
  forgotPassword,
  getAllArtist,
  getArtist,
  getUserRoleDetails,
  likeSong,
  login,
  resetPassword,
  signup,
  unfollowArtist,
  updateMe,
  updatePassword,
  userData,
} from "../controllers/auth.js";
import multer from "multer";
import { resizeSongImg } from "../middleware/imgResize.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.put("/updatePassword", updatePassword);
router.put("/updateMe", upload.single("photo"),resizeSongImg, updateMe);
router.post("/user", userData);
router.post("/likes/add", likeSong);
router.post("/likes/remove", dislikeSong);
router.patch("/becomeArtist", becomeArtist);
router.get("/artist/:id", getArtist);
router.post("/follow/:id", followArtist);
router.post("/unfollow/:id", unfollowArtist);
router.post("/artists", getAllArtist);
router.post("/listeners", getUserRoleDetails);
router.post("/approve", approveRequest);
router.post("/disapprove", disapproveRequest);

export default router;
