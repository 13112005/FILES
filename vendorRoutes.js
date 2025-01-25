const express = require('express');
const authenticate = require('../middleware/auth');
const Vendor = require('../models/vendor');
const QRCode = require('qrcode');
const router = express.Router();

// Sell yield
router.post('/sell', authenticate, async (req, res) => {
    try {
        const { sellTo, yieldName, quantity, buyerDetails } = req.body;

        const newSale = new Vendor({
            vendorId: req.user.id,
            sellTo,
            yieldName,
            quantity,
            buyerDetails,
        });

        await newSale.save();
        res.status(201).json({ message: 'Yield sold successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to sell yield.' });
    }
});

// Fetch stock
router.get('/stock', authenticate, async (req, res) => {
    try {
        const stock = await Vendor.find({ vendorId: req.user.id });
        res.status(200).json(stock);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch stock.' });
    }
});

// Fetch sales history
router.get('/sales', authenticate, async (req, res) => {
    try {
        const sales = await Vendor.find({ vendorId: req.user.id });
        res.status(200).json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch sales history.' });
    }
});


// Generate QR Code for a yield
router.post('/generate-qr', authenticate, async (req, res) => {
    try {
        const { yieldName } = req.body;

        // Fetch yield details
        const yieldData = await Vendor.findOne({
            vendorId: req.user.id,
            yieldName,
        });

        if (!yieldData) {
            return res.status(404).json({ message: 'Yield not found.' });
        }

        // Create QR code data
        const qrData = {
            vendorId: req.user.id,
            yieldName: yieldData.yieldName,
            quantity: yieldData.quantity,
            buyerDetails: yieldData.buyerDetails,
            date: yieldData.createdAt,
        };

        // Generate QR Code as a Data URL
        const qrCodeUrl = await QRCode.toDataURL(JSON.stringify(qrData));

        res.status(200).json({ qrCodeUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to generate QR Code.' });
    }
});


module.exports = router;
