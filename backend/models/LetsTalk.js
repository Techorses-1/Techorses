// models/LetsTalk.js
const mongoose = require('mongoose');

const letsTalkSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  message: String,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LetsTalk', letsTalkSchema);
