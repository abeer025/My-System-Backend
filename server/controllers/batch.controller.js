import { BatchModal } from "../Modals/BatchModal.js";

// Create a new batch
export const createBatch = async (req, res) => {
  try {
    const { title, description, course, status } = req.body;

    const newBatch = await BatchModal.create({
      title,
      description,
      course,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Batch created successfully",
      batch: newBatch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create batch",
      error: error.message,
    });
  }
};

// Get all batches
export const getAllBatches = async (req, res) => {
  try {
    const batches = await BatchModal.find().populate("course");

    res.status(200).json({
      success: true,
      batches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch batches",
      error: error.message,
    });
  }
};

// Get a single batch by ID
export const getBatchById = async (req, res) => {
  try {
    const { id } = req.params;

    const batch = await BatchModal.findById(id).populate("course");

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    res.status(200).json({
      success: true,
      batch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch batch",
      error: error.message,
    });
  }
};

// Update a batch
export const updateBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedBatch = await BatchModal.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedBatch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Batch updated successfully",
      batch: updatedBatch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update batch",
      error: error.message,
    });
  }
};

// Delete a batch
export const deleteBatch = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBatch = await BatchModal.findByIdAndDelete(id);

    if (!deletedBatch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Batch deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete batch",
      error: error.message,
    });
  }
};
