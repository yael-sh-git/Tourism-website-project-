import express from 'express';
const router = express.Router();
import review from '../controllers/Review.js';


router.get('/:id', review.getReviewsByPlaceId);

router.post('/', review.addReview);


export default router;