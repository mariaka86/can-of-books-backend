'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Books = require('./models/books.js');
const { response } = require('express');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

//connect to mongoose
mongoose.connect(process.env.DB_URL);

//add validation
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});


app.get('/', (request, response) => {
  response.status(200).send('Hello!!!');
});

app.get('/books', getBooks);

app.post('/books', postBooks);

app.put('/books/:id', putBooks);

async function getBooks(request, response, next) {
  try {
    //look at the documentation 
    let results = await Books.find();
    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

async function putBooks(req, res, nex){
  try {
    let id = req.params.id;
    let data = req.body;

    let updateBook = await Books.findByIdAndUpdate(id, data,{new: true, overwrite: true});
    res.status(200).send(updateBook);
  } catch (error) {
    next(error); 
  }
}

async function postBooks(req, res, next){
  try {
    let createdBook = await Books.create(req.body);
    res.status(200).send(createdBook);
  } catch (error) {
    next(error);
  }
}

app.get('*', (request, response) => {
  response.status(400).send('Not available');
});

app.use((error, request, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
