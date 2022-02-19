const express = require('express');
const app = express();

const logger = require('morgan');
const parser = require('body-parser')


// Route declarations
const taskRoutes = require('./api/routes/tasks');
const agendaItemRoutes = require('./api/routes/agendaItems');
const meetingRoutes = require('./api/routes/meetings');

app.use(logger('dev'));
app.use(parser.urlencoded({extended: false}));
app.use(parser.json())

// Request routing
app.use('/tasks',taskRoutes);
app.use('/agendaItems',agendaItemRoutes);
app.use('/meetings',meetingRoutes);

app.use((request, response, next) => {
    const error = new Error('File not found');
    error.status = 404;
    next(error);
})

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;