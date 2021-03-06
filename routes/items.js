import express from 'express';
import item from '../controller/itemsController.js';
import app from '../conf/app.js';
import m from 'multer';

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
router.post('/get-items', item.getItemsSoft);
router.post('/cart', app.verifyMiddleware, item.cart);
router.post('/order', app.verifyMiddleware, item.orderItem);
router.post('/review', app.verifyMiddleware, item.review);
router.get('/category/:item?', item.showCatItem);
router.get('/wishlist', app.verifyMiddleware, item.wishlist);
router.post('/add-wishlist', app.verifyMiddleware, item.addToWishlist);
router.delete('/remove-wishlist/:item', app.verifyMiddleware, item.removeFromWishlist);
export default router;
