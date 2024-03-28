const path = require('path');

const express = require('express');

const messageController = require('../controllers/message');

const userAuth = require('../middleware/auth');

const router = express.Router();

router.post('/post-message', userAuth.authenticate, messageController.postMessage);

router.get('/get-messages', userAuth.authenticate, messageController.getMessages);

module.exports = router;