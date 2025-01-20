import { CourseModal } from "../Modals/CourseModal.js";

// 1. Create a new course (Admin functionality)
export const createCourse = async (req, res) => {
  try {
    const { title, description, duration, eligibility, trainerId, trainerName, thumbnail, batch, section } = req.body;

    // Validate required fields
    if (!title || !description || !duration || !eligibility || !trainerId || !trainerName || !batch || !section) {
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
      batch,
      section,
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
};

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
export const getTrainerCourses = async (req, res) => {
  try {
    const { trainerId } = req.params;
    const courses = await CourseModal.find({ trainerId }).populate(
      "enrolledStudents",
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
      "enrolledStudents",
      "name email"
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    return res.status(200).json({
      courseTitle: course.title,
      batch: course.batch,
      section: course.section,
      studentsEnrolled: course.enrolledStudents.length,
      studentsDetails: course.enrolledStudents,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to fetch course enrollments." });
  }
};

// 5. Get single course details (General functionality)
export const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Fetch course details by title
    const course = await CourseModal.findOne({ title: courseId }).populate(
      "trainerId",
      "name email" // Populate trainer details with name and email
    );

    // If the course is not found
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    // Return course details
    return res.status(200).json({
      courseDetails: {
        title: course.title,
        description: course.description,
        duration: course.duration,
        eligibility: course.eligibility,
        trainer: course.trainerId ? { name: course.trainerId.name, email: course.trainerId.email } : "Trainer details unavailable",
        batch: course.batch,
        section: course.section,
        enrolledStudents: course.enrolledStudents ? course.enrolledStudents.length : 0,
      },
      message: "Course details fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching course details:", error);
    return res.status(500).json({ message: "Failed to fetch course details." });
  }
};
