import express from 'express';
import app from '../conf/app.js';
import user from '../controller/userController.js';

const router = express.Router();

/* GET users listing. */
router.get('/dashboard', app.verifyMiddleware, user.profile);
router.post('/make-order', app.verifyMiddleware, user.purchase);
router.post('/account-update', app.verifyMiddleware, user.account);
export default router;
