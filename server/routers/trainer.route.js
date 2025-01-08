import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createTrainerCard,
  getTrainerCards,
} from "../controllers/Trainer.controller.js";

const router = express.Router();

// 1. Create a trainer card
router.route("/").post( createTrainerCard);
// isAuthenticated,
// 2. Get all trainer cards
router.route("/available").get( getTrainerCards);
// isAuthenticated,

export default router;