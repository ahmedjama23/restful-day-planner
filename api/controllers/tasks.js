const mongoose = require('mongoose');

const Task = require('../models/tasks');

exports.getAllTasks = (request, response, next) => {
    Task.find()
        .select('name timeAllocated _id')
        .exec()
        .then(docs => {
            const res = {
                description: "Returned all tasks",
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        timeAllocated: doc.timeAllocated,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/tasks/' + doc._id
                        }
                    }
                })
            }
            if (docs.length >= 0) {
                response.status(200).json(res);
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
}

exports.createTask = (request, response, next) => {
    const task = new Task({
        _id: mongoose.Types.ObjectId(),
        name: request.body.name,
        timeAllocated: request.body.timeAllocated
    })

    task.save().then(result => {
        response.status(201).json({
            description: "Created tasks using POST request",
            createdTask: {
                name: result.name,
                timeAllocated: result.timeAllocated,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/tasks/' + result._id
                }
            }
        });
    })
        .catch(error => {
            console.error(error);
            response.status(500).json({ error: error })
        });
}

exports.getTask = (request, response, next) => {
    const taskId = request.params.taskId;
    Task.findById(taskId)
        .select('name timeAllocated _id')
        .exec()
        .then(doc => {
            if (doc) {
                response.status(200).json({
                    task: doc.name,
                    timeAllocated: doc.timeAllocated,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/tasks'
                    }
                })
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
}

exports.updateTask = (request, response, next) => {
    const taskId = request.params.taskId
    const updateOps = {};

    for (const ops of request.body) {
        updateOps[ops.propName] = ops.value;
    }

    Task.updateOne({ _id: taskId }, { $set: updateOps })
        .exec()
        .then(result => {
            response.status(200).json({
                description: "Updated task " + taskId,
                updatedTask: {
                    task: result.name,
                    timeAllocated: result.timeAllocated,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/tasks/' + taskId
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

exports.deleteTask = (request, response, next) => {
    const taskId = request.params.taskId

    Task.remove({ _id: taskId }).exec()
        .then(result => {
            response.status(200).json({
                description: "Deleted task (" + taskId + ")",
                deletedTask: {
                    name: result.name,
                    timeAllocated: result.timeAllocated,
                    _id: result._id
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/tasks/' + result._id
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