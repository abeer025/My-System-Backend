import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { UserModal } from "../Modals/UserModal.js";

// Register a new user
export const register = async (req, res) => {
  try {
    console.log(req.body);
    const { fullName, email, password } = req.body;

    // Validate required fields
    if (!email || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check if the user already exists
    const existingUser = await UserModal.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    await UserModal.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register.",
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check if the user exists
    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    // Generate token and send response
    generateToken(res, user, `Welcome back ${user.fullName || "User"}`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login.",
    });
  }
};

// Logout user
export const logout = async (_, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to logout.",
    });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.id; // Ensure req.id is properly set by middleware
    const user = await UserModal.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully.",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to load user profile.",
    });
  }
};
