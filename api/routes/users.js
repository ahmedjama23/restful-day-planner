const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/users');

router.post('/signup', (request, response, next) => {
    User.find({ email: request.body.email })
        .exec()
        .then(users => {
            if (users.length >= 1) {
                return response.status(409).json({
                    message: "Email already in use"
                });
            }
            else {

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
            }
        })
        .catch()

});

router.delete('/:userId', (request, response, next) => {
    User.deleteOne({_userId: request.params.userId})
    .exec()
    .then(result => {
        return response.status(200).json({
            message: "User deleted"
        })
    })
    .catch(err => {
        return response.status(500).json({
            error: err.message
        })
    })
})

module.exports = router;