const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');

module.exports = router;

router.post('/mailsend',
UserController.Mail
);

router.get('/tablename',
UserController.Table
);

