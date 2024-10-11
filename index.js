

//import express 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const fs = require('fs');
const path = require('path');

// Initialize MongoDB connection
const InitiateMongoServer = require('./db');
InitiateMongoServer();
//Read data from movies.json
try{
const data = JSON.parse(fs.readFileSync('./movies.json','utf-8'));
console.log(data)
}
catch(e){
        console.log(e);
}

// Initialize the express app
const app = express();





//middleware to bodyparser json bodies
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended:true}));

//mongoDb conection string
const mongoURI ='mongodb+srv://veroproduction4:sujalapi@cluster4.rmdge.mongodb.net/';

// Define a root route
app.get('/', (req, res) => {
    res.send('Welcome to the first program of Node.js Express');
});

//set the port 
const port = process.env.PORT || 3004;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});