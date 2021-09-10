const express = require('express');
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

router.param('songId', (req, res, next, id) => {
    let song = songs.find(song => song.id === parseInt(id));
    
    try{
        String(song.id);
        req.song = song;
        next();
    }catch{
        let err = `Unable to find song with id: ${id}`
        res.status(404)
        res.send({ error: err})
    }
});

// Get all songs
router.get('/', (req, res, next) => {
    res.status(200).json(songs);
});

// Add new songs 
router.post('/', (req, res) => {
    let newSong = {
        id: songs.length + 1,
        name: req.body.name,
        artist: req.body.artist 
    }
    songs.push(newSong);
    res.status(201).json(newSong);
});

//  Get songs with id
router.get('/:songId/', (req, res, next) =>{
    res.status(200).json(req.song);
})

//edit a song with id, and return edited song
router.put('/:songId', (req, res) => {
  req.song.name = req.body.name;
  req.song.artist = req.body.artist;
  res.status(200).json(req.song);
});

//delete a song with id, and return deleted song
router.delete("/:songId", (req, res) => {
    let songToDelete = req.song
    let index = songs.indexOf(songToDelete);
    songs.splice(index, 1);
    res.status(200).json(songToDelete);
});

module.exports = router;