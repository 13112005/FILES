const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['Farmer', 'Pesticide Seller', 'Vendor'] },
    aadhar: { type: String, required: function () { return this.role === 'Farmer'; } }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
