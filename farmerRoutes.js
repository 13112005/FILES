const express = require('express');
const authenticate = require('../middleware/auth');
const Yield = require('../models/yield');

const router = express.Router();

// Submit yield
router.post('/yield', authenticate, async (req, res) => {
    try {
        const { seedName, seedQuantity, isGMO, pesticideName, pesticideType, vendors } = req.body;

        const newYield = new Yield({
            farmerId: req.user.id,
            seedName,
            seedQuantity,
            isGMO,
            pesticideName,
            pesticideType,
            vendors
        });

        await newYield.save();
        res.status(201).json({ message: 'Yield submitted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to submit yield.' });
    }
});

// Fetch all yields for the farmer
router.get('/yields', authenticate, async (req, res) => {
    try {
        const yields = await Yield.find({ farmerId: req.user.id });
        res.status(200).json(yields);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch yields.' });
    }
});

module.exports = router;
