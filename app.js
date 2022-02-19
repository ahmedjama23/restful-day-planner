const express = require('express');
const res = require('express/lib/response');
const app = express();

const taskRoutes = require('./api/routes/tasks')
const agendaItemRoutes = require('./api/routes/agendaItems')
const meetingRoutes = require('./api/routes/meetings')

app.use('/tasks',taskRoutes);
app.use('/agendaItems',taskRoutes);
app.use('/meetings',taskRoutes);

module.exports = app;