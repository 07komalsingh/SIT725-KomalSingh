// server.js
// Simple Express server serving a static Materialize front-end
// and a REST GET endpoint that returns recipe data as JSON.

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (html, css, js) from the /public folder
app.use(express.static(path.join(__dirname, 'public')));

// Sample data — replace with your own if you like
const recipes = [
  {
    id: 1,
    title: 'Garlic Butter Pasta',
    description: 'A quick weeknight pasta tossed in garlic butter and parmesan.',
    time: '20 mins',
    difficulty: 'Easy',
    // image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&auto=format&fit=crop&q=80'
  image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500',},
  {
    id: 2,
    title: 'Vegetable Stir Fry',
    description: 'Crisp seasonal vegetables tossed in a savoury soy-ginger sauce.',
    time: '25 mins',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600'

  },
  {
    id: 3,
    title: 'Classic Beef Tacos',
    description: 'Spiced beef, fresh salsa, and crunchy shells — a crowd favourite.',
    time: '30 mins',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600'
  },
  {
    id: 4,
    title: 'Creamy Mushroom Risotto',
    description: 'Slow-cooked arborio rice with mushrooms, white wine, and parmesan.',
    time: '45 mins',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600'
  }
];

// REST GET endpoint — this is the piece the client fetches from
app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
