const Favorite = require('../models/Favorite');

// @desc    Get my favorites
// @route   GET /api/favorites
// @access  Private
exports.getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id })
      .populate({
        path: 'recipe',
        populate: {
          path: 'user',
          select: 'name avatar'
        }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add to favorites
// @route   POST /api/favorites/:recipeId
// @access  Private
exports.addFavorite = async (req, res, next) => {
  try {
    // Check if already favorited
    const existing = await Favorite.findOne({
      user: req.user.id,
      recipe: req.params.recipeId
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        error: 'Recipe already in favorites'
      });
    }

    const favorite = await Favorite.create({
      user: req.user.id,
      recipe: req.params.recipeId
    });

    res.status(201).json({
      success: true,
      message: 'Recipe added to favorites',
      data: favorite
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Remove from favorites
// @route   DELETE /api/favorites/:recipeId
// @access  Private
exports.removeFavorite = async (req, res, next) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      user: req.user.id,
      recipe: req.params.recipeId
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        error: 'Favorite not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Recipe removed from favorites',
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Check if recipe is favorited
// @route   GET /api/favorites/check/:recipeId
// @access  Private
exports.checkFavorite = async (req, res, next) => {
  try {
    const favorite = await Favorite.findOne({
      user: req.user.id,
      recipe: req.params.recipeId
    });

    res.status(200).json({
      success: true,
      isFavorited: !!favorite
    });
  } catch (err) {
    next(err);
  }
};