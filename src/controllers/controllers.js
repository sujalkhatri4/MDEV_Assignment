const Movie = require('../models/Movies');
const fs = require('fs');

// Function to import all movies from json
exports.importMovies = async (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));
        await Movie.insertMany(data); // Use Movie instead of Movies
        res.status(200).send("Movies imported successfully");
    } catch (e) {
        console.error(e);
        res.status(500).send("Error importing movies"); // Send response on error
    }
};

// Function to get all movies
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (e) {
        console.error(e);
        res.status(500).send('Error retrieving movies');
    }
};

// Function to create a new movie
exports.createMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (e) {
        console.error(e);
        res.status(500).send('Error creating movie');
    }
};

// Get a single movie by Id
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }
        res.status(200).json(movie);
    } catch (e) {
        console.error(e);
        res.status(500).send('Error retrieving movie');
    }
};

//update Movie

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