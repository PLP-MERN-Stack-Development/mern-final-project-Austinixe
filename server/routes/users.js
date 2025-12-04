const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const { protect } = require('../middleware/auth');

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Get recipe count for this user
    const recipesCount = await Recipe.countDocuments({ user: user._id });

    res.status(200).json({
      success: true,
      data: {
        ...user.toObject(),
        recipesCount
      }
    });
  } catch (err) {
    next(err);
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, async (req, res, next) => {
  try {
    const { name, bio, location } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, location },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;