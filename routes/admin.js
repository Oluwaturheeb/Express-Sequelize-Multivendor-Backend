import express from 'express';
import * as admin from '../controller/adminController.js';
import app from '../conf/app.js';

const router = express.Router();
router.post('/superUser', admin.createAdmin);
router.get('/dashboard', [app.verifyMiddleware, app.isAdmin], admin.dashboard);
router.post('/block-user', [app.verifyMiddleware, app.isAdmin], admin.blockUser);
router.post('/category', [app.verifyMiddleware, app.isAdmin], admin.category);
router.post('/remove-category', [app.verifyMiddleware, app.isAdmin], admin.removeCategory);
export default router;