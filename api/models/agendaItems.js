const mongoose = require('mongoose')

const agendaItemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    itemName: { type: String, required: true },
    itemDescription: { type: String, required: true },
    notes: {type: String, required: true}
});

module.exports = mongoose.model('AgendaItem', agendaItemSchema);