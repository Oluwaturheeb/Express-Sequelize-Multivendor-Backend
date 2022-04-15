var express = require('express');
var item = require('../controller/itemsController.js');
var app = require('../conf/app.js');
var m = require('multer');

let uploadMiddleware = m({dest: 'public/images/items/'});
let router = express.Router();

router.post('/create', [app.verifyMiddleware, uploadMiddleware.array('image', 5)], item.create);
router.post('/discount', app.verifyMiddleware, item.discount);
router.post('/top-item', app.verifyMiddleware, item.topItem);
router.post('/discount-all', app.verifyMiddleware, item.discountAll);
router.post('/remove-discount', app.verifyMiddleware, item.removeDiscount);
router.post('/remove-discount-all', app.verifyMiddleware, item.removeDiscountAll);
router.post('/update', app.verifyMiddleware, item.update);
router.post('/remove', app.verifyMiddleware, item.remove);
router.get('/get-item/:item', app.verifyMiddleware, item.itemInfo);
router.post('/cart', app.verifyMiddleware, item.cart);
router.post('/order', app.verifyMiddleware, item.orderItem);
module.exports = router;
