const express =require('express');
const mongoose =require('mongoose');
const app=express();
require('./db/conn');
const cors=require("cors");
app.use(cors());

app.use(express.json());
app.use(require('./router/auth'));

const DB = "mongodb+srv://Abhishek:redmi4pro@cluster0.bch9syc.mongodb.net/Test?retryWrites=true&w=majority";
const port = 5000;




app.listen(port,()=>{
    console.log("Server is up and Running");
})

