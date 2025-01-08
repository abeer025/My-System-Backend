import { TrainerModal } from '../Modals/TrainerModal.js'; // Adjust path if necessary


// Create a Trainer Card
export const createTrainerCard = async (req, res) => {
  try {
    const { courseName, batchName, studentName, avatarUrl } = req.body;

    // Ensure proper data structure
    if (!courseName || !batchName || !studentName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new trainer card
    const newCard = new TrainerModal({ courseName, batchName, studentName, avatarUrl });
    await newCard.save();

    res.status(201).json({ message: "Trainer card created successfully", data: newCard });
  } catch (error) {
    console.error("Error creating trainer card:", error);
    res.status(500).json({ message: "Error creating trainer card", error: error.message });
  }
};

// Get All Trainer Cards
export const getTrainerCards = async (req, res) => {
  try {
    const cards = await TrainerModal.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trainer cards", error });
  }
};
