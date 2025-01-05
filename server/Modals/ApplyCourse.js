import mongoose from "mongoose";

const { Schema } = mongoose;

const applyCourseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: false,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ApplyCourseModal =
  mongoose.models.ApplyCourse || mongoose.model("ApplyCourse", applyCourseSchema);
