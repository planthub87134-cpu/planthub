// PlantHub — Protected Route Component

import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="spinner-page">
        <div className="spinner spinner-lg"></div>
      </div>
    );
  }

  // If user is not logged in, but we have AuthGate, they technically won't reach here.
  // But just in case, redirect them.
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If a role is required and user doesn't have it, deny access
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
        <button onClick={() => window.location.href = '/'} className="btn btn-primary" style={{ marginTop: '20px' }}>
          Back to Home
        </button>
      </div>
    );
  }

  return children;
}
