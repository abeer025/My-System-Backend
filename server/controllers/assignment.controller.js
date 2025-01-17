import { AssignmentModal } from "../Modals/AssignmentModal.js";

// 1. Create a new assignment (Admin functionality)
export const createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, batch, points } = req.body;

    // Validate required fields
    if (!title || !description || !dueDate || !batch || !points) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create the assignment
    const newAssignment = await AssignmentModal.create({
      title,
      description,
      dueDate,
      batch,
      points,
    });

    return res.status(201).json({
      assignment: newAssignment,
      message: "Assignment created successfully.",
    });
  } catch (error) {
    console.error("Error creating assignment:", error);
    return res.status(500).json({ message: "Failed to create assignment." });
  }
};

// 2. Get all assignments (General functionality)
export const getAssignments = async (req, res) => {
  try {
    const assignments = await AssignmentModal.find();
    return res.status(200).json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return res.status(500).json({ message: "Failed to fetch assignments." });
  }
};

// 3. Get a single assignment by ID (General functionality)
export const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch assignment by ID
    const assignment = await AssignmentModal.findById(id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found." });
    }

    return res.status(200).json(assignment);
  } catch (error) {
    console.error("Error fetching assignment:", error);
    return res.status(500).json({ message: "Failed to fetch assignment." });
  }
};

// 4. Delete an assignment (Admin functionality)
export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete assignment by ID
    const assignment = await AssignmentModal.findByIdAndDelete(id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found." });
    }

    return res.status(200).json({ message: "Assignment deleted successfully." });
  } catch (error) {
    console.error("Error deleting assignment:", error);
    return res.status(500).json({ message: "Failed to delete assignment." });
  }
};
