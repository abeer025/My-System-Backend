import express from "express";
import { CourseModel } from "../models/CourseModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let newCourse = new CourseModel(req.body);
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
    const courses = await CourseModel.find();
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
