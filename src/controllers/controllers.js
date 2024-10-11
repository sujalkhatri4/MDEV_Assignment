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
    //Function to get all the files
exports.getMovies = async(req,res)=>{
    try{
        const movies = await Movie.find();
         res.status(200).json(movies);
    }
    catch(e){
            console.error(e);
            res.status(500).send('Error retrieving Movies');
    }
};

//Function to create a new movie
exports.createMovie = async(req,res)=>{
    try{
        const newMovie = new Movie(req.body);
        await newMovie.save();
         res.status(201).json(newMovie);
    }
    catch(e){
            console.error(e);
            res.status(500).send('Error creating Movies');
    }
};


//Get a single movie by Id
exports.updateMovie = async(req,res) =>{
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedMovie){
            return res.status(404).send('Movie is not updated');
        }
        res.status(201).json(updatedMovie);
    
    }
    catch(e){
        console.error(e);
        res.status(500).send('Error uodating the Movies');
    }
    };