const Recipe = require('../models/Recipe');
const mongoose = require('mongoose');

// ------------------------------
// Create Recipe
// ------------------------------
exports.createRecipe = async (req, res) => {
  try {
    const { title, description, category, cookingTime, servings, difficulty, ingredients, instructions } = req.body;

    // Check required fields
    if (!title || !description || !category || !cookingTime || !servings || !difficulty || !ingredients || !instructions) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const recipe = await Recipe.create({
      title,
      description,
      category,
      cookingTime,
      servings,
      difficulty,
      ingredients,
      instructions,
      createdBy: req.user.id
    });

    res.status(201).json({ success: true, data: recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ------------------------------
// Get All Recipes
// ------------------------------
exports.getAllRecipes = async (req, res) => {
  try {
    const { category, search } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const recipes = await Recipe.find(filter);
    res.status(200).json({ success: true, data: recipes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ------------------------------
// Get Recipe by ID
// ------------------------------
exports.getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid recipe ID' });
    }

    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ success: false, message: 'Recipe not found' });

    res.status(200).json({ success: true, data: recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ------------------------------
// Update Recipe
// ------------------------------
exports.updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid recipe ID' });
    }

    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ success: false, message: 'Recipe not found' });

    // Only allow owner to update
    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    Object.assign(recipe, req.body);
    await recipe.save();

    res.status(200).json({ success: true, data: recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ------------------------------
// Delete Recipe
// ------------------------------
exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid recipe ID' });
    }

    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ success: false, message: 'Recipe not found' });

    // Only allow owner to delete
    if (recipe.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    await recipe.deleteOne();
    res.status(200).json({ success: true, message: 'Recipe deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ------------------------------
// Get Current User Recipes
// ------------------------------
exports.getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ createdBy: req.user.id });
    res.status(200).json({ success: true, data: recipes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
