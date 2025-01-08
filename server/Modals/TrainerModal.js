import mongoose from 'mongoose';

const TrainerSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  batchName: { type: String, required: true },
  studentName: { type: String, required: true },
  avatarUrl: { type: String, required: false },
}, { timestamps: true });

export const TrainerModal = mongoose.models.Trainer || mongoose.model("Trainer", TrainerSchema);
