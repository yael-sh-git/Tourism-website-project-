import express from 'express';
const router = express.Router();
import login from '../controllers/login.js';

router.get('/:email/:password', login.getUserByEmailAndPassword);

export default router;