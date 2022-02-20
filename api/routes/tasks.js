const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/tasks');

router.get('/', (request, response, next) => {
    Task.find()
        .exec()
        .then(docs => {
            if (docs.length >= 0) {
                response.status(200).json(docs);
            }
            else {
                response.status(200).json({
                    message: "No tasks found"
                })
            }
        })
        .catch(err => {
            response.status(500).json({ error: err })
        })
});

router.post('/', (request, response, next) => {
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        timeAllocated: request.body.timeAllocated
    })

    task.save().then(result => {
        response.status(201).json({
            message: "Created tasks using POST request",
            createdTask: task
        });
    })
        .catch(error => {
            console.error(err);
            response.status(500).json({ error: err })
        });
});

router.get('/:taskId', (request, response, next) => {
    const taskId = request.params.taskId;
    Task.findById(taskId)
        .exec()
        .then(doc => {
            if (doc) {
                response.status(200).json(doc)
            }
            else {
                response.status(404).json({
                    message: "Task not found"
                })
            }
        })
        .catch(err => {
            console.error(err);
            response.status(500).json({ error: err })
        })
});

router.patch('/:taskId', (request, response, next) => {
    const taskId = request.params.taskId
    const updateOps = {};

    for (const ops of request.body) {
        updateOps[ops.propName] = ops.value;
    }

    Task.updateOne({ _id: taskId }, { $set: updateOps })
    .exec()
    .then(result => {
        response.status(200).json(result)
    })
    .catch(err => {
        response.status(500).json({
            error: err
        })
    })
});

router.delete('/:taskId', (request, response, next) => {
    const taskId = request.params.taskId

    Task.remove({ _id: taskId }).exec()
        .then(result => {
            response.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({
                error: err
            })
        })
    response.status(200).json({
        message: 'Deleted task ID (' + taskId + ')'
    });
});

module.exports = router