// PlantHub — Navbar Component

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../hooks/useCart';
import { getInitials } from '../../utils/formatters';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
          >
            Home
          </Link>
          <Link
            to="/shop"
            className={`navbar-link ${isActive('/shop') ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/contact"
            className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/feedback"
            className={`navbar-link ${isActive('/feedback') ? 'active' : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Feedback
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className={`navbar-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              Admin
            </Link>
          )}
          {user?.role === 'manager' && (
            <Link
              to="/manager"
              className={`navbar-link ${location.pathname.startsWith('/manager') ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              Manager
            </Link>
          )}
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Cart */}
          <Link to="/cart" className="navbar-cart" id="cart-button" aria-label="Shopping cart">
            🛒
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
                    👤 Profile
                  </Link>
                  <Link to="/orders" className="navbar-dropdown-item" onClick={() => setDropdownOpen(false)}>
                    📦 My Orders
                  </Link>
                  <div className="navbar-dropdown-divider" />
                  <button className="navbar-dropdown-item" onClick={handleLogout} id="logout-button" style={{ color: 'var(--danger-500)' }}>
                    🚪 Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-ghost btn-sm hide-mobile">Sign In</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Get Started</Link>
            </div>
          )}
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
