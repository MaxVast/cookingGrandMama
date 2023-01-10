const express = require('express');
const router = express.Router();
//CONTROLLER
const ControllerUser = require('../controllers/user');

router.post('/signup', ControllerUser.signup);
router.post('/login', ControllerUser.login);

module.exports = router;