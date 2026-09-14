// PlantHub — Navbar Component

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../hooks/useCart';
import { getInitials } from '../../utils/formatters';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user previously saved dark mode preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await signOut();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <span className="navbar-brand-icon">🌱</span>
          PlantHub
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Links */}
        <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          <Link
            to="/"
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
            title="Home"
          >
            🏠
          </Link>
          <Link
            to="/shop"
            className={`navbar-link ${isActive('/shop') ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
            title="Shop"
          >
            🛍️
          </Link>
          <Link
            to="/contact"
            className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
            title="Contact"
          >
            📞
          </Link>
          <Link
            to="/feedback"
            className={`navbar-link ${isActive('/feedback') ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
            title="Feedback"
          >
            💬
          </Link>
          <Link
            to="/support"
            className={`navbar-link ${isActive('/support') ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
            title="Support"
          >
            🛠️
          </Link>
          <Link
            to="/admin"
            className={`navbar-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
            title="Admin Dashboard"
          >
            🛡️
          </Link>
          <Link
            to="/manager"
            className={`navbar-link ${location.pathname.startsWith('/manager') ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
            title="Manager Dashboard"
          >
            🧑‍💼
          </Link>
          <Link
            to="/agent"
            className={`navbar-link ${location.pathname.startsWith('/agent') ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
            title="Agent Panel"
          >
            🎧
          </Link>
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Theme Toggle */}
          <button 
            className="navbar-link" 
            onClick={toggleTheme} 
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{ fontSize: '1.2rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>

          {/* Cart */}
          <Link to="/cart" className="navbar-cart" id="cart-button" aria-label="Shopping cart">
            🛒
            {cartCount > 0 && (
              <span className="navbar-cart-count">{cartCount}</span>
            )}
          </Link>

          {/* Auth */}
          <div className="flex gap-2">
            <Link to="/admin" className="btn btn-outline" style={{ borderRadius: 'var(--radius-xl)' }}>
              Admin
            </Link>
            <Link to="/manager" className="btn btn-outline" style={{ borderRadius: 'var(--radius-xl)' }}>
              Manager
            </Link>
            <Link to="/agent" className="btn btn-outline" style={{ borderRadius: 'var(--radius-xl)' }}>
              Agent
            </Link>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {dropdownOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 'var(--z-dropdown)' }}
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </nav>
  );
}
