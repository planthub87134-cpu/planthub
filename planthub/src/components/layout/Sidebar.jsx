import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../hooks/useCart';
import { getInitials } from '../../utils/formatters';
import { Home, ShoppingBag, BookOpen, MessageSquare, HelpCircle, Shield, Menu, X, Sun, Moon, ShoppingCart, LogOut, User, Activity, PackageOpen, Gift, MapPin, Box } from 'lucide-react';

export default function Sidebar() {
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
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

  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const NavLink = ({ to, icon, label }) => (
    <Link
      to={to}
      className={`sidebar-link ${isActive(to) ? 'active' : ''}`}
      onClick={() => setMobileOpen(false)}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );

  return (
    <>
      {/* Mobile Toggle Button (Visible only on small screens) */}
      <button 
        className="mobile-sidebar-toggle" 
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{ position: 'fixed', top: '15px', left: '15px', zIndex: 1000, background: 'var(--bg-primary)', border: '1px solid var(--border-light)', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar overlay for mobile */}
      {mobileOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setMobileOpen(false)} 
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 998 }}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand" onClick={() => setMobileOpen(false)}>
            <span className="sidebar-brand-icon">🌱</span>
            <h2>Greenera</h2>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-nav-group">
            <NavLink to="/" icon={<Home size={20} />} label="Home" />
            <NavLink to="/shop" icon={<ShoppingBag size={20} />} label="Shop Now" />
            <NavLink to="/builder" icon={<Box size={20} />} label="3D Custom Pots ✨" />
            <NavLink to="/subscriptions" icon={<PackageOpen size={20} />} label="Subscriptions 📦" />
            <NavLink to="/gifting" icon={<Gift size={20} />} label="Gifting 🎁" />
            <NavLink to="/blog" icon={<BookOpen size={20} />} label="Blog & Tips" />
          </div>

          <div className="sidebar-nav-group">
            <h4 className="sidebar-nav-title">Support</h4>
            <NavLink to="/track-order" icon={<MapPin size={20} />} label="Track Order 📍" />
            <NavLink to="/plant-doctor" icon={<Activity size={20} />} label="Plant Doctor" />
            <NavLink to="/contact" icon={<MessageSquare size={20} />} label="Contact" />
            <NavLink to="/support" icon={<Shield size={20} />} label="Support Center & CRM" />
          </div>

          {user && ['admin', 'manager', 'agent'].includes(user.role) && (
            <div className="sidebar-nav-group">
              <h4 className="sidebar-nav-title">Administration</h4>
              {user.role === 'admin' && <NavLink to="/admin" icon={<Shield size={20} />} label="Admin Dashboard" />}
              {user.role === 'manager' && <NavLink to="/manager" icon={<Shield size={20} />} label="Manager Dashboard" />}
              {user.role === 'agent' && <NavLink to="/agent" icon={<Shield size={20} />} label="Agent Panel" />}
            </div>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-actions">
            <Link to="/cart" className="sidebar-action-btn" onClick={() => setMobileOpen(false)}>
              <ShoppingCart size={20} />
              <span>Cart</span>
              {cartCount > 0 && <span className="sidebar-cart-badge">{cartCount}</span>}
            </Link>
            
            <button className="sidebar-action-btn" onClick={toggleTheme}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          {user ? (
            <div className="sidebar-user">
              <div className="sidebar-user-info">
                <div className="avatar">{getInitials(user.name)}</div>
                <div className="sidebar-user-details">
                  <span className="sidebar-user-name">{user.name}</span>
                  <span className="sidebar-user-role">{user.role}</span>
                </div>
              </div>
              <button className="sidebar-logout-btn" onClick={handleLogout} title="Sign Out">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="sidebar-auth">
              <Link to="/login" className="btn btn-outline" style={{ width: '100%', marginBottom: '10px' }} onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/signup" className="btn btn-primary" style={{ width: '100%' }} onClick={() => setMobileOpen(false)}>Sign Up</Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
