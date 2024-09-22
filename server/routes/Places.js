import express from 'express';
const router = express.Router();
import place from '../controllers/Places.js';

router.get('/by_category/:id', place.getPlaceByCategoryId);

router.get('/:id', place.getPlaceById);

router.get('/', place.getPlaces);

router.post('/', place.addPlace);

router.put('/:id',place.updatePlaceById);

router.delete('/:id',place.deletePlaceById);

export default router;