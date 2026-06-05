import express from 'express';
import { register } from 'module';

const router = express.Router();

router.post('/login');
router.post('/register');

export default router;