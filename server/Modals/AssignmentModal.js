// models/Assignment.js
import mongoose from  "mongoose";

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
  points: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export const AssignmentModal =
  mongoose.models.Assignment || mongoose.model("Assignment", assignmentSchema);

