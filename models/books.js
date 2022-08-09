'use strict';

const mongoose= require('mongoose');

const { Schema }= mongoose;

const bookSchema = new Schema({
  title: {type: String, require: true},
  description: {type: String, require: true},
  available: {type: Boolean, require: true}
})

const BookModel= mongoose.model('Book', bookSchema);

module.exports = BookModel;