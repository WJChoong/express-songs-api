const express = require('express');
const Joi = require('joi');
const router = express.Router();

let songs = [
    {
        id: 1,
        name: "Before You Go",
        artist: "Lewis Capaldi"
    },
    {
        id: 2,
        name: "Tap In",
        artist: "Saweetie"
    },
    {
        id: 3,
        name: "Say Something",
        artist: "Kylie Minogue"
    },
    {
        id: 4,
        name: "More Than My Hometown",
        artist: "Morgan Wallen"
    }
];

const schema = Joi.object({
    name: Joi.string().min(3).required(),
    artist: Joi.string().min(3).required(),
})

//Song API
router.param('id', (req, res, next, id) => {
    let song = songs.find(song => song.id === parseInt(id));
    if(!song){
        const error = new Error(`Unable to find song with id: ${id}`);
        error.statusCode = 404;
        return next(error)
    }
    req.song = song;
    next();
});

//return list of all songs
router.get('/', (req, res, next) => {
    res.status(200).json(songs);
});

//create a new song, and return new song
router.post('/', async (req, res) => {    
    try {
        const result = await schema.validateAsync(req.body);
    }catch{
        return res.status(400).json("Bad Request");
    }

    let newSong = {
        id: songs.length + 1,
        name: req.body.name,
        artist: req.body.artist 
    }
    songs.push(newSong);
    res.status(201).json(newSong);
});

//return a song with id 
router.get('/:id', (req, res, next) => {
    res.status(200).json(req.song);
});

//update a song with id, and return edited song
router.put('/:id', async (req, res, next) => {
    try {
        const result = await schema.validateAsync(req.body);
    }catch{
        return res.status(400).json("Bad Request");
    }

    req.song.name = req.body.name;
    req.song.artist = req.body.artist;
    res.status(200).json(req.song);
});

//delete a song with id, and return deleted song
router.delete("/:id", (req, res, next) => {
    let index = songs.indexOf(req.song);
    songs.splice(index, 1);
    res.status(200).json(req.song);
});

//Add error handler for songs router to return 404 on failure at any route
router.use((err, req, res, next) => {
    res.status(404).json({ message: err.message });
});

module.exports = router;