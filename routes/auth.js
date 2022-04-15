var express = require('express');
var {login, register, forgotPassword, changePassword, confirmEmail} = require('../controller/authController.js');


var router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/confirm/:data', confirmEmail);
router.post('/forgot-password', forgotPassword);
router.post('/change-password', changePassword);

module.exports = router;