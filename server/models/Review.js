import mongoose  from 'mongoose';
var  Schema = mongoose.Schema;

const reviewSchema = new Schema({
    place_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Places'
    } ,
    value:{
        type: String,
        minlength: 2
    },
    date:{
        type: Date,
        default: new Date()
    }
},
    { timestamps: true, 'toJSON': { virtuals: true } });
   
export default mongoose.model('Review', reviewSchema);