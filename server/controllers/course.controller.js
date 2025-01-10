import { CourseModal } from "../Modals/CourseModal.js";

// 1. Create a new course (Admin functionality)
export const createCourse = async (req, res) => {
  try {
    const { title, description, duration, eligibility, trainerId, trainerName, thumbnail } = req.body;

    // Validate required fields
    if (!title || !description || !duration || !eligibility || !trainerId || !trainerName) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create the course
    const course = await CourseModal.create({
      title,
      description,
      duration,
      eligibility,
      thumbnail, // optional field
      trainerId,
      trainerName,
    });

    return res
      .status(201)
      .json({ course, message: "Course created successfully." });
  } catch (error) {
    console.error("Error creating course:", error);

    // Check for duplicate title error
    if (error.code === 11000 && error.keyPattern && error.keyPattern.title) {
      return res.status(409).json({ message: "Course title must be unique." });
    }

    return res.status(500).json({ message: "Failed to create course." });
  }
}
// export const createCourse = async (req, res) => {

//   try {
//     const { title, duration, eligibility, trainerId } = req.body;

//     // Validate required fields
//     if (!title || !duration || !eligibility || !trainerId) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     // Create the course
//     const course = await CourseModal.create({
//       title,
//       duration,
//       eligibility,
//       trainerId,
//     });

//     // Populate trainerId with user details
//     const populatedCourse = await CourseModal.findById(course._id).populate(
//       "trainerId",
//       "name email" // Specify fields to include (e.g., name, email)
//     );

//     console.log("Populated Course:", populatedCourse);

//     return res
//       .status(201)
//       .json({ course: populatedCourse, message: "Course created successfully." });
//   } catch (error) {
//     console.error("Error creating course:", error);
//     return res.status(500).json({ message: "Failed to create course." });
//   }
// };

 

// 2. Get all available courses (Student functionality)
export const getAvailableCourses = async (req, res) => {
  try {
    const courses = await CourseModal.find();
    return res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch courses." });
  }
};


// 3. Get trainer's courses with enrolled students (trainer functionality)
export const gettrainerCourses = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const courses = await CourseModal.find({ trainerId }).populate(
      "students",
      "name email"
    );

    if (!courses || courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for this trainer." });
    }

    return res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to fetch trainer courses." });
  }
};

// 4. Get course enrollment details (Admin functionality)
export const getCourseEnrollments = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await CourseModal.findById(id).populate(
      "students",
      "name email"
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    return res.status(200).json({
      courseTitle: course.title,
      studentsEnrolled: course.students.length,
      studentsDetails: course.students,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to fetch course enrollments." });
  }
};
