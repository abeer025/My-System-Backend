import { ApplyCourseModal } from "../Modals/ApplyCourse.js";
import { CourseModal } from "../Modals/CourseModal.js";

// Submit a form to apply for a course
export const applyCourse = async (req, res) => {
  try {
    const { name, email, phone, courseId, message } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !phone || !courseId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the course exists 
    const courseExists = await CourseModal.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ message: "Course not found." });
    }

    const AddCourseForm = new ApplyCourseModal({
      name,
      email,
      phone,
      courseId,
      message,
    });

    await AddCourseForm.save();

    return res.status(201).json({
      AddCourseForm,
      message: "Your form was submitted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to submit form." });
  }
};

export const getDataFromCourseForm = async (req, res) => {
  try {
    const dataToGet = await ApplyCourseModal.find();
    return res.status(200).json({ dataToGet });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch data." });
  }
};
