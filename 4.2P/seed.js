// seed.js
// Populates recipeBoxDB with sample data — different content from the
// original 3.2P static array (different recipes, plus a new "cuisine"
// field that the static version and the Prac 4 example never had).
//
// Run with: node seed.js

const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/recipeBoxDB';

const sampleRecipes = [
  {
    title: 'Butter Chicken',
    description: 'Tender chicken simmered in a rich, spiced tomato and butter sauce.',
    time: '40 mins',
    difficulty: 'Medium',
    cuisine: 'Indian',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600',
  },
  {
    title: 'Margherita Pizza',
    description: 'Classic wood-fired style pizza with tomato, mozzarella, and fresh basil.',
    time: '35 mins',
    difficulty: 'Medium',
    cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1548365328-9f547fb0953b?w=600',
  },
  {
    title: 'Chicken Pad Thai',
    description: 'Stir-fried rice noodles with chicken, egg, peanuts, and tamarind sauce.',
    time: '30 mins',
    difficulty: 'Medium',
    cuisine: 'Thai',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600',
  },
  {
    title: 'French Onion Soup',
    description: 'Slow-caramelised onions in a rich beef broth, topped with melted cheese.',
    time: '55 mins',
    difficulty: 'Hard',
    cuisine: 'French',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600',
  },
  {
    title: 'Greek Salad',
    description: 'Crisp cucumber, tomato, olives, and feta tossed in olive oil and oregano.',
    time: '10 mins',
    difficulty: 'Easy',
    cuisine: 'Greek',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB (recipeBoxDB)');

    await Recipe.deleteMany({});
    console.log('Cleared existing recipes');

    const inserted = await Recipe.insertMany(sampleRecipes);
    console.log(`Inserted ${inserted.length} sample recipes`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
