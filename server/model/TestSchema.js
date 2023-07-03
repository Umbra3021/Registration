const mongoose = require('mongoose');
const jwt =require('jsonwebtoken');


const TestSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    password2:{
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

const User = mongoose.model('User',TestSchema);
module.exports = User;
