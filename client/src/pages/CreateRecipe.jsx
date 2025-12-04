import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipeAPI } from '../services/api';
import { Plus, X } from 'lucide-react';

const categories = ['Soups', 'Rice Dishes', 'Swallows', 'Proteins', 'Snacks', 'Drinks', 'Other'];

export default function CreateRecipe() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Soups',
    cookingTime: '',
    servings: '',
    difficulty: 'Medium',
  });

  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const [instructions, setInstructions] = useState([{ stepNumber: 1, text: '' }]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addInstruction = () => {
    setInstructions([...instructions, { stepNumber: instructions.length + 1, text: '' }]);
  };

  const removeInstruction = (index) => {
    const updated = instructions.filter((_, i) => i !== index);
    updated.forEach((inst, i) => {
      inst.stepNumber = i + 1;
    });
    setInstructions(updated);
  };

  const updateInstruction = (index, value) => {
    const updated = [...instructions];
    updated[index].text = value;
    setInstructions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('cookingTime', formData.cookingTime);
      data.append('servings', formData.servings);
      data.append('difficulty', formData.difficulty);
      data.append('ingredients', JSON.stringify(ingredients));
      data.append('instructions', JSON.stringify(instructions));
      if (image) data.append('image', image);

      const res = await recipeAPI.create(data);
      navigate(`/recipes/${res.data.data._id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Recipe</h1>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Perfect Jollof Rice"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Brief description of your recipe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty *
                </label>
                <select
                  name="difficulty"
                  required
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cooking Time (minutes) *
                </label>
                <input
                  type="number"
                  name="cookingTime"
                  required
                  value={formData.cookingTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="45"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Servings *
                </label>
                <input
                  type="number"
                  name="servings"
                  required
                  value={formData.servings}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="4"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipe Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              {preview && (
                <img src={preview} alt="Preview" className="mt-2 h-48 object-cover rounded-lg" />
              )}
            </div>

            {/* Ingredients */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Ingredients *
                </label>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
              <div className="space-y-2">
                {ingredients.map((ing, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ingredient"
                      value={ing.name}
                      onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Qty"
                      value={ing.quantity}
                      onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                      className="w-20 px-3 py-2 border rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Unit"
                      value={ing.unit}
                      onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                      className="w-24 px-3 py-2 border rounded-lg"
                    />
                    {ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Instructions *
                </label>
                <button
                  type="button"
                  onClick={addInstruction}
                  className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Step</span>
                </button>
              </div>
              <div className="space-y-3">
                {instructions.map((inst, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center">
                      {inst.stepNumber}
                    </div>
                    <textarea
                      placeholder={`Step ${inst.stepNumber}`}
                      value={inst.text}
                      onChange={(e) => updateInstruction(index, e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg"
                      rows="2"
                      required
                    />
                    {instructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInstruction(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Recipe'}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}