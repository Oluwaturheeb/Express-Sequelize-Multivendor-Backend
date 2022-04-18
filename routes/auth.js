import express from 'express';
import {login, register, forgotPassword, changePassword, confirmEmail, google, facebook} from '../controller/authController.js';
import passport from 'passport';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/confirm/:data', confirmEmail);
router.post('/forgot-password', forgotPassword);
router.post('/change-password', changePassword);
router.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email', 'phone']}));
router.get('/google', passport.authenticate('google', {failureRedirect: '/auth/login'}), google)
router.get('/facebook', facebook);

export default router;