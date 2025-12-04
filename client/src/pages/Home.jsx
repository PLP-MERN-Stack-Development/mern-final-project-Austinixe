import { useState, useEffect } from 'react';
import { recipeAPI } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import { Search } from 'lucide-react';

const categories = ['All', 'Soups', 'Rice Dishes', 'Swallows', 'Proteins', 'Snacks', 'Drinks', 'Other'];

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetchRecipes();
  }, [category]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const params = {};
      if (category !== 'All') params.category = category;
      const res = await recipeAPI.getAll(params);
      setRecipes(res.data.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const params = { search };
      if (category !== 'All') params.category = category;
      const res = await recipeAPI.getAll(params);
      setRecipes(res.data.data);
    } catch (error) {
      console.error('Error searching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Authentic Nigerian Recipes
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              From Jollof Rice to Egusi Soup - Cook like a Nigerian Chef
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search recipes... (e.g., jollof, egusi)"
                  className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex overflow-x-auto space-x-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                  category === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading delicious recipes...</p>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No recipes found</p>
            <p className="text-gray-500 mt-2">Try a different search or category</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {category === 'All' ? 'All Recipes' : category} ({recipes.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}