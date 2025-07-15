// file: models/registrationModel.js
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    studentId: String,
    eventId: String,
    registrationDate: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Registration', registrationSchema);