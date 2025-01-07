const mongoose = require('mongoose');

const TrainerCardSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  batchName: { type: String, required: true },
  studentName: { type: String, required: true },
  avatarUrl: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('TrainerCard', TrainerCardSchema);