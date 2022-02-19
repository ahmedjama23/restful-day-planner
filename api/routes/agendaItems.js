const express = require('express');
const { route } = require('../../app');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: "Retreived agenda items using GET request"
    })
})

router.post('/', (request, response, next) => {
    response.status(200).json({
        message: "Created agenda items using POST request"
    })
})

router.get('/:agendaId', (request, response, next) => {
    const agendaId = request.params.agendaId;

    if(agendaId === 'special') {
        response.status(200).json({
            message: "Special ID included"
        })
    }
    else {
        response.status(200).json({
            message: "Returning agenda item ID (" + agendaId + ") using GET request"
        })
    }
})

router.patch('/:agendaId', (request, response, next) => {
    const agendaId = request.params.agendaId

    response.status(200).json({
        message: 'Updated agenda item ID (' + agendaId + ')'
    })
})

router.delete('/:agendaId', (request, response, next) => {
    const agendaId = request.params.agendaId

    response.status(200).json({
        message: 'Deleted agenda item ID (' + agendaId + ')'
    })
})

module.exports = router