import express from 'express';
const router = express.Router();
import category from '../controllers/Category.js';

router.get('/', category.getCategories);

router.post('/', category.addCategory);

router.put('/:id',category.updateCategoryById);

router.delete('/:id', category.deleteCategoryById);

export default router;