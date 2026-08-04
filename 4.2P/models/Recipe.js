// models/Recipe.js
// Mongoose schema/model for a Recipe document.
//
// Fields are deliberately different from the Prac 4 example (title, image,
// link, description) — this app stores recipe-specific data instead
// (time, difficulty, cuisine) and adds real schema validation so that
// invalid writes are rejected rather than silently accepted.

const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 80,
  },
  description: {
    type: String,
    required: true,
    maxlength: 300,
  },
  time: {
    type: String, // e.g. "20 mins"
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard'],
  },
  cuisine: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);
