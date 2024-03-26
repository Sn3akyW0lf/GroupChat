const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/signup', userController.postUser);

router.post('/login', userController.postLogin);

router.get('/get-user-list', userController.getUserList);

module.exports = router;