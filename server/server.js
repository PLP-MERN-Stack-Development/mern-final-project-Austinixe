const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
const favoriteRoutes = require('./routes/favorites');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/users', userRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: '9jaKitchen API',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

// Only connect to MongoDB and start server if this file is run directly
// (not when required by tests)
if (require.main === module) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('✅ MongoDB connected');
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err);
      process.exit(1);
    });
}

// Export app for testing
module.exports = app;