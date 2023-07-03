const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const cors=require("cors");
const app=express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 })
 

require('../db/conn');

const otp = require('../model/otp');
const User = require('../model/TestSchema');


let otpcode;
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'ignacio79@ethereal.email',
        pass: 'RMSBRMnkhkVa5MT7BD'
    }
  });



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


router.post('/login' , async(req,res) => {

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


router.post('/emailsend',async (req,res) => {
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


                let info = {
                    from: '"Abhishek 👻" <foo@example.com>', // sender address
                    to: emailsend, // list of receivers
                    subject: "OTP Verification", // Subject line
                    html: `<b>Your OTP is  `+otpcode+ `</b>`, // html body
                  };
              
                  await transporter.sendMail(info);
                let otpres= await otpdata.save();

                
                
                  console.log("Message sent: %s", info.messageId);
                  return res.status(200).json({message:"Email found"});
              
                }
           else{
            return res.status(400).json({error:"no email found"});
           }
         
    }
    catch(err){
        console.log(err);
    }
});


router.post('/reset',async (req,res) =>{
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