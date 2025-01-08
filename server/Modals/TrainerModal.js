  import mongoose from 'mongoose';

  const TrainerSchema = new mongoose.Schema({
    trainerName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    avatarUrl: { type: String },
  }, { timestamps: true });

  export const TrainerModal = mongoose.models.Trainer || mongoose.model("Trainer", TrainerSchema);
