import { ObjectId } from 'mongodb';
import validator from 'validator';
import mongoose  from 'mongoose';
var  Schema = mongoose.Schema
const adressSchema = new mongoose.Schema({
    street: String,
    city: String
})

const placesSchema = new Schema({
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    } ,
    place_name:{
        type: String,
        minlength: 2,
        required:true
    },
    image: {
        type: String
    },
    adress: [adressSchema],
    tel:{
        type: String,
        minlength: [5, 'tel is not valid 😡']
    },
    target_age:{
        type: String
    },
    comments:{
        type: String
    }
},
    { timestamps: true, 'toJSON': { virtuals: true } });
   
export default mongoose.model('Places', placesSchema);