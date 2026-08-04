// controllers/recipeController.js
// Controller layer — handles HTTP requests/responses for recipes.
// Talks to the Model (Recipe) and returns JSON for the View (public/).

const Recipe = require('../models/Recipe');

// GET /api/recipes — read all recipes from MongoDB
async function getRecipes(req, res) {
  try {
    const recipes = await Recipe.find({}).sort({ createdAt: 1 });
    res.json({ statusCode: 200, data: recipes, message: 'Success' });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

// POST /api/recipes — "safe write": only accepts an allowlist of fields
// and relies on the schema (models/Recipe.js) to validate them before
// anything is saved.
async function createRecipe(req, res) {
  try {
    const { title, description, time, difficulty, cuisine, image } = req.body;
    const recipe = new Recipe({ title, description, time, difficulty, cuisine, image });
    await recipe.save(); // schema validation runs here
    res.status(201).json({
      statusCode: 201,
      message: 'Recipe created successfully',
      data: recipe,
    });
  } catch (err) {
    res.status(400).json({ statusCode: 400, message: err.message });
  }
}

module.exports = {
  getRecipes,
  createRecipe,
};
