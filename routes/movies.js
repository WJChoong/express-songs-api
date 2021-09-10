const express = require('express');
const router = express.Router();

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

// param handler
router.param("movieId", (req, res,next, id) => {
    let movie = movies.find(movie => movie.id == parseInt(req.params.movieId));
    req.movie = movie;
    next();
})

// get all data
router.get('/', (req, res) => {
    res.status(200).json(movies);
})

//create a new movie, and return new movie
router.post('/', (req, res) => {
  let newmovie = {
    id: movies.length + 1,
    name: req.body.name,
    artist: req.body.artist 
  }
  movies.push(newmovie);
  res.status(201).json(newmovie);
});

//return a movie with id 
router.get('/:movieId', (req, res) => {
    res.status(200).json(req.movie);
});

//edit a movie with id, and return edited movie
router.put('/:movieId', (req, res) => {
    req.movie.name = req.body.name;
    req.movie.artist = req.body.artist;
    res.status(200).json(req.movie);
});

//delete a movie with id, and return deleted movie
router.delete("/:movieId", (req, res) => {
    let index = movies.indexOf(req.movie);
    movies.splice(index, 1);
    res.status(200).json(req.movie);
});

module.exports = router;