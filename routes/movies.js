const express = require('express');
const Joi = require('joi');
const router = express.Router()

let movies = [
    {
        id: 1,
        name: "The Notebook",
        artist: "Ryan Gosling"
      },
      {
        id: 2,
        name: "The Hate U Give",
        artist: "Amandla Stenberg"
      },
      {
        id: 3,
        name: "Titanic",
        artist: "Jackson Maine"
      },
      {
        id: 4,
        name: "A Star Is Born",
        artist: "Bradley Cooper"
      }
];

const schema = Joi.object({
    name: Joi.string().min(3).required(),
    artist: Joi.string().min(3).required(),
})

router.param('id', (req, res, next, id) => {
    let movie = movies.find(movie => movie.id === parseInt(id));
    if(!movie){
        const error = new Error(`Unable to find movie with id: ${id}`);
        error.statusCode = 404;
        return next(error)
    }
    req.movie = movie;
    next();
});

// Movies API
//return list of all movies
router.get('/', (req, res) => {
    res.status(200).json(movies);
});
  
//create a new movie, and return new movie
router.post('/', async (req, res) => {
    
    try {
        const result = await schema.validateAsync(req.body);
    }catch{
        return res.status(400).json("Bad Request");
    }

    let newmovie = {
        id: movies.length + 1,
        name: req.body.name,
        artist: req.body.artist 
    }
    movies.push(newmovie);
    res.status(201).json(newmovie);
});
  
//return a movie with id 
router.get('/:id', (req, res) => {
    res.status(200).json(req.movie);
});
  
//edit a movie with id, and return edited movie
router.put('/:id', async (req, res) => {
    try {
        const result = await schema.validateAsync(req.body);
    }catch{
        return res.status(400).json("Bad Request");
    }

    req.movie.name = req.body.name;
    req.movie.artist = req.body.artist;
    res.status(200).json(req.movie);
});
  
//delete a movie with id, and return deleted movie
router.delete("/:id", (req, res) => {
    let index = movies.indexOf(movie);
    movies.splice(index, 1);
    res.status(200).json(movie);
});

//Add error handler for movies router to return 404 on failure at any route
router.use((err, req, res, next) => {
    res.status(404).json({ message: err.message });
});

module.exports = router