const express = require('express');
const router = express.Router();
const movieController = require('../controllers/controllers');

// Route to import movies
router.post('/import', movieController.importMovies);

// Route to get all movies
router.get('/', movieController.getMovies);

// Route to create a new movie
router.post('/create', movieController.createMovie);

// Route to get a single movie by id
router.get('/:id', movieController.getMovieById);

//Route to update a movie by id

router.put('/update/:id',movieController.updateMovie);

module.exports = router;
