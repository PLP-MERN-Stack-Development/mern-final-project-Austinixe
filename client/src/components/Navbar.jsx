import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Logo */}
        <Link to="/" onClick={closeMobileMenu} className="logo">
          <span>🍲</span>
          <span>9jaKitchen</span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <Link to="/" className="nav-link">Browse</Link>
          {isAuthenticated ? (
            <>
              <Link to="/create" className="nav-link">Create Recipe</Link>
              <Link to="/my-recipes" className="nav-link">My Recipes</Link>
              <Link to="/favorites" className="nav-link">Favorites</Link>
              <span className="nav-link">Hi, {user?.name}</span>
              <button onClick={handleLogout} className="nav-link">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'show' : ''}`}>
        <Link to="/" onClick={closeMobileMenu} className="nav-link">Browse</Link>
        {isAuthenticated ? (
          <>
            <Link to="/create" onClick={closeMobileMenu} className="nav-link">Create Recipe</Link>
            <Link to="/my-recipes" onClick={closeMobileMenu} className="nav-link">My Recipes</Link>
            <Link to="/favorites" onClick={closeMobileMenu} className="nav-link">Favorites</Link>
            <div className="mobile-user">
              <p>Logged in as <strong>{user?.name}</strong></p>
              <button onClick={handleLogout} className="nav-link">Logout</button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeMobileMenu} className="nav-link">Login</Link>
            <Link to="/register" onClick={closeMobileMenu} className="nav-link">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
