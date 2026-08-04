// server.js
// SIT725 4.2P — Add a Database (MVC architecture)
//
// Entry point that wires the MVC layers together:
//   Model      → models/Recipe.js
//   View       → public/ (HTML, CSS, client JS)
//   Controller → controllers/recipeController.js
//   Routes     → routes/recipeRoutes.js

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware ----------
app.use(express.static(path.join(__dirname, 'public'))); // View (static files)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ---------- Database connection ----------
// Uses its own database name (recipeBoxDB) so it never collides with the
// Prac 4 example database (myprojectDB).
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/recipeBoxDB';

mongoose.connect(MONGO_URI);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB (recipeBoxDB)');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
});

// ---------- Routes (→ Controller → Model) ----------
app.use('/api/recipes', recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
