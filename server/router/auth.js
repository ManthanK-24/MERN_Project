const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//require('../db/conn');
const User = require('../model/userSchema');

router.get('/',(req,res) => {
    res.send(`Hello From Server Express auth.js`);
    
});
// promises
/*router.post('/register',(req,res) => {
   
   
   const {name, email, phone , work,password,cpassword} = req.body;
    
   if(!name || !email || !phone || !work || !password || !cpassword ) {
        return res.status(422).json ( { error: " Fill all details"} );
    }
    
         //console.log(`Success`); 
    
         User.findOne(  { email: email } ) 
         .then((userExist) =>{
                if(userExist){
                    return res.status(422).json( { error: "Email already registered"});
                }

                const user = new User({name:name, email:email, phone:phone , work:work,password:password,cpassword:cpassword});
                user.save().then( () => {
                    res.status(201).json({ message: "user registered successfully"});
                }).catch(  (err) => res.status(500).json({error : "Failed to registered"}));

            }).catch( err => { console.log(err);  });
         
        
      
       
   // console.log(name);
    //console.log(email);
    //console.log(req.body);
     //res.json ( {message: req.body} );

   // res.send('hello from register page');
    
}); */
// async await
router.post('/register',async (req,res) => {
   
   
    const {name, email, phone , work,password,cpassword} = req.body;
     
    if(!name || !email || !phone || !work || !password || !cpassword ) {
         return res.status(422).json ( { error: " Fill all details"} );
     }
     
          //console.log(`Success`); 
          try{
          const userExist = await User.findOne(  { email: email } );

          if(userExist){
            return res.status(422).json( { error: "Email already registered"});
        } 
        else if(password!=cpassword){
            return res.status(422).json( { error: "Password are not matching"});
        }
        else{
            const user = new User({name:name, email:email, phone:phone , work:work,password:password,cpassword:cpassword});
            // hash 
    
    
            await user.save();
            res.status(201).json({ message: "user registered successfully"});
    
        }

                
        
           
          
     } catch(err){
            console.log(err);
          }
     
          
          
         
       
        
    // console.log(name);
     //console.log(email);
     //console.log(req.body);
      //res.json ( {message: req.body} );
 
    // res.send('hello from register page');
     
 });

router.post('/signin',async (req,res)=>{
     // console.log(req.body);
     // res.json({message:"awesome"});
     try{

        const {email,password} =req.body;
        if(!email || !password){
            return res.status(400).json( { error:"Plz fill all details"} )
           

        }
        const userLogin = await User.findOne({email:email});

        //const token = await userLogin.generateAuthToken(); 
            //console.log(token);

           // res.cookie("jwtoken",token,{
           // expires: new Date(Date.now() + 25989000000),
           // httpOnly: true
           // });
        
       // console.log(userLogin);
       if(userLogin) {

        const isMatch = await bcrypt.compare(password,userLogin.password);
         
        

        if(!isMatch){
            res.status(400).json({ message: "Invalid Credentials pass"});
        }
        else{

            
            res.json({ message: "User singin successfully"});
        }
       }
       else{
        res.status(400).json({ message: "Invalid Credentials"});
       }
         
        
     }catch(err){
        console.log(err);
     }
})

module.exports = router;