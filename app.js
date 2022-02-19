const express = require('express');
const res = require('express/lib/response');
const app = express();

app.use((request, response, next) => {
    response.status(200).json({
        message: "Success"
    });
});

module.exports = app;