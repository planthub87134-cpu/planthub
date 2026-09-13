import React, { useState } from 'react';
import { Link } from 'react-router';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="auth-page gradient-primary">
      <div className="leaf-pattern leaf-1">🍃</div>
      <div className="leaf-pattern leaf-2">🌿</div>
      <div className="leaf-pattern leaf-3">🌱</div>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🔑</div>
          <h1 className="auth-title">Reset Password</h1>
          <p className="auth-subtitle">Enter your email to receive a reset link</p>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>✉️</div>
            <h3 style={{ marginBottom: 'var(--space-2)' }}>Check your email</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }}>
              We have sent a password reset link to <strong>{email}</strong>
            </p>
            <Link to="/login" className="btn btn-primary btn-block">
              Return to Login
            </Link>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="form-label" htmlFor="reset-email">Email Address</label>
              <input
                id="reset-email"
                type="email"
                className="input"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary btn-block" style={{ marginBottom: 'var(--space-4)' }}>
              Send Reset Link
            </button>
            
            <div className="auth-footer" style={{ textAlign: 'center' }}>
              Remembered your password? <Link to="/login">Sign In</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
