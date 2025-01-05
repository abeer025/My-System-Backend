import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    description: String,
    duration: String,
    eligibility: [String],
    thumbnail: String,
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //to get trainer id if login as trainer
    enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], //to get student id
  
  },
  {
    timestamps: true,
  }
);

export const CourseModal =
  mongoose.models.Course || mongoose.model("Course", courseSchema);
