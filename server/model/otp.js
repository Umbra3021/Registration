const mongoose =require('mongoose');
// const conn = require('../db/conn');

var otpSchema = new mongoose.Schema({
    email:String,
    code:String,
    expire:Number
},
{
    timestamps:true
})

let otp = mongoose.model('otp',otpSchema);
module.exports=otp;