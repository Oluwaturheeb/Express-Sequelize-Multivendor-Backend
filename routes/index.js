import express from 'express';
import controller from '../controller/indexController.js';
const router = express.Router();


/* GET home page. */
router.get('/', controller);

export default router;