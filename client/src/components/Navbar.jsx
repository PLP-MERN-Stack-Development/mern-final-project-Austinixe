import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <span className="text-2xl">🍲</span>
            <span className="text-xl font-bold text-primary-600">9jaKitchen</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition">
              Browse
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/create" className="text-gray-700 hover:text-primary-600 transition">
                  Create Recipe
                </Link>
                <Link to="/my-recipes" className="text-gray-700 hover:text-primary-600 transition">
                  My Recipes
                </Link>
                <Link to="/favorites" className="text-gray-700 hover:text-primary-600 transition">
                  Favorites
                </Link>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Hi, {user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Browse Recipes
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/create"
                    onClick={closeMobileMenu}
                    className="text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    Create Recipe
                  </Link>
                  <Link
                    to="/my-recipes"
                    onClick={closeMobileMenu}
                    className="text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    My Recipes
                  </Link>
                  <Link
                    to="/favorites"
                    onClick={closeMobileMenu}
                    className="text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    Favorites
                  </Link>
                  <div className="px-4 py-2 border-t border-gray-200 mt-2 pt-4">
                    <p className="text-sm text-gray-600 mb-3">
                      Logged in as <span className="font-medium">{user?.name}</span>
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm transition"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition mx-4"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}