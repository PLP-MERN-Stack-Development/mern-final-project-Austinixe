import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Recipe API
export const recipeAPI = {
  getAll: (params) => api.get('/recipes', { params }),
  getOne: (id) => api.get(`/recipes/${id}`),
  create: (formData) => api.post('/recipes', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/recipes/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/recipes/${id}`),
  getMyRecipes: () => api.get('/recipes/user/my-recipes'),
};

// Favorite API
export const favoriteAPI = {
  getAll: () => api.get('/favorites'),
  add: (recipeId) => api.post(`/favorites/${recipeId}`),
  remove: (recipeId) => api.delete(`/favorites/${recipeId}`),
  check: (recipeId) => api.get(`/favorites/check/${recipeId}`),
};

// User API
export const userAPI = {
  getProfile: (id) => api.get(`/users/${id}`),
  updateProfile: (data) => api.put('/users/profile', data),
};

export default api;