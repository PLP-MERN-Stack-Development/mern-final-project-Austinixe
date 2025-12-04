// ===== client/src/pages/MyRecipes.jsx =====
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recipeAPI } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import { Plus } from 'lucide-react';

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const fetchMyRecipes = async () => {
    try {
      const res = await recipeAPI.getMyRecipes();
      setRecipes(res.data.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Recipes</h1>
            <p className="text-gray-600 mt-1">{recipes.length} recipe(s)</p>
          </div>
          <Link
            to="/create"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Recipe</span>
          </Link>
        </div>

        {recipes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">You haven't created any recipes yet</p>
            <Link
              to="/create"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              Create Your First Recipe
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}