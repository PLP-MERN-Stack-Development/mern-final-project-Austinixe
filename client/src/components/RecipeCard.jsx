import { Link } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipes/${recipe._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={recipe.image || 'https://via.placeholder.com/400x300?text=Recipe'}
            alt={recipe.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
            {recipe.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
            {recipe.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {recipe.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{recipe.cookingTime} min</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{recipe.servings}</span>
              </div>
            </div>
            <span className={`px-2 py-1 rounded text-xs ${
              recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
              recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {recipe.difficulty}
            </span>
          </div>

          {/* Author */}
          {recipe.user && (
            <div className="mt-3 pt-3 border-t flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-xs text-primary-700">{recipe.user.name[0]}</span>
              </div>
              <span className="text-sm text-gray-600">{recipe.user.name}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}