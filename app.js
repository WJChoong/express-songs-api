const express = require('express');
const app = express();
const PORT = 3000

app.use(express.json())

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


//return list of all songs - Done
app.get("/songs", (req, res) => {
    const results = songs

    res.json(results);
});


//create a new song, and return new song
app.post("/songs", (req, res) => {
    const songName = req.body.name;
    const songArtist = req.body.artist

    // push into the list of songs
    songs.push({ id: songs.length + 1, name: songName, artist: songArtist});
  
    res.status(200);
    res.send(songs);
  });


//return a song with id 
app.get("/songs/:id", (req, res) => {
    req.song = parseInt(req.params.id);

    const results = songs.filter(item => (req.params.id ? item.id === req.song : true))

    res.json(results);
});


//edit a song with id, and return edited song
app.put("/songs/:id", (req, res) => {
    req.song = parseInt(req.params.id);
    // 1. get song to be updated
    let remainingSongs = songs.filter(song => song.id === req.song);
    let songToBeUpdated = remainingSongs[0];

    // 2. update song
    if (req.body.name){
        songToBeUpdated["name"] = req.body.name;
    }
    if (req.body.artist){
        songToBeUpdated["artist"] = req.body.artist;
    }
    
    // // 3. send response with updated song
    res.status(200);
    res.send(songToBeUpdated);
});


//delete a song with id, and return deleted song
app.delete("/songs/:id", (req, res) => {
    req.song = parseInt(req.params.id);

    // 1. filter out the song which match the id
    let remainingSongs = songs.filter(song => song.id !== req.song);

    // 2. send response with remaining books
    res.status(200);
    res.send(remainingSongs);
});


app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
