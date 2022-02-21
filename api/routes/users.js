const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/check-auth')

const UserController = require('../controllers/users');

router.post('/signup', UserController.signUp);

router.post('/login', UserController.login)

router.delete('/:userId', checkAuth, UserController.deleteUser)

module.exports = router;