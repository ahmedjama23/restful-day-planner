const mongoose = require('mongoose');

const AgendaItem = require('../models/agendaItems');

exports.getAllAgendaItems = (request, response, next) => {
    AgendaItem.find()
        .select('itemName itemDescription notes _id')
        .exec()
        .then(docs => {
            const res = {
                description: "Returned all agenda items",
                count: docs.length,
                items: docs.map(doc => {
                    return {
                        itemName: doc.itemName,
                        itemDescription: doc.itemDescription,
                        notes: doc.notes,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/agendaItems/' + doc._id
                        }
                    }
                })
            }
            if (docs.length >= 0) {
                response.status(200).json(res);
            }
            else {
                response.status(200).json({
                    message: "No items found"
                })
            }
        })
        .catch(err => {
            response.status(500).json({ error: err })
        })
}


exports.createAgendaItem = (request, response, next) => {
    console.log(request.file);
    const agendaItem = new AgendaItem({
        _id: mongoose.Types.ObjectId(),
        itemName: request.body.itemName,
        itemDescription: request.body.itemDescription,
        notes: request.file.path
    })

    agendaItem.save().then(result => {
        response.status(201).json({
            description: "Created agenda items using POST request",
            createdTask: {
                itemName: result.itemName,
                itemDescription: result.itemDescription,
                notes: result.notes,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/agendaItems/' + result._id
                }
            }
        });
    })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: error })
        });
}

exports.getAgendaItem = (request, response, next) => {
    const agendaId = request.params.agendaId;

    AgendaItem.findById(agendaId)
        .select('itemName itemDescription notes _id')
        .exec()
        .then(doc => {
            if (doc) {
                response.status(200).json({
                    itemName: doc.itemName,
                    itemDescription: doc.itemDescription,
                    notes: doc.notes,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/agendaItems'
                    }
                })
            }
            else {
                response.status(404).json({
                    message: "Agenda item not found"
                })
            }
        })
        .catch(err => {
            console.error(err);
            response.status(500).json({ error: err })
        })
}


exports.updateAgendaItem = (request, response, next) => {
    const agendaId = request.params.agendaId
    const updateOps = {};

    for (const ops of request.body) {
        updateOps[ops.propName] = ops.value;
    }

    AgendaItem.updateOne({ _id: agendaId }, { $set: updateOps })
        .exec()
        .then(result => {
            response.status(200).json({
                description: "Updated agenda item ID (" + agendaId + ")",
                updatedTask: {
                    itemName: result.itemName,
                    itemDescription: result.itemDescription,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/agendaItems/' + agendaId
                    }
                }
            })
        })
        .catch(err => {
            response.status(500).json({
                error: err
            })
        })
}

exports.deleteAgendaItem = (request, response, next) => {
    const agendaId = request.params.agendaId

    AgendaItem.remove({ _id: agendaId }).exec()
        .then(result => {
            response.status(200).json({
                description: "Deleted agenda item ID (" + agendaId + ")",
                deletedTask: {
                    itemName: result.itemName,
                    itemDescription: result.itemDescription,
                    _id: result._id
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/agendaItems/' + result._id
                }
            })
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({
                error: err
            })
        })
}