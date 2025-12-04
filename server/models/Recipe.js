const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  category: {
    type: String,
    required: true,
    enum: ['Soups', 'Rice Dishes', 'Swallows', 'Proteins', 'Snacks', 'Drinks', 'Other']
  },
  ingredients: [{
    name: String,
    quantity: String,
    unit: String
  }],
  instructions: [{
    stepNumber: Number,
    text: String
  }],
  image: {
    type: String,
    default: 'https://res.cloudinary.com/demo/image/upload/recipe-default.jpg'
  },
  cookingTime: Number,
  servings: Number,
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  views: { type: Number, default: 0 },
  slug: { type: String, unique: true }
}, { timestamps: true });

recipeSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
  }
  next();
});

module.exports = mongoose.model('Recipe', recipeSchema);
