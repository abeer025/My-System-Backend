import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: String,
    email: { type: String, required: true },
    // profileImage: { type: String },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin", "student", "trainer"],
      default: "user",
    },
    // enrolledCourses: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Courses",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

export const UserModal =
  mongoose?.models?.Users || mongoose.model("Users", userSchema);
