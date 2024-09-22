import userModule from '../models/User.js';
import {makeToken} from '../module/userToken.js';

export default{
    getUserByEmailAndPassword
}

async function getUserByEmailAndPassword(req, res,next){
    try{
        console.log('in getUserByEmailAndPassword function');
        const email = req.params.email;
        const password = req.params.password;
        const user = await userModule.findOne({email: email, password: password});
        if(user){
            console.log("the login success!😃");
            const token = makeToken(user);
            console.log(user);
            return res.json({user: user, token: token});           
        }
        else {
             // res.status(500).json( "user is undefined 😤" );
            throw new Error("user is undefined 😤");
            //throw new error("user is undefined 😤");
            //res.send("user is undefined 😤");
        }
        
    }
    catch(error){
        next(error);
    }
    

}