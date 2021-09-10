const Joi = require('joi');
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
const DELAY = 10

//Integrate below methods in the route handlers with async and await
const getSongs = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(songs);
          }, DELAY);
    });
}

const createSong = (requestBody) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let newSong = {
                id: songs.length + 1,
                name: requestBody.name,
                artist: requestBody.artist 
            }

            songs.push(newSong);
            resolve(newSong)
        }, DELAY);
    });
}

const getSong = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let songFound = songs.find(song => song.id == parseInt(id));
            if (!songFound){
                reject(new Error(`Unable to find song with id: ${id}`))
            }
            return resolve(songFound);
        }, DELAY);
    })
}

const updateSong = (requestBody, songToUpdate) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            songToUpdate.name = requestBody.name;
            songToUpdate.artist = requestBody.artist;
            resolve(songToUpdate)
        }, DELAY);
    });
}

const deleteSong = (songToDelete) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(!songToDelete) {
                reject(new Error())
            }

            let index = songs.indexOf(songToDelete);
            songs.splice(index, 1);
            resolve(songToDelete);
        }, DELAY)
    })
}

//Song API
router.param('id', async (req, res, next, id) => {
    try{
        let song = await getSong(id);
        req.song = song;
    }catch(error){
        res.send(`Fail to get the song with id: ${id}`);
    }
    next();
});

//return list of all songs， Done
router.get('/', async (req, res, next) => {
    try{
        let songs = await getSongs();
    }catch(error){
        res.send("Fail to get songs");
    }
    res.status(200).json(songs);
});

//create a new song, and return new song
router.post('/', async (req, res, next) => {
    const validation = validateSong(req.body)
    if(validation.error) {
        let error = new Error(validation.error.details[0].message)
        error.statusCode = 400
        return next(error); 
    } 
    
    try{
        let song = await createSong(req.body,req.song);
        res.status(200).json(song);
    }catch(error){
        console.log(error);
        res.send("Unable to add the song");
    }
});

//return a song with id 
router.get('/:id', (req, res, next) => {
    res.status(200).json(req.song);
});

//update a song with id, and return edited song
router.put('/:id', async (req, res, next) => {
    const validation = validateSong(req.body)
    if (validation.error){
        let error = new Error(validation.error.details[0].message)
        error.statusCode = 400
        return next(error);
    }
    
    try{
        let song = await updateSong(req.body,req.song);
        res.status(200).json(song);
    }catch(error){
        console.log(error);
        res.send("Unable to update the song");
    }
});

//delete a song with id, and return deleted song
router.delete("/:id", async (req, res, next) => {
    try{
        let song = await deleteSong(req.song);
        res.status(200).json(song);
    }catch(error){
        console.log(error);
        res.send("Unable to delete the song");
    }    
});

//Add error handler for songs router to return error on failure at any route
router.use(function(err, req, res, next) {
    // If err has no error code, set error code to 500
    if (!err.statusCode){
        err.statusCode = 500; 
        err.message = { message: "Internal server error"}
    }

    // send back specified status code and message
    res.status(err.statusCode).json({ message : err.message}); 
});

const validateSong = async (song) => {
    const schema = {
        name: Joi.string().min(3).required(),
        artist: Joi.string().min(3).required()
    }
    try{
        const result = await schema.validateAsync(song, schema);
        return result;
    }catch(error){
        console.log(error);
        const result = req.error;
        return result;
    }
}

module.exports = router;