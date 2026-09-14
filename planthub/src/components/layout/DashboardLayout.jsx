// PlantHub — Dashboard Layout (Sidebar + Content)

import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';

export default function DashboardLayout({ role = 'admin' }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeView, setActiveView] = useState(() => {
    const path = location.pathname;
    if (path.includes('inventory')) return 'inventory';
    if (path.includes('orders')) return 'orders';
    if (path.includes('users')) return 'users';
    if (path.includes('tickets')) return 'tickets';
    return 'overview';
  });

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const adminLinks = [
    { id: 'overview', label: '📊 Analytics', icon: '📊' },
    { id: 'inventory', label: '🌿 Products', icon: '🌿' },
    { id: 'orders', label: '📦 Orders', icon: '📦' },
    { id: 'users', label: '👥 Users', icon: '👥' },
  ];

  const managerLinks = [
    { id: 'orders', label: '📦 Order Processing', icon: '📦' },
    { id: 'inventory', label: '🌿 Inventory Overview', icon: '🌿' },
  ];

  const agentLinks = [
    { id: 'tickets', label: '🎧 Support Tickets', icon: '🎧' },
  ];

  const links = role === 'admin' ? adminLinks : role === 'manager' ? managerLinks : agentLinks;

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <a href="/" className={`dashboard-sidebar-brand ${role}`}>
          {role === 'admin' ? '⚙️ Admin' : role === 'manager' ? '📦 Manager' : '🎧 Agent'}
        </a>

        <nav className="dashboard-sidebar-nav">
          {links.map(link => (
            <button
              key={link.id}
              className={`dashboard-sidebar-link ${activeView === link.id ? `active ${role}` : ''}`}
              onClick={() => setActiveView(link.id)}
              id={`sidebar-${link.id}`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)', marginTop: 'auto' }}>
          <div style={{ padding: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
            <div style={{ fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)' }}>{user?.name}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{user?.email}</div>
          </div>
          <button
            className="dashboard-sidebar-link"
            onClick={() => navigate('/')}
            style={{ color: 'var(--text-secondary)' }}
          >
            🏠 Back to Site
          </button>
          <button
            className="dashboard-sidebar-link"
            onClick={handleLogout}
            style={{ color: 'var(--danger-500)' }}
            id="dashboard-logout"
          >
            🚪 Sign Out
          </button>
        </div>
      </aside>

      <div className="dashboard-content">
        <Outlet context={{ activeView, setActiveView }} />
      </div>
    </div>
  );
}
