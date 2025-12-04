// ===== client/src/pages/Favorites.jsx =====
import { useState, useEffect } from 'react';
import { favoriteAPI } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import { Heart } from 'lucide-react';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await favoriteAPI.getAll();
      setFavorites(res.data.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
            <Heart className="w-8 h-8 text-red-500" />
            <span>My Favorites</span>
          </h1>
          <p className="text-gray-600 mt-1">{favorites.length} saved recipe(s)</p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600 mb-2">No favorite recipes yet</p>
            <p className="text-gray-500">
              Click the heart icon on recipes you love to save them here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((fav) => (
              <RecipeCard key={fav._id} recipe={fav.recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}