import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModal } from "../Modals/UserModal";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;

    const existingUser = await UserModal.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ error: true, msg: "User Already Exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let newUser = new UserModal({ ...rest, email, password: hashedPassword });
    newUser = await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_KEY
    );

    res.status(201).json({
      error: false,
      msg: "User Added Successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    console.error("Error in POST:", error);
    res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: true, msg: "User Not Found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ error: true, msg: "Password is not valid" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_KEY
    );

    res.status(200).json({
      error: false,
      msg: "User Login Successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
});

export default router;

console.log("Auth routes are set up!");
