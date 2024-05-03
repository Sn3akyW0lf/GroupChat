const path = require('path');

const express = require('express');

const messageController = require('../controllers/message');

const userAuth = require('../middleware/auth');

const router = express.Router();

router.post('/post-message', userAuth.authenticate, messageController.postMessage);

router.get('/get-messages/:lastChat', userAuth.authenticate, messageController.getMessages);

// router.get('/get-messages/:date', userAuth.authenticate, messageController.getNewMessages);

module.exports = router;