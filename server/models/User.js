import { ObjectId } from 'mongodb';
import mongoose  from 'mongoose';
import validator from 'validator';
const { isEmail } = validator;
var  Schema = mongoose.Schema

const userSchema = new Schema({
    firstName:{
        type: String,
        minlength: 2
    },
    lastName:{
        type: String,
        minlength: 2
    },
    email:{
        type:String,
        unique: true,
        required:true,
        minlength: 11,
        validate: [isEmail, 'email is not valid 😡']
    },
    password:{
        type: String,
        required:true,
        minlength: [8,'password must be 8 signs or above 😐']
    }
    
},
    { timestamps: true, 'toJSON': { virtuals: true },context: 'query' });
   
// module.exports = mongoose.module('User',userSchema);
export default mongoose.model('User', userSchema);

