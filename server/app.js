// For package.json  -> npm init -y
// For node modules and express -> npm i express

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// #9 Data storing in DB


// #8 Express Router Middleware
app.use( express.json() ); 

app.use(require('./router/auth'));

// #7 User Schema & Model => defines structures of model
const User = require('./model/userSchema');

// #6 Adding Security with dotenv

dotenv.config({path:'./config.env'});
require('./db/conn');
const DB = process.env.DATABASE; 
const PORT =  process.env.PORT;

// #5 DB connection





// #4 MiddleWare
const middleware = (req,res,next) =>{
   console.log('MiddleWare Hello');
   next();
}


// #3 Routing 
//app.get('/',(req,res) => {
 //    res.send(`Hello From Server Express app.js`);
     
//});
app.get('/about',middleware,(req,res) => {
    console.log('Hello About');
    res.send(`Hello From About Page`);

});
app.get('/contact',(req,res) => {
   // res.cookie("Cookie_Name",'Cookie_Value');
    res.send(`Hello From Contact Page`);
});
app.get('/signin',(req,res) => { 
    res.send(`Hello From Login Page`);
});
app.get('/signup',(req,res) => {
    res.send(`Hello From Register Page`);
});
//console.log("Server Hello");
// we always use bectic in cons.log
app.listen(PORT,() =>{
    console.log(`Server running at ${PORT} `);
});