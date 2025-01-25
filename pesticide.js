const mongoose = require('mongoose');

const pesticideSchema = new mongoose.Schema({
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pesticideName: { type: String, required: true },
    quantity: { type: Number, required: true },
    farmerAadhar: { type: String }, // For sales records
}, { timestamps: true });

const Pesticide = mongoose.model('Pesticide', pesticideSchema);

module.exports = Pesticide;
