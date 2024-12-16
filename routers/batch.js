import express from "express";
import { BatchModal } from "../Modals/BatchModal";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let newBatch = new BatchModal(req.body);
    newBatch = await newBatch.save();

    res.status(201).json({
      error: false,
      msg: "Batch Added Successfully",
      batch: newBatch,
    });
  } catch (error) {
    console.error("Error in POST batch:", error);
    res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const query = {};
    if (req.query.course) {
      query.course = req.query.course;
    }

    const batches = await BatchModal.find(query).populate("course", "title");
    res.status(200).json({
      error: false,
      msg: "Batches Fetched Successfully",
      batches,
    });
  } catch (error) {
    console.error("Error in GET batches:", error);
    res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
});

export default router;

console.log("Batch routes are set up!");
