

//import express 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session=require('express-session');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const movieRoutes = require('./src/routes/routes');
const {logger,handleNotFound} = require('./src/middleware/middleware');
dotenv.config({ path: './config.env' });
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
require('./src/config/passportConfig');
const authRoutes = require('./src/routes/authRoutes');


// Initialize MongoDB connection
const InitiateMongoServer = require('./db');
const { route } = require('./src/routes/routes');
InitiateMongoServer();

// Initialize the express app
const app = express();


//Set us session and passport
const secretKey = process.env.SECRET_KEY || crypto.randomBytes(64).toString('hex');
console.log(`Generated Secret Key: ${secretKey}`);
app.use(session({
    secret:secretKey,
    resave:false,
    saveUninitialized:true,
}));
app.use(passport.initialize());
app.use(passport.session());


//Read data from movies.json
const data = JSON.parse(fs.readFileSync('./movies.json','utf-8'));
//console.log(data)


//Function to import movies from JSON
const importMovies = async (req, res) => {
    try {
        const count = await Movie.countDocuments();
        if (count === 0) {
            
            await Movie.create(data);
            console.log('Data successfully imported to MongoDb');
            res.status(200).send('Data successfully imported');
        } else {
            console.log('Data already exists in the database, skipping import');
            res.status(200).send('Data already exists, skipping import');
        }
    } catch (e) {
        console.error('Error importing data',e);
        
    }
};


//middleware to bodyparser json bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



//mongoDb conection string
//const mongoURI ='mongodb+srv://veroproduction4:sujalapi@cluster4.rmdge.mongodb.net/';

//Use auth Routes
app.use('/auth',authRoutes);

// Define a root route
app.get('/', (req, res) => {
    res.send('Welcome to the first program of Node.js Express');});
app.use('/movie',movieRoutes)
console.log("h1")
app.use(logger);//apply logger middleware
app.use(handleNotFound);//404 handler for routes not defined
//set the port 
const port = process.env.PORT || 3004;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});