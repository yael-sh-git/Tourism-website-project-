import express from 'express';
const router = express.Router();
import user from '../controllers/User.js';

//router.get('/', user.getUsers);

router.put('/:id',user.updateUser);

router.delete('/:id',user.deleteUser);

export default router;
