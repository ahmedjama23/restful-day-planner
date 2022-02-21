const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

exports.signUp = (request, response, next) => {
    User.find({
        $or:
            [
                { email: request.body.email },
                { username: request.body.username }
            ]
    })
        .exec()
        .then(users => {
            if (users.length >= 1) {
                return response.status(409).json({
                    message: "Email or username already in use"
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
                            username: request.body.username,
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

}

exports.login = (request, response, next) => {
    User.find({
        $or:
            [
                { email: request.body.email },
                { username: request.body.username }
            ]
    })
        .exec()
        .then(users => {
            if (users.length < 1) {
                return response.status(401).json({
                    message: 'Auth failed'
                })
            }
            bcrypt.compare(request.body.password, users[0].password, (error, result) => {
                if (error) {
                    return response.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: users[0].email,
                        username: users[0].username,
                        userId: users[0]._id
                    },
                        process.env.JWT_PRIVATE_KEY,
                        {
                            expiresIn: "1 hour"
                        })
                    return response.status(200).json({
                        message: 'Auth successful',
                        token: token
                    })
                }
                return response.status(401).json({
                    message: 'Auth failed'
                });
            })
        })
        .catch(error => {
            console.log(error);
            response.status(500).json({
                error: error
            })
        })
}


exports.deleteUser = (request, response, next) => {
    User.deleteOne({userId: request.body.userId})
        .exec()
        .then(result => {
            return response.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            return response.status(500).json({
                error: err.message
            })
        })
}