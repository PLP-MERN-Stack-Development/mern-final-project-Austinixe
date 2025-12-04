const express = require('express');
const router = express.Router();
const {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getMyRecipes
} = require('../controllers/recipeController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

// Public routes
router.get('/', getRecipes);
router.get('/:id', getRecipe);

// Protected routes
router.post('/', protect, upload.single('image'), createRecipe);
router.put('/:id', protect, upload.single('image'), updateRecipe);
router.delete('/:id', protect, deleteRecipe);
router.get('/user/my-recipes', protect, getMyRecipes);

module.exports = router;