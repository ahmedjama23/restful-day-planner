const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    timeAllocated: { type: Number, required: true }
});

module.exports = mongoose.model('Task', taskSchema);