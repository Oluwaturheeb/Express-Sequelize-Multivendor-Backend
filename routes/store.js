import express from 'express';
import app from '../conf/app.js';
import store from '../controller/storeController.js';
import m from 'multer';

let uploadMiddleware = m({dest: 'public/images/store/'});

const router = express.Router();

/* GET store listing. */
router.post('/create-store', [app.verifyMiddleware, uploadMiddleware.single('avatar')], store.createStore);
router.get('/dashboard', app.verifyMiddleware, store.dashboard);
export default router;
