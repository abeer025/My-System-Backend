import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true },
    profileImage: { type: String },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "student","trainer"],
      default: "student",
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const UserModal =
  mongoose?.models?.Users || mongoose.model("Users", userSchema);
