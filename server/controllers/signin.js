import userModule from '../models/User.js';
import {makeToken} from '../module/userToken.js';

export default{
    addUser
}

async function addUser(req, res,next) {

    let u =req.body;
    const token = makeToken(u);
    try{
        const existingUser = await userModule.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).send({ error: 'User with this email already exists 😐' });
        }
        console.log('in add function');
        const user = new userModule(req.body);
        const inserted = await user.save({ runValidators: true });
        console.log('User saved successfully 😁');
        return res.status(200).JSON({user: user,token:token}).end();        
    }
    catch(error){    
        console.error('Error saving user:', error.message);
        res.status(400).send({ error: error.message });
    }
    
}