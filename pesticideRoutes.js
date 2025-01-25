const express = require('express');
const authenticate = require('../middleware/auth');
const Pesticide = require('../models/pesticide');

const router = express.Router();

// Update pesticide stock
router.post('/stock', authenticate, async (req, res) => {
    try {
        const { pesticideName, quantity } = req.body;

        const pesticide = await Pesticide.findOneAndUpdate(
            { sellerId: req.user.id, pesticideName },
            { $inc: { quantity } },
            { upsert: true, new: true }
        );

        res.status(201).json({ message: 'Stock updated successfully!', pesticide });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update stock.' });
    }
});

// Get pesticide stock
router.get('/stock', authenticate, async (req, res) => {
    try {
        const stock = await Pesticide.find({ sellerId: req.user.id });
        res.status(200).json(stock);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch stock.' });
    }
});

// Get sales records
router.get('/sales', authenticate, async (req, res) => {
    try {
        const sales = await Pesticide.find({ sellerId: req.user.id }, 'farmerAadhar pesticideName quantity');
        res.status(200).json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch sales.' });
    }
});

module.exports = router;
