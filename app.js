const express = require('express');
const res = require('express/lib/response');
const app = express();

const taskRoutes = require('./api/routes/tasks')

app.use('/tasks',taskRoutes);

module.exports = app;