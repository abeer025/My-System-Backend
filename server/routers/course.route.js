import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCourse,
  getAvailableCourses,
  getTrainerCourses,
  getCourseEnrollments,
  getCourseDetails,
} from "../controllers/course.controller.js";

const router = express.Router();

// 1. Admin creates a course
router.route("/").post(createCourse);


// 2. Student fetches available courses
router.route("/available").get(getAvailableCourses);

router.get("/details/:courseId", getCourseDetails);

// 3. trainer fetches their courses and enrolled students
router.route("/trainer/:trainerId").get( getTrainerCourses);

// 4. Admin fetches enrollment details for a course
router.route("/:id/enrollments").get( getCourseEnrollments);

export default router;
