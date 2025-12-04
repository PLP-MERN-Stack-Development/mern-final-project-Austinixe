import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { recipeAPI, favoriteAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Clock, Users, ChefHat, Heart, ArrowLeft, Trash2, Edit } from 'lucide-react';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    fetchRecipe();
    if (isAuthenticated) checkFavorite();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const res = await recipeAPI.getOne(id);
      setRecipe(res.data.data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite = async () => {
    try {
      const res = await favoriteAPI.check(id);
      setIsFavorited(res.data.isFavorited);
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorited) {
        await favoriteAPI.remove(id);
        setIsFavorited(false);
      } else {
        await favoriteAPI.add(id);
        setIsFavorited(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;
    try {
      await recipeAPI.delete(id);
      navigate('/my-recipes');
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Recipe not found</p>
          <Link to="/" className="text-primary-600 hover:underline mt-2 inline-block">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user && recipe.user && user._id === recipe.user._id;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Image */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={recipe.image || 'https://via.placeholder.com/800x400?text=Recipe'}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            {/* Category Badge */}
            <div className="absolute top-4 left-4 bg-primary-600 text-white px-4 py-2 rounded-full">
              {recipe.category}
            </div>
            {/* Actions */}
            <div className="absolute top-4 right-4 flex space-x-2">
              {isAuthenticated && (
                <button
                  onClick={toggleFavorite}
                  className={`p-3 rounded-full ${
                    isFavorited ? 'bg-red-500 text-white' : 'bg-white text-gray-700'
                  } hover:scale-110 transition`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              )}
              {isOwner && (
                <>
                  <Link
                    to={`/recipes/${id}/edit`}
                    className="p-3 bg-white rounded-full hover:scale-110 transition"
                  >
                    <Edit className="w-5 h-5 text-gray-700" />
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="p-3 bg-white rounded-full hover:scale-110 transition"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="p-8">
            {/* Title & Meta */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{recipe.description}</p>

            <div className="flex items-center space-x-6 mb-8 pb-6 border-b">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-primary-600" />
                <span className="text-gray-700">{recipe.cookingTime} minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary-600" />
                <span className="text-gray-700">{recipe.servings} servings</span>
              </div>
              <div className="flex items-center space-x-2">
                <ChefHat className="w-5 h-5 text-primary-600" />
                <span className="text-gray-700">{recipe.difficulty}</span>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span className="text-gray-700">
                      {ingredient.quantity} {ingredient.unit} {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction) => (
                  <li key={instruction.stepNumber} className="flex">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center mr-4">
                      {instruction.stepNumber}
                    </span>
                    <p className="text-gray-700 pt-1">{instruction.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Author */}
            {recipe.user && (
              <div className="mt-8 pt-6 border-t">
                <p className="text-sm text-gray-500 mb-2">Recipe by</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-lg text-primary-700">{recipe.user.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{recipe.user.name}</p>
                    {recipe.user.bio && (
                      <p className="text-sm text-gray-600">{recipe.user.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}