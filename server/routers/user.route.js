import express from "express";
import {
  getUserProfile,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const router = express.Router();

// 1. For signup a user
router.route("/register").post(register);

// 2. For login a user
router.route("/login").post(login);

// 3. For logout to get a user
router.route("/logout").get(logout);

router.route("/profile").get(isAuthenticated,getUserProfile);
export default router;
