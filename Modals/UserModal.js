import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullname: String,
    email: { type: String, required: true },
    provider: { type: String }, //agr 1000 user email sy hain or 1000 google sy to ye alag kr dyga is sy asani ho jyegi dono users ko alag krny mai
    profileImage: { type: String },
    password: { type: String },
    role: { type: String, default: "user" },
    gender: String,
    address: String,
  },
  {
    timestamps: true,
  }
);

export const UserModal =
  mongoose?.models?.Users || mongoose.model("Users", userSchema);
