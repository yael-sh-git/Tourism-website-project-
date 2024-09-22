export default{
    getCategories,
    addCategory,
    updateCategoryById,
    deleteCategoryById
}
import { ObjectId } from 'mongodb';
import { Error } from 'mongoose';
import categoryModule from '../models/Category.js';

async function getCategories(req, res, next) {
    try {
        const categories = await categoryModule.find();
        res.json(categories);
    }
    catch (error) {
        next(error);
    }
}

async function addCategory(req, res, next) {
    try {
        let newCategory = new categoryModule(req.body);
        let saved = await newCategory.save();
        res.send(saved);
    }
    catch (error) {
        next(error);
    }
}

async function updateCategoryById(req, res, next) {
    try {
        const id = req.params.id;
        const category = req.body;
        const { category_name } = category;
        const categoryToUpdate = {
            category_name: category_name
        }
        const updated = await categoryModule.findByIdAndUpdate(id, categoryToUpdate, { new: true });
        res.send(updated);
    }
    catch (error) {
        next(error);
    }
}

async function deleteCategoryById(req, res, next) {
    try {
        const id = req.params.id;
        const category = await categoryModule.deleteOne({ _id: new ObjectId(id) });
        res.send(category);
    }
    catch (error) {
        next(error);
    }

}