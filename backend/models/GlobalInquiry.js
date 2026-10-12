const mongoose = require('mongoose');

const GlobalInquirySchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    service: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GlobalInquiry', GlobalInquirySchema);