export default{
    getPlaces,
    getPlaceByCategoryId,
    addPlace,
    deletePlaceById,
    updatePlaceById,
    getPlaceById
}

import { ObjectId } from 'mongodb';
import placesModule from '../models/Places.js';

async function getPlaces(req, res, next) {
    try {
        const places = await placesModule.find().populate('category_id');
        res.send(places);
    }
    catch (error) {
        next(error);
    }
}

async function getPlaceById(req, res, next) {
    try {
        const id = req.params.id;
        const places = await placesModule.find({ _id: new ObjectId(id) });
        res.send(places);
    }
    catch (error) {
        next(error);
    }
}

async function getPlaceByCategoryId(req, res, next) {
    try {
        const category = req.params.id;
        const places = await placesModule.find({ category_id: category });
        res.send(places);
    }
    catch (error) {
        next(error);
    }
}

async function addPlace(req, res, next) {
    try {
        const place = new placesModule(req.body);
        const inserted = await place.save();
        console.log('place saved successfully 😁');
        res.send(inserted);
    }
    catch (error) {
        next(error);
    }
}

async function deletePlaceById(req, res, next) {
    try {
        const id = req.params.id;
        const place = await placesModule.deleteOne({ _id: new ObjectId(id) });
        res.send(place);
    }
    catch (error) {
        next(error);
    }

}

async function updatePlaceById(req, res, next) {
    try {
        const id = req.params.id;
        const place = req.body;
        const { category_id, place_name, image, adress, tel,target_age,comments } = place;
        const placeToUpdate = {
            category_id: category_id,
            place_name: place_name,
            image: image,
            adress: adress,
            tel: tel,
            target_age: target_age,
            comments: comments
        };
        const updated = await placesModule.findByIdAndUpdate(id, placeToUpdate, { new: true });
        res.send(updated);
    }
    catch (error) {
        next(error);
    }
}



