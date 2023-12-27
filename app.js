
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 5500;
const DB_URL = process.env.DB_URL;

const app = express();


console.log("DATABASE URL:",DB_URL)
mongoose.connect(DB_URL)
const DataBase = mongoose.connection;
DataBase.on("error",(error)=>{
    if(error){
        console.log("Error in Connecting to DataBase")
    }
})
DataBase.once("open",()=>{
    console.log("Connection to DataBase Successfully");
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');
app.use("",require('./routes/router'));

app.listen(PORT,error=>{
    if(error){
        console.log("Failed to Open Server")
    }else{
        console.log(`Server is Lestning At:http://localhost:${PORT}`)
    }
})