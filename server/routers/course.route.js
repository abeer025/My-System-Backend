import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCourse,
  getAvailableCourses,
  gettrainerCourses,
  getCourseEnrollments,
} from "../controllers/course.controller.js";

const router = express.Router();

// 1. Admin creates a course
router.route("/").post(isAuthenticated, createCourse);

// 2. Student fetches available courses
router.route("/available").get(getAvailableCourses);

// 3. trainer fetches their courses and enrolled students
router.route("/trainer/:trainerId").get(isAuthenticated, gettrainerCourses);

// 4. Admin fetches enrollment details for a course
router.route("/:id/enrollments").get(isAuthenticated, getCourseEnrollments);

export default router;
