const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});
const DB =process.env.DATABASE;

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect(DB);
    console.log("connected");
}