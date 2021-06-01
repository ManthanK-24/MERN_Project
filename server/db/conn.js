const mongoose = require('mongoose');
const PORT =  process.env.PORT;
const DB = process.env.DATABASE; 
mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then( () =>{
    console.log('connection successful');
}).catch((err) => console.log('connection failed'));