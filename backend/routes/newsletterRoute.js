import express from 'express';
import { addNewsletter, listNewsletter, removeNewsletter } from '../controllers/newsletterController.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/add', addNewsletter);
router.get('/list', adminAuth, listNewsletter);
router.post('/remove', adminAuth, removeNewsletter);

export default router; 