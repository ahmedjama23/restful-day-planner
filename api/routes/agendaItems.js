const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: "Retreived agenda items using GET request"
    });
});

router.post('/', (request, response, next) => {
    const agendaItem = {
        agendaItemId: request.body.agendaItemId,
        agendaItemDesc: request.body.agendaItemDesc
    }

    response.status(200).json({
        message: "Created agenda items using POST request"
    });
});

router.get('/:agendaId', (request, response, next) => {
    const agendaItemId = request.params.agendaItemId;

    if (agendaItemId === 'special') {
        response.status(200).json({
            message: "Special ID included"
        });
    }
    
    else {
        response.status(200).json({
            message: "Returning agenda item ID (" + agendaItemId + ") using GET request"
        });
    }
});

router.patch('/:agendaId', (request, response, next) => {
    const agendaItemId = request.params.agendaItemId;

    response.status(200).json({
        message: 'Updated agenda item ID (' + agendaItemId + ')'
    });
});

router.delete('/:agendaId', (request, response, next) => {
    const agendaItemId = request.params.agendaItemId

    response.status(200).json({
        message: 'Deleted agenda item ID (' + agendaItemId + ')'
    });
});

module.exports = router