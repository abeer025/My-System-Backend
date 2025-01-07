const TrainerCard = require('../models/TrainerCard');

// Create a Trainer Card
exports.createTrainerCard = async (req, res) => {
  try {
    const { courseName, batchName, studentName, avatarUrl } = req.body;
    const newCard = new TrainerCard({ courseName, batchName, studentName, avatarUrl });
    await newCard.save();
    res.status(201).json({ message: "Trainer card created successfully", data: newCard });
  } catch (error) {
    res.status(500).json({ message: "Error creating trainer card", error });
  }
};

// Get All Trainer Cards
exports.getTrainerCards = async (req, res) => {
  try {
    const cards = await TrainerCard.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trainer cards", error });
  }
};
