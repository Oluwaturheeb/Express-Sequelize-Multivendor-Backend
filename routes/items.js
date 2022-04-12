import express from 'express';
import * as item from '../controller/itemsController.js';
import app from '../conf/app.js';
import m from 'multer';

let uploadMiddleware = m({dest: 'public/images/items/'});
let router = express.Router();

router.post('/create', [app.verifyMiddleware, uploadMiddleware.array('image', 5)], item.create);
router.post('/discount', app.verifyMiddleware, item.discount);
router.post('/discount-all', app.verifyMiddleware, item.discountAll);
router.post('/remove-discount', app.verifyMiddleware, item.removeDiscount);
router.post('/remove-discount-all', app.verifyMiddleware, item.removeDiscountAll);
router.post('/update', app.verifyMiddleware, item.update);
router.post('/remove', app.verifyMiddleware, item.remove);

export default router;
