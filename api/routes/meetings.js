const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Meeting = require('../models/meetings');


router.get('/',(request, response, next) =>{
    response.status(200).json({
        message: "Meetings retrieved using GET requests"
    });
});

router.post('/',(request, response, next) =>{
    const meeting = new Meeting({
        _id: mongoose.Types.ObjectId(),
        title: request.body.title,
        meetingLength: request.body.meetingLength,
        agendaItem: request.body.agendaItem
    })
    meeting.save()
    .then(result => {
        console.log(result);
        response.status(201).json({result})
    })
    .catch(error => {
        console.error(error);
        response.status(500).json({
            error: error
        })
    })
});

router.get('/:meetingId',(request, response, next) =>{
    const meetingId = request.params.meetingId

    response.status(200).json({
        message: "Meeting retrieved using GET requests",
        meetingId: meetingId
    });
});

router.delete('/:meetingId',(request, response, next) =>{
    const meetingId = request.params.meetingId

    response.status(200).json({
        message: "Meeting deleted",
        meetingId: meetingId
    });
});

module.exports = router