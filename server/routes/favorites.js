const express = require('express');
const router = express.Router();
const {
  getFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite
} = require('../controllers/favoriteController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getFavorites);
router.post('/:recipeId', protect, addFavorite);
router.delete('/:recipeId', protect, removeFavorite);
router.get('/check/:recipeId', protect, checkFavorite);

module.exports = router;