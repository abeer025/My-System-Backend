import express from "express";
import {
  createAssignment,
  deleteAssignment,
  getAssignmentById,
  getAssignments,
} from "../controllers/assignment.controller.js";

const router = express.Router();

// 1. Admin creates an assignment
router.route("/").post(createAssignment);

// 2. Fetch all assignments
router.route("/available").get( getAssignments);

// 3. Fetch a specific assignment by ID
router.route("/:id").get( getAssignmentById);

// 4. Admin deletes an assignment by ID
router.route("/:id").delete( deleteAssignment);

export default router;
