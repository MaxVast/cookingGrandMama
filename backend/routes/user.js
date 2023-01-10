const express = require('express');
const router = express.Router();
//CONTROLLER
const ControllerUser = require('../controllers/user');
const auth = require("../middleware/auth");

router.post('/signup', ControllerUser.signup);
router.post('/login', ControllerUser.login);
router.get('/user/:id', auth, ControllerUser.getUser);


module.exports = router;