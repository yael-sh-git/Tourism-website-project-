export default{
    getReviewsByPlaceId,
    addReview
}
import { ObjectId } from 'mongodb';
import reviewModule from '../models/Review.js';

async function getReviewsByPlaceId(req, res, next) {
    try {
        const id = req.params.id;
        const review = await reviewModule.find({ place_id: new ObjectId(id) });
        res.send(review);
    }
    catch (error) {
        next(error);
    }
}

async function addReview(req, res, next) {
    try {
        const review = new reviewModule(req.body);
        const inserted = await review.save();
        console.log('review saved successfully 😁');
        res.send(inserted);
    }
    catch (error) {
        next(error);
    }
}