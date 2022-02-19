const express = require('express');
const router = express.Router();

router.get('/',(request, response, next) =>{
    response.status(200).json({
        message: "Meetings retrieved using GET requests"
    });
});

router.post('/',(request, response, next) =>{
    response.status(201).json({
        message: "Meetings created using POST requests"
    });
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