require('dotenv').config();

const express = require('express');
const app = express();

const logger = require('morgan');
const parser = require('body-parser');
const mongoose = require('mongoose')

// Route declarations
const taskRoutes = require('./api/routes/tasks');
const agendaItemRoutes = require('./api/routes/agendaItems');
const meetingRoutes = require('./api/routes/meetings');

mongoose.connect('mongodb+srv://ajama:' + process.env.MONGO_DB_PW + '@day-planner.1bvqj.mongodb.net/' + process.env.MONGO_DB_CLUSTER + '?retryWrites=true&w=majority'
)

app.use(logger('dev'));
app.use(parser.urlencoded({extended: false}));
app.use(parser.json());

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(request.method === 'OPTIONS') {
        response.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
        return response.status(200).json({})
    }
    next();
});

// Request routing
app.use('/tasks',taskRoutes);
app.use('/agendaItems',agendaItemRoutes);
app.use('/meetings',meetingRoutes);

app.use((request, response, next) => {
    const error = new Error('File not found');
    error.status = 404;
    next(error);
});

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;