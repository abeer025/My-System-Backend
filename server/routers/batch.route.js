import express from "express";
import {
  createBatch,
  getAllBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
} from "../controllers/batch.controller.js";

const router = express.Router();

// 1. Create a new batch
router.route("/").post(createBatch);

// 2. Get all batches
router.route("/").get(getAllBatches);

// 3. Get a single batch by ID
router.route("/:id").get(getBatchById);

// 4. Update a batch by ID
router.route("/:id").put(updateBatch);

// 5. Delete a batch by ID
router.route("/:id").delete(deleteBatch);

export default router;
