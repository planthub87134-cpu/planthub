// PlantHub — Auth Callback (handles OAuth redirects)

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase handles the session automatically via onAuthStateChange
    // Just redirect to shop after a brief pause
    const timer = setTimeout(() => {
      navigate('/shop', { replace: true });
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="auth-page gradient-primary">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <div className="spinner spinner-lg" style={{ margin: '0 auto var(--space-6)' }}></div>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
          Signing you in...
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
          Please wait while we complete your sign-in.
        </p>
      </div>
    </div>
  );
}
