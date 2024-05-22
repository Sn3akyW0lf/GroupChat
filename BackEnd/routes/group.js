const path = require('path');
const express = require('express');
const groupController = require('../controllers/group');
const userAuth = require('../middleware/auth');

const router = express.Router();

router.post('/create-room', userAuth.authenticate, groupController.postGroup);

module.exports = router;
