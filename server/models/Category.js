import { ObjectId } from 'mongodb';
import mongoose  from 'mongoose';
var  Schema = mongoose.Schema

const categorySchema = new Schema({
    category_name:{
        type: String,
        minlength: 2
    },
    image:{
        type: String
    }
},
    { timestamps: true, 'toJSON': { virtuals: true } });
   
export default mongoose.model('Category', categorySchema);