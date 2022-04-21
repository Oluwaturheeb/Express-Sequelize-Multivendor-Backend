import express from 'express';
import * as auth from '../controller/authController.js';
import passport from 'passport';

const router = express.Router();

router.post('/login', auth.login);
router.post('/register', auth.register);
router.post('/create-admin', auth.register);
router.get('/confirm/:data', auth.confirmEmail);
router.post('/forgot-password', auth.forgotPassword);
router.post('/change-password', auth.changePassword);
router.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email', 'phone']}));
router.get('/google', passport.authenticate('google', {failureRedirect: '/auth/login'}), auth.google);
router.post('/admin/login', auth.login);
router.post('/admin/register', auth.register);
export default router;