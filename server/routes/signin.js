import express from 'express';
const router = express.Router();
import signin from '../controllers/signin.js';

router.post('/', signin.addUser);

export default router;