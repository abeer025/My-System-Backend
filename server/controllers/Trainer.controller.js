import { TrainerModal } from '../Modals/TrainerModal.js'; // Adjust path if necessary


// Create a Trainer Card
export const createTrainerCard = async (req, res) => {
  try {
    const { trainerName, email, password, age, avatarUrl } = req.body;

    // Ensure proper data structure
    if (!trainerName || !email || !password || !age) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new trainer card using the Mongoose model
    const newCard = await TrainerModal.create({
      trainerName,
      email,
      password,
      age,
      avatarUrl,
    });

    res.status(201).json({ message: "Trainer card created successfully", data: newCard });
  } catch (error) {
    console.error("Error creating trainer card:", error);

    // Handle duplicate email error
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).json({ message: "Email already exists" });
    }

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
