'use strict'

require ('dotenv').config ();
const mongoose= require ('mongoose');
mongoose.connect(process.env.DB_URL);
const Book= require('./models/books.js');

// const bookSchema = new schema({
//   title: {type: string, require: true},
//   description: {type: string, require: true},
//   available: {type: boolean, require: true}
// })

async function seed(){

await Book.create({
  title: 'Twilight',
  description: 'Twilight is a series of fantasy romance novels by Stephanie Meyer. It follows the life of Isabella "Bella" Swan, a human teenager who moves to Forks, Washington and finds her life turned upside-down when she falls in love with a vampire named Edward Cullen.',
  available: true,
})

await Book.create({
  title: 'The Book of Five Rings',
  description: 'An manual of technique and philosophy.',
  available: true,
})


await Book.create({
  title: 'Breathe',
  description: 'The Breathing Series is one girls story of unspeakable cruelty, life-changing love, and her precarious grasp of hope.',
  available: true, 
})

}

seed();
