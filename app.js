const express = require('express');
const app = express();

app.use(express.json())

const songsRouter = require('./routes/songs');
const moviesRouter = require('./routes/movies');

app.use('/songs', songsRouter);
app.use('/movies', moviesRouter);

module.exports = app