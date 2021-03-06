const mongoose = require('mongoose');
const Meeting = require('../models/meetings');
const AgendaItem = require('../models/agendaItems');

exports.getAllMeetings = (request, response, next) => {
    Meeting.find()
        .select('-__v')
        .populate('agendaItem', 'itemName')
        .exec()
        .then(docs => {
            response.status(200).json({
                count: docs.length,
                meetings: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        meetingLength: doc.meetingLength,
                        agendaItem: doc.agendaItem,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/meetings/' + doc._id
                        }
                    }
                })
            });
        })
        .catch(error => {
            response.status(500).json({ error: error })
        });
};

exports.createMeeting = (request, response, next) => {
    AgendaItem.findById(request.body.agendaItem)
        .then(agendaItem => {
            if (!agendaItem) {
                throw { message: "Agenda Item Not Found", code: 404 }
            }
            const meeting = new Meeting({
                _id: mongoose.Types.ObjectId(),
                title: request.body.title,
                meetingLength: request.body.meetingLength,
                agendaItem: request.body.agendaItem
            })
            return meeting.save()
        })
        .then(result => {
            console.log(result);
            response.status(201).json({
                message: 'Meeting created',
                createdMeeting: {
                    _id: result._id,
                    title: result.title,
                    meetingLength: result.meetingLength,
                    agendaItem: result.agendaItem
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/meetings/' + result._id
                }
            })
        })
        .catch(err => {
            console.log(err)
            if (err.code) {
                response.status(err.code).json({
                    error: err.message
                });
            }
            else {
                response.status(500).json({
                    error: err.message
                });
            }
        })
}


exports.getMeeting = (request, response, next) => {
    Meeting.findById(request.params.meetingId)
        .populate('agendaItem','-__v')
        .exec()
        .then(meeting => {
            if (!meeting) {
                return response.status(404).json({
                    message: "Meeting not found"
                })
            }
            response.status(200).json({
                meeting: meeting,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/meetings'
                }
            })
        })
        .catch(error => {
            response.status(500).json({
                error: error
            })
        })
}

exports.deleteMeeting = (request, response, next) => {
    const meetingId = request.params.meetingId

    Meeting.deleteOne({ _id: meetingId })
        .exec()
        .then(result => {
            response.status(200).json({
                description: "Deleted meeting (" + meetingId + ")",
                deletedMeeting: {
                    title: result.title,
                    meetingLength: result.meetingLength,
                    agendaItem: result.agendaItem,
                    _id: meetingId
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/meetings/' + meetingId
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