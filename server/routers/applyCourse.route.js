import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getDataFromCourseForm,
  applyCourse,
} from "../controllers/applyCourse.controller.js";

const router = express.Router();

// 1. Student can apply
router.route("/").post(applyCourse);

// 2. Fetch data from the course form
router.route("/dataToGet").get(getDataFromCourseForm);

export default router;
