import express from 'express';
import app from '../conf/app.js';
import user from '../controller/userController.js';

const router = express.Router();

/* GET users listing. */
router.get('/dashboard', app.verifyMiddleware, user.profile);
router.post('/address', app.verifyMiddleware, user.address);
router.delete('/delete-address/:id', app.verifyMiddleware, user.removeAddress);
router.post('/account-update', app.verifyMiddleware, user.account);
export default router;