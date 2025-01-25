const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  farmerAadhaar: { type: String, required: true },
  pesticideType: { type: String, required: true },
  quantitySold: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
