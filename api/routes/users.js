const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/users');

router.post('/signup', (request, response, next) => {
    bcrypt.hash(request.body.password, 10, (err, hash) => {
        if (err) {
            return response.status(500).json({
                error: err
            });
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: request.body.email,
                password: hash
            })
            user.save()
            .then(result => {
                console.log(result)
                return response.status(201).json({
                    message: 'User created'
                })
            })
            .catch(error => {
                console.error(error)
                return response.status(500).json({
                    error: error
                })
            });
        }
    })
})

module.exports = router;