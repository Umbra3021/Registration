const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const cors=require("cors");
const app=express();

app.use(cors());

require('../db/conn');

const otp = require('../model/otp');
const User = require('../model/TestSchema');


let otpcode;




router.post('/register', async (req,res) =>{
    const {name,email,password,password2} = req.body;

    if(!name || !email || !password || !password2){
        return res.status(422).json({error:"Check the form"});
    }
    try{

        const user = new User({name,email,password,password2});
        await user.save();

        res.status(201).json({message:"Succesfull"});
    }
    catch(err){
        console.log(err);
    }
});


router.post('/signin' , async(req,res) => {

    try{
    const {email,password} = req.body;

    const login = await User.findOne({email:email});
    
    if(!login){
        return res.status(400).json({error:"Invalid"});
    }
    else{
        return res.status(200).json({message:"Signed in"});
    }
}
catch(err){
    console.log(err);
}
})


router.post('/reset',async (req,res) => {
    try{    
            // let otpcode;
           emailsend=req.body.email
           let data = await User.findOne({email:emailsend});
           if(data){
                 otpcode = Math.floor((Math.random()*10000)+1);
                let otpdata= new otp({
                   email:emailsend,
                   code:otpcode,
                   expire:new Date().getTime()+300*1000
                });


                 
                let otpres= await otpdata.save();
                  
                  res.status(200).json({message:"Email found"});
                  return  res.end(JSON.stringify(otpcode));
              
                }
           else{
            return res.status(400).json({error:"no email found"});
           }
         
    }
    catch(err){
        console.log(err);
    }
});


router.post('/update',async (req,res) =>{
    try{
        let  {email,code,password} =req.body;
        let data =await otp.find({email:email,code:code});
        
        if(data){
            
            let current = new Date().getTime();
            let diff = data.expire -current;
            if(diff< 0){
                return res.status(500).json({error:"session expired"});
            }
            else{
                let user = await User.findOne({email:req.body.email});
                user.password = req.body.password;
                user.password2 = req.body.password;
                user.save();
                return res.status(200).json({message:"changed"});

            }
            
        }
        else{
            return res.status(200).json({error:"Invalid OTP"});
        }
    }
    catch(err){
        console.log(err);
    }
});





module.exports=router;