// import users from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import useragent from "useragent";
import AppError from "../utils/appError.js";
import User from "../models/users.js";
import imagekit from "../utils/ImageKit.js";
import mongoose from "mongoose";
import crypto from "crypto";
import nodemailer from "nodemailer";
import ActivityLog from "../models/activityLog.js";
import { CONSTANTS } from "../utils/constants.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let errors = [];
    const user = await User.findOne({ email: email });
    if (!email) {
      errors.push({ field: "email", message: "Email is required" });
    }
    if (!password) {
      errors.push({ field: "password", message: "Password is required" });
    }

    if (errors.length > 0) {
      return res.status(401).json({ error: errors });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        field: "email",
        message: "These credentials do not match our records.",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "9999d" }
    );
    // console.log("company" , token)
    res.cookie("token", token, {
      httpOnly: true,
    });

    const userAgentString = req.headers["user-agent"];
    const agent = useragent.parse(userAgentString);

    // get ip, browser, os details
    const clientIP = req.socket.remoteAddress || req.headers["x-forwarded-for"];
    const browser = agent.toAgent();
    const os = agent.os.toString();

    // console.log(token);
    const activity = ActivityLog({
      log_name: CONSTANTS.LOGIN,
      causer_id: user._id,
      properties: {
        ip: clientIP,
        os: os,
        browser: browser,
      },
    });
    activity.save();

    return res.status(200).json({
      status: "success",
      token: token,
      user: {
        user: user.email,
        name: user.name,
        id: user.id,
        role: user.role,
        img: user.img,
        token: token,
      },
      message: "Login successfull",
    });
  } catch (err) {
    // res.send(err)
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "credentials don't match.",
    });
  }
};

export const signup = async (req, res) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(
    req.body.passwordConfirm,
    saltRounds
  );
  const userAgentString = req.headers["user-agent"];
  const agent = useragent.parse(userAgentString);

  const clientIP = req.socket.remoteAddress || req.headers["x-forwarded-for"];
  const browser = agent.toAgent();
  const os = agent.os.toString();

  const userData = new User({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    password: hashedPassword,
    passwordConfirm: hashedPassword,
  });

  const user = await userData.save();

  const activity = ActivityLog({
    log_name: CONSTANTS.SIGNUP,
    causer_id: user._id,
    properties: {
      ip: clientIP,
      os: os,
      browser: browser,
    },
  });
  activity.save();
  return res.status(200).json({ message: "user signup successfully" });
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ status: "success", message: "✌️ See you soon!" });
  } catch (err) {
    console.status(500).log(err);
    return res.json(err);
  }
};

// export const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer ")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   } else if (req.cookies.jwt) {
//     token = req.cookies.jwt;
//   }

//   if (!token) {
//     return next(
//       new AppError("🔐 You are not logged in! Please log in to access", 401)
//     );
//   }

//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   const user = await User.findById(decoded.id);
//   if (!user) {
//     return next(
//       new AppError(
//         "🔐 The user belonging to this token does no longer exist.",
//         401
//       )
//     );
//   }
// };

export const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "⛔ You do not have permission to perform this action!",
          401
        )
      );
    }
    return next();
  };

export const updateMe = async (req, res, next) => {
  try {
    const data = {};

    if (req.file) {
      const imgKit = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.filename,
        folder: "spotify/users",
      });
      data.img = imgKit.url;
    }

    const user = await User.findByIdAndUpdate(
      { _id: req.id },
      {
        $set: {
          img: data.img,
          name: req.body.data.name,
          email: req.body.data.email,
        },
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error, "controller/auth/updateme");
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.id).select("+password");
    const passwordMatch = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "🔐 Your password is incorrect" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      req.body.passwordConfirm,
      saltRounds
    );
    user.password = req.body.password;
    user.password = hashedPassword;
    await user.save();
    return res
      .status(200)
      .json({ message: "password updated successfully!" }, user);
  } catch (error) {
    console.log(error, "controller/auth/updatePassword");
    return res.status(400).json({ message: "password updation failed." });
  }
};

export const userData = async (req, res) => {
  try {
    const users = await User.find({ _id: req.id });
    return res.json(users);
  } catch (error) {
    console.log(error, "controller/auth/userData");
  }
};

export const getUserRoleDetails = async (req, res) => {
  try {
    let listeners;
    if (req.body.role === "pending request") {
      listeners = await User.find({ "becomeArtist.status": "pending", "becomeArtist.forcedLogout": 1 });
    } else {
      listeners = await User.find({ role: req.body.role });
    }
    return res.json(listeners);
  } catch (error) {
    console.log(error, "controller/auth/getUserRoleDetails");
  }
};

export const becomeArtist = async (req, res, next) => {
  console.log(req.body);
  let user;
  try {
    if(req.body.forceLogout == true){
      user = await User.findByIdAndUpdate(req.id,{becomeArtist : {status : "confirm" , forcedLogout : 0} }, { new: true });
    }else{
      user = await User.findByIdAndUpdate(req.id, { becomeArtist : {status : "pending" , forcedLogout : 1} }, { new: true });
    }


    return res.status(200).json({
      status: "success",
      data: user.becomeArtist,
    });
  } catch (error) {
    console.log(error, "controller/auth/becomeArtist");
  }
};

export const approveRequest = async (req,res) => {
  try{
    const approval = await User.findByIdAndUpdate(req.body.id,{ becomeArtist : {status : "confirm" , forcedLogout : 2}, role: "artist" },{ new: true } );

    const userAgentString = req.headers["user-agent"];
    const agent = useragent.parse(userAgentString);

    // get ip, browser, os details
    const clientIP = req.socket.remoteAddress || req.headers["x-forwarded-for"];
    const browser = agent.toAgent();
    const os = agent.os.toString();

    const activity = ActivityLog({
      log_name: CONSTANTS.APPROVE_REQUEST,
      causer_id: req.id,
      properties: {
        ip: clientIP,
        os: os,
        browser: browser,
        user: approval._id
      },
    });
    activity.save();

    return res.status(200).json(approval);
  }catch(error){
    console.log(error, "controller/auth/approveRequest");
  }
}


export const disapproveRequest = async (req,res) => {
  try{
    const disapprove = await User.findByIdAndUpdate(req.body.id,{ becomeArtist : {status : null , forcedLogout : 0} },{ new: true } );
    return res.status(200).json(disapprove);
  }catch(error){
    console.log(error, "controller/auth/disapproveRequest");
  }
}


export const likeSong = async (req, res, next) => {
  try {
    const { songId } = req.body;

    const user = await User.findByIdAndUpdate(
      req.id,
      { $addToSet: { likedSongs: songId } },
      { runValidators: true, new: true }
    ).populate("likedSongs");

    return res.status(200).json({
      status: "success",
      songs: user.likedSongs,
    });
  } catch (error) {
    console.log(error, "controller/auth/likeSong");
  }
};

export const dislikeSong = async (req, res, next) => {
  try {
    const { songId } = req.body;

    const user = await User.findByIdAndUpdate(
      req.id,
      { $pull: { likedSongs: songId } },
      { runValidators: true, new: true }
    ).populate("likedSongs");

    return res.status(200).json({
      status: "success",
      songs: user.likedSongs,
    });
  } catch (error) {
    console.log(error, "controller/auth/dislikeSong");
  }
};

export const getArtist = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid artist ID" });
    }
    const artist = await User.findById(req.params.id).populate("Songs");
    // console.log(artist);

    if (!artist || artist.role !== "artist") {
      return res.status(400).json({ message: "No artist found with that ID" });
    }

    return res.status(200).json({
      status: "success",
      data: artist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while fetching the artist",
    });
  }
};

export const followArtist = async (req, res) => {
  try {
    const artist = await User.findById(req.params.id);

    if (!artist || artist.role !== "artist") {
      return res.status(400).json("You can only follow artists");
    }

    const user = await User.findByIdAndUpdate(
      req.body.user,
      {
        $addToSet: {
          followedArtists: {
            _id: artist._id,
            name: artist.name,
            img: artist.img,
            role: artist.role,
          },
        },
      },
      { runValidators: true, new: true }
    ).populate("followedArtists", "name img role");

    return res.status(200).json({
      status: "success",
      data: user.followedArtists,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "failed to follow artist",
    });
  }
};

export const unfollowArtist = async (req, res) => {
  try {
    const artist = await User.findById(req.params.id);

    if (!artist || artist.role !== "artist") {
      return res.status(400).json("No artist found with that id");
    }

    const user = await User.findByIdAndUpdate(
      req.body.user,
      {
        $pull: {
          followedArtists: {
            _id: artist._id,
            name: artist.name,
            img: artist.img,
            role: artist.role,
          },
        },
      },
      { runValidators: true, new: true }
    ).populate("followedArtists", "name img role");

    return res.status(200).json({
      status: "success",
      data: user.followedArtists,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "failed to unfollow artist",
    });
  }
};

export const forgotPassword = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // or use any other service
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const token = jwt.sign(
    {
      email: req.body.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "5min" }
  );

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM, // sender address
      to: req.body.email, // list of receivers
      subject: "Password reset", // Subject line
      token: token,
      text: `Click the following link to reset your password: https://musicplayerspotifyapp.netlify.app/reset-password?token=${token}`, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email", error });
  }
};

export const resetPassword = async (req, res) => {
  const resetToken = crypto
    .createHash("sha256")
    .update(req.body.resetToken)
    .digest("hex");
  // console.log(jwt.verify(req.body.resetToken , process.env.JWT_SECRET).email);
  const user = await User.findOne({
    email: jwt.verify(req.body.resetToken, process.env.JWT_SECRET).email,
    // passwordResetToken: resetToken,
    // passwordResetExpires: { $gt: Date.now() },
  })
    .populate("playlists")
    .populate("followedArtists", "name img role")
    .populate("likedPlaylists", "name img")
    .populate("likedSongs");

  // console.log('user',user);
  if (!user) {
    return res.json("🚫 Token is invalid or expired");
  }

  const saltRounds = 10;
  const hashedPasswordConfirm = await bcrypt.hash(
    req.body.passwordConfirm,
    saltRounds
  );
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  user.password = hashedPassword;
  user.passwordConfirm = hashedPasswordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return res.status(200).json({
    message: "password reset successfully!",
  });
};

export const getAllArtist = async (req, res) => {
  try {
    const artist = await User.find({ role: "artist" });

    return res.status(200).json(artist);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "can not get artist",
    });
  }
};
