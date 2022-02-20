const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Meeting = require('../models/meetings');


router.get('/', (request, response, next) => {
    Meeting.find()
        .exec()
        .then(docs => {
            response.status(200).json(docs);
        })
        .catch(error => {
            response.status(500).json({ error: error })
        });
});

router.post('/', (request, response, next) => {
    const meeting = new Meeting({
        _id: mongoose.Types.ObjectId(),
        title: request.body.title,
        meetingLength: request.body.meetingLength,
        agendaItem: request.body.agendaItem
    })
    meeting.save()
        .then(result => {
            console.log(result);
            response.status(201).json({ result })
        })
        .catch(error => {
            console.error(error);
            response.status(500).json({
                error: error
            })
        })
});

router.get('/:meetingId', (request, response, next) => {
    const meetingId = request.params.meetingId

    response.status(200).json({
        message: "Meeting retrieved using GET requests",
        meetingId: meetingId
    });
});

router.delete('/:meetingId', (request, response, next) => {
    const meetingId = request.params.meetingId

    Meeting.remove({ _id: meetingId })
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
});

module.exports = router