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
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
          {/* Brand */}
          <Link to="/" className="navbar-brand">
            <span className="navbar-brand-icon">🌱</span>
            Greenera Foundation
          </Link>

          {/* Navigation Links */}
          <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          <Link
            to="/"
            className={`btn btn-ghost ${isActive('/') ? 'btn-secondary' : ''}`}
            onClick={() => setMobileOpen(false)}
            title="Home"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`btn btn-ghost ${isActive('/shop') ? 'btn-secondary' : ''}`}
            onClick={() => setMobileOpen(false)}
            title="Shop"
          >
            Shop
          </Link>
          <Link
            to="/blog"
            className={`btn btn-ghost ${location.pathname.startsWith('/blog') ? 'btn-secondary' : ''}`}
            onClick={() => setMobileOpen(false)}
            title="Blog & Tips"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className={`btn btn-ghost ${isActive('/contact') ? 'btn-secondary' : ''}`}
            onClick={() => setMobileOpen(false)}
            title="Contact"
          >
            Contact
          </Link>
          <Link
            to="/feedback"
            className={`btn btn-ghost ${isActive('/feedback') ? 'btn-secondary' : ''}`}
            onClick={() => setMobileOpen(false)}
            title="Feedback"
          >
            Feedback
          </Link>
          <Link
            to="/support"
            className={`btn btn-ghost ${isActive('/support') ? 'btn-secondary' : ''}`}
            onClick={() => setMobileOpen(false)}
            title="Support"
          >
            Support
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className={`btn btn-ghost ${location.pathname.startsWith('/admin') ? 'btn-secondary' : ''}`}
              onClick={() => setMobileOpen(false)}
              title="Admin Dashboard"
            >
              Admin Dashboard
            </Link>
          )}
          {user?.role === 'manager' && (
            <Link
              to="/manager"
              className={`btn btn-ghost ${location.pathname.startsWith('/manager') ? 'btn-secondary' : ''}`}
              onClick={() => setMobileOpen(false)}
              title="Manager Dashboard"
            >
              Manager Dashboard
            </Link>
          )}
          {user?.role === 'agent' && (
            <Link
              to="/agent"
              className={`btn btn-ghost ${location.pathname.startsWith('/agent') ? 'btn-secondary' : ''}`}
              onClick={() => setMobileOpen(false)}
              title="Agent Panel"
            >
              Agent Panel
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Toggle & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
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
          <Link to="/cart" className="navbar-cart" id="cart-button" aria-label="Shopping cart" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Cart</span>
            {cartCount > 0 && (
              <span className="navbar-cart-count">{cartCount}</span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="navbar-user-menu">
              <button
                className="navbar-user-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                id="user-menu-button"
              >
                <div className="avatar">{getInitials(user.name)}</div>
                <span className="hide-mobile" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>
                  {user.name}
                </span>
              </button>

              {dropdownOpen && (
                <div className="navbar-dropdown" id="user-dropdown">
                  <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border-light)', marginBottom: 'var(--space-2)' }}>
                    <div style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)' }}>{user.name}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{user.email}</div>
                    <div className="badge badge-success" style={{ marginTop: 'var(--space-2)' }}>{user.role}</div>
                  </div>
                  <Link to="/profile" className="navbar-dropdown-item" onClick={() => setDropdownOpen(false)}>
                    Profile
                  </Link>
                  <Link to="/orders" className="navbar-dropdown-item" onClick={() => setDropdownOpen(false)}>
                    My Orders
                  </Link>
                  <div className="navbar-dropdown-divider" />
                  <button className="navbar-dropdown-item" onClick={handleLogout} id="logout-button" style={{ color: 'var(--danger-500)' }}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-outline" style={{ borderRadius: 'var(--radius-md)' }}>
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary" style={{ borderRadius: 'var(--radius-md)' }}>
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
          style={{ marginLeft: 'var(--space-2)' }}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
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
