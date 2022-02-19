const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: "Retreived tasks using GET request"
    });
});

router.post('/', (request, response, next) => {
    const task = {
        name: request.body.name,
        allocatedTime: request.body.allocatedTime
    }

    response.status(201).json({
        message: "Created tasks using POST request",
        createdTask: task
    });
});

router.get('/:taskId', (request, response, next) => {
    const taskId = request.params.taskId;

    if(taskId === 'special') {
        response.status(200).json({
            message: "Special ID included"
        });
    }
    else {
        response.status(200).json({
            message: "Returning task ID (" + taskId + ") using GET request"
        });
    }
});

router.patch('/:taskId', (request, response, next) => {
    const taskId = request.params.taskId

    response.status(200).json({
        message: 'Updated task ID (' + taskId + ')'
    });
});

router.delete('/:taskId', (request, response, next) => {
    const taskId = request.params.taskId

    response.status(200).json({
        message: 'Deleted task ID (' + taskId + ')'
    });
});

module.exports = router