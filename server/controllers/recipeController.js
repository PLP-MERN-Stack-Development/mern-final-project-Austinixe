const Recipe = require('../models/Recipe');
const { uploadToCloudinary } = require('../config/cloudinary');

// @desc    Get all recipes with filters
// @route   GET /api/recipes
// @access  Public
exports.getRecipes = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;

    // Build query
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const recipes = await Recipe.find(query)
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get total count
    const count = await Recipe.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      },
      data: recipes
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single recipe
// @route   GET /api/recipes/:id
// @access  Public
exports.getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('user', 'name avatar bio');

    if (!recipe) {
      return res.status(404).json({
        success: false,
        error: 'Recipe not found'
      });
    }

    // Increment views
    recipe.views += 1;
    await recipe.save();

    res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create recipe
// @route   POST /api/recipes
// @access  Private
exports.createRecipe = async (req, res, next) => {
  try {
    // Parse ingredients and instructions from JSON strings
    const ingredients = JSON.parse(req.body.ingredients || '[]');
    const instructions = JSON.parse(req.body.instructions || '[]');

    // Handle image upload
    let imageUrl = 'https://via.placeholder.com/400x300?text=Recipe+Image';
    
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, '9jakitchen/recipes');
      imageUrl = result.secure_url;
    }

    // Create recipe
    const recipe = await Recipe.create({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      ingredients,
      instructions,
      image: imageUrl,
      cookingTime: req.body.cookingTime,
      servings: req.body.servings,
      difficulty: req.body.difficulty
    });

    // Populate user info
    await recipe.populate('user', 'name avatar');

    res.status(201).json({
      success: true,
      data: recipe
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Private
exports.updateRecipe = async (req, res, next) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        error: 'Recipe not found'
      });
    }

    // Check ownership
    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this recipe'
      });
    }

    // Handle image upload if new image
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, '9jakitchen/recipes');
      req.body.image = result.secure_url;
    }

    // Parse JSON fields if they exist
    if (req.body.ingredients) {
      req.body.ingredients = JSON.parse(req.body.ingredients);
    }
    if (req.body.instructions) {
      req.body.instructions = JSON.parse(req.body.instructions);
    }

    recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('user', 'name avatar');

    res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Private
exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        error: 'Recipe not found'
      });
    }

    // Check ownership
    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this recipe'
      });
    }

    await recipe.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully',
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get my recipes
// @route   GET /api/recipes/my-recipes
// @access  Private
exports.getMyRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (err) {
    next(err);
  }
};