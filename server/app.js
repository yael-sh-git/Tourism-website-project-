 import express from 'express';
 const app = express();
 import cors  from 'cors';
 import mongoose from 'mongoose';
 import user from './routes/User.js';
 import places from './routes/Places.js';
 import category from './routes/Category.js';
 import review from './routes/Review.js';
 import login from './routes/login.js';
 import signin from './routes/signin.js';
 import * as  VerifyToken  from './middlewares/verifyUserToken.js'

 import path from 'path';

 const port = 3003;


 import bodyParser from "body-parser";
 var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
 


 mongoose.connect('mongodb://localhost:27017/projectDB');


 app.use(express.json());

 app.use('/login',login );

 app.use('/signin',signin);

 app.use('/user',VerifyToken.verifyToken,user);

app.use('/category',category);

app.use('/places',places);

app.use('/review',review);
//  app.use((err, req, res, next) => {
//     if (err.errors)
//         res.status(400).send("its not valid !");
//     res.status(500).send('there is an error ! 🤐');
// });



app.listen(port, () => { console.log(`this is a server running on port ${port}`) });
