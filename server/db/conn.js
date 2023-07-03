const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});
const DB ="mongodb+srv://Abhishek:redmi4pro@cluster0.bch9syc.mongodb.net/Test?retryWrites=true&w=majority";

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect(DB);
    console.log("connected");
}