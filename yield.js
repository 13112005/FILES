const mongoose = require('mongoose');

const yieldSchema = new mongoose.Schema({
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seedName: { type: String, required: true },
    seedQuantity: { type: Number, required: true },
    isGMO: { type: String, required: true },
    pesticideName: { type: String, required: true },
    pesticideType: { type: String, required: true },
    vendors: { type: String, required: true }
}, { timestamps: true });

const Yield = mongoose.model('Yield', yieldSchema);

module.exports = Yield;
