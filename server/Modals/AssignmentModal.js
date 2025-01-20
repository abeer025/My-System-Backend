import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true, // Section is mandatory but has no specific limits
    },
    points: {
      type: Number,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Completed", "In Progress"],
    },
  },
  { timestamps: true }
);

export const AssignmentModal =
  mongoose.models.Assignment || mongoose.model("Assignment", assignmentSchema);
