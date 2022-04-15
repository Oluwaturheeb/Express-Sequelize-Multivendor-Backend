var express = require('express');
var app = require('../conf/app.js');
var user = require('../controller/userController.js');

var router = express.Router();

/* GET users listing. */
router.get('/dashboard', app.verifyMiddleware, user.profile);
router.post('/make-order', app.verifyMiddleware, user.purchase);
router.post('/account-update', app.verifyMiddleware, user.account);
module.exports = router;
