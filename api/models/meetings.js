const mongoose = require('mongoose')

const meetingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    meetingLength: { type: Number, default: 30 },
    agendaItem: {type: mongoose.Schema.Types.ObjectId, ref: 'AgendaItem', required: true}
});

module.exports = mongoose.model('Meeting', meetingSchema);