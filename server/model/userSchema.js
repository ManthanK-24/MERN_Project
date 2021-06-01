const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    work: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    cpassword: {
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]

})




// hashing of password
userSchema.pre('save', async function(next) {
    console.log('hi');
    if(this.isModified('password')) {
          this.password = await bcrypt.hash(this.password,12);
          this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
    next();
});

// generateAuthToken
// jwt.sign(payload,secretOrPrivateKey,[options,callback])
userSchema.methods.generateAuthToken = async function(){
    try{
           let tokenMant = jwt.sign( {_id:this._id}, process.env.SECRET_KEY  );
           this.tokens = this.tokens.concat( { token:tokenMant } );
           await this.save();
           return tokenMant;
    } catch(err){
        console.log(err);
    }
}

const User = mongoose.model('USER',userSchema);
module.exports = User;