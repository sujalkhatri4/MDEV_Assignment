const Movie = require('../models/Movies');
const fs =require('fs');

//Function to import all movies from json
exports.importMovies = async(req,res)=>{
    try{
        const data = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));
        await Movies.insertMany(data);// import data from mongodb
        res.status(200).send("movies imported sucessfully")
    }
    catch{(e)
        console.error(e);
    }

    };