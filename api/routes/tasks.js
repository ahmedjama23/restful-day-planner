const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/check-auth')

const TaskController = require('../controllers/tasks')

router.get('/', TaskController.getAllTasks);

router.post('/', checkAuth, TaskController.createTask);

router.get('/:taskId', TaskController.getTask);

router.patch('/:taskId', checkAuth, TaskController.updateTask);

router.delete('/:taskId', checkAuth, TaskController.deleteTask);

module.exports = router