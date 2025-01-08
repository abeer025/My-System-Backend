import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    description: String,
    duration: String,
    eligibility: [String],
    thumbnail: String,
    trainerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" // assuming you have a User model for trainers
    },
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    trainerName: { type: String }, // add trainerName as a simple string field
  },
  {
    timestamps: true,
  }
)

export const CourseModal =
  mongoose.models.Course || mongoose.model("Course", courseSchema);
