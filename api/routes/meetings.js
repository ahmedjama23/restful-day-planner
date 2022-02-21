const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/check-auth')

const MeetingController = require('../controllers/meetings');

router.get('/', checkAuth, MeetingController.getAllMeetings);

router.post('/', checkAuth, MeetingController.createMeeting);

router.get('/:meetingId', checkAuth, MeetingController.getMeeting);

router.delete('/:meetingId', checkAuth, MeetingController.deleteMeeting);

module.exports = router