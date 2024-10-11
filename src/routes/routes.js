const express = require('express');
const router = express.Router();
const movieController = require('../controllers/controllers');

//Route to import movies
router.post('/import',movieController.importMovies);

module.exports = router;