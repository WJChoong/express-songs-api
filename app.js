const express = require('express');
const app = express();

app.use(express.json())

let songs = [
  {
    id: 1,
    name: "Before You Go",
    author: "Lewis Capaldi"
  },
  {
    id: 2,
    type: "Tap In",
    author: "Saweetie"
  },
  {
    id: 3,
    name: "Say Something",
    author: "Kylie Minogue"
  },
  {
    id: 4,
    name: "More Than My Hometown",
    author: " Morgan Wallen"
  }
];

app.param("id", (req, res, next, songValue) => {
  // get the list of songs
  let song = songs.find(song => song.id == parseInt(songValue));
  req.song = song;

  next();
});


//return list of all songs
app.get('/songs', (req, res) => {
  res.status(200).json(songs);
});

//create a new song, and return new song
app.post('/songs', (req, res) => {
  let newSong = {
    id: songs.length + 1,
    name: req.body.name,
    artist: req.body.artist 
  }
  songs.push(newSong);
  res.status(201).json(newSong);
});

//return a song with id 
app.get('/songs/:id', (req, res) => {
  res.status(200).json(req.song);
});

//edit a song with id, and return edited song
app.put('/songs/:id', (req, res) => {
  req.song.name = req.body.name;
  req.song.artist = req.body.artist;
  res.status(200).json(req.song);
});

//delete a song with id, and return deleted song
app.delete("/songs/:id", (req, res) => {
  let index = songs.indexOf(req.song);
  songs.splice(index, 1);
  res.status(200).json(req.song);
});

module.exports = app