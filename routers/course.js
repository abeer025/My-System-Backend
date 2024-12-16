import express from "express";
import { CourseModal } from "../Modals/CourseModal";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let newCourse = new CourseModal(req.body);
    newCourse = await newCourse.save();

    res.status(201).json({
      error: false,
      msg: "Course Added Successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error in POST course:", error);
    res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const courses = await CourseModal.find();
    res.status(200).json({
      error: false,
      msg: "Courses Fetched Successfully",
      courses,
    });
  } catch (error) {
    console.error("Error in GET courses:", error);
    res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
});

export default router;

console.log("Course routes are set up!");
