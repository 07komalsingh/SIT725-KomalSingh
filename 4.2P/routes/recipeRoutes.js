// routes/recipeRoutes.js
// Route layer — maps URL paths to controller functions.
// Keeps routing separate from business logic (controller) and data (model).

const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/', recipeController.getRecipes);
router.post('/', recipeController.createRecipe);

module.exports = router;
