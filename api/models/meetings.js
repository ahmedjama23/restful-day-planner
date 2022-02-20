const mongoose = require('mongoose')

const meetingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    meetingLength: { type: Number, required: true }
});

module.exports = mongoose.model('Meeting', meetingSchema);