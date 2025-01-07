const express = require('express');
const router = express.Router();
const { createTrainerCard, getTrainerCards } = require('../controllers/trainerCardController');

// Routes
router.post('/trainer-cards', createTrainerCard);
router.get('/trainer-cards', getTrainerCards);

module.exports = router;
