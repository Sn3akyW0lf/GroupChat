const path = require('path');

const express = require('express');

const userController = require('../controllers/user');
const userAuth = require('../middleware/auth');


const router = express.Router();

router.post('/signup', userController.postUser);

router.post('/login', userController.postLogin);

router.get('/get-user-list', userAuth.authenticate, userController.getUserList);

module.exports = router;