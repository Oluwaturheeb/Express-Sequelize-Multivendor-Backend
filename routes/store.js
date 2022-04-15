var express = require('express');
var app = require('../conf/app.js');
var store = require('../controller/storeController.js');
var m = require('multer');

let uploadMiddleware = m({dest: 'public/images/store/'});

var router = express.Router();

/* GET store listing. */
router.post('/create-store', [app.verifyMiddleware, uploadMiddleware.single('avatar')], store.createStore);
router.get('/dashboard', app.verifyMiddleware, store.dashboard);
module.exports = router;
