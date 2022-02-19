const express = require('express');
const app = express();
const logger = require('morgan');

// Route declarations
const taskRoutes = require('./api/routes/tasks');
const agendaItemRoutes = require('./api/routes/agendaItems');
const meetingRoutes = require('./api/routes/meetings');

app.use(logger('dev'));


// Request routing
app.use('/tasks',taskRoutes);
app.use('/agendaItems',agendaItemRoutes);
app.use('/meetings',meetingRoutes);

module.exports = app;