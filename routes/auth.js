import express from 'express';
import {login, register, forgotPassword, changePassword, confirmEmail} from '../controller/authController.js';


const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/confirm/:data', confirmEmail);
router.post('/forgot-password', forgotPassword);
router.post('/change-password', changePassword);

export default router;