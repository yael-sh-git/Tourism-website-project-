export default{
    //getUsers,
    updateUser,
    deleteUser
}
import { ObjectId } from 'mongodb';
import { Error } from 'mongoose';
import userModule from '../models/User.js';

// async function getUsers(req, res, next){
   
//     try {
//         const nDate = new Date().toLocaleString('en-US', {
//             timeZone: 'Israel'
//         });

//     console.log(nDate);
//     console.log('in get function');
//     const users = await userModule.find();
//     res.send(users);
//     }
//     catch(error){
//         next(error);
//     }
    
// }





async function updateUser(req,res,next){

    try{
        console.log('in update function');
        const id = req.params.id;
        const user = req.body;
        const { firstName, lastName,  password, email, } = user;
        const updatedUser = {
            firstName: firstName,
            lastName: lastName,
            password: password,
            email: email
        }
        const updated = await userModule.findByIdAndUpdate(id, updatedUser, { new: true }).then(() => {
            console.log('updated successfully 😁');
          })
          .catch((error) => {
            console.error('Error update user:', error.message);
          });
        res.send(updated);
    }
    catch(error){
        next(error);
    }
}

async function deleteUser(req,res,next){

    try{
        console.log('in delete function');
        const id = req.params.id;
        const user = await userModule.deleteOne({ _id: new ObjectId(id) }).then(() => {
            console.log('deleted successfully 😁');
          })
          .catch((error) => {
            console.error('Error delete user:', error.message);
          });
        res.send(user);
    }
    catch(error){
        next(error);
    }
}
