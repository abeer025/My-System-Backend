import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin", "student", "trainer"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModal =
  mongoose?.models?.Users || mongoose.model("Users", userSchema);
