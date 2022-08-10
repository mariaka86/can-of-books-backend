'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose= require('mongoose');
const Books = require('./models/books.js');
const { response } = require('express');

const app = express();
app.use(cors());



//connect to mongoose
mongoose.connect(process.env.DB_URL);

//add validation
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is connected');
});

//define PORT validation env is working
const PORT = process.env.PORT || 3002;


app.get('/', (request, response) => {
  response.status(200).send('Hello!!!');
});

app.get('/books', getBooks);


//add a server endpoint to handle delete requests to /book/:id
app.delete('/books/:id', deleteBooks);


//verify that you can access the book id from the request.params object
async function deleteBooks(request, response, next){
  let id= request.params.id
  try{
    //let us delete the books from the database
    response.status(200).send('Book was Deleted');
  } catch (error){
    next(error);
  }
}





async function getBooks(request, response, next){
  try {
    //look at the documentation 
   let results = await Books.find({});
   console.log(results);
   response.status(200).send(results);
} catch (error){
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
