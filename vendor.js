const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sellTo: { type: String, required: true }, // Customer or Vendor
    yieldName: { type: String, required: true },
    quantity: { type: Number, required: true },
    buyerDetails: { type: String, required: true },
}, { timestamps: true });

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
