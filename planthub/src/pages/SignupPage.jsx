// PlantHub — Signup Page

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const { signUp, signInWithGoogle, isDemoMode, demoLogin } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!agreeTerms) {
      setError('Please agree to the Terms & Conditions');
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password, name, phone);
    setLoading(false);

    if (error) {
      setError(error.message || 'Signup failed');
    } else {
      navigate('/shop');
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    const { error } = await signInWithGoogle();
    if (error) setError(error.message || 'Google signup failed');
    else if (isDemoMode) navigate('/shop');
  };

  return (
    <div className="auth-page gradient-primary">
      <div className="leaf-pattern leaf-1">🍃</div>
      <div className="leaf-pattern leaf-2">🌿</div>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🌱</div>
          <h1 className="auth-title">Join PlantHub</h1>
          <p className="auth-subtitle">Create your account and start shopping</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-3) var(--space-4)',
            color: 'var(--danger-600)',
            fontSize: 'var(--text-sm)',
            marginBottom: 'var(--space-5)',
          }}>
            {error}
          </div>
        )}

        <button className="btn btn-google btn-block" onClick={handleGoogleSignup} id="google-signup" style={{ marginBottom: 'var(--space-4)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign up with Google
        </button>

        <div className="divider">or sign up with email</div>

        <form className="auth-form" onSubmit={handleSignup}>
          <div className="form-field">
            <label className="form-label" htmlFor="signup-name">Full Name</label>
            <input
              id="signup-name"
              type="text"
              className="input"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="signup-email">Email (Gmail)</label>
            <input
              id="signup-email"
              type="email"
              className="input"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="signup-phone">Mobile No</label>
            <input
              id="signup-phone"
              type="tel"
              className="input"
              placeholder="+1234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              className="input"
              placeholder="Min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="signup-confirm">Confirm Password</label>
            <input
              id="signup-confirm"
              type="password"
              className="input"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              id="agree-terms"
            />
            <span>
              I agree to the <Link to="/terms-and-conditions" style={{ color: 'var(--primary-600)', fontWeight: 'var(--font-semibold)' }}>Terms & Conditions</Link> and <Link to="/privacy-policy" style={{ color: 'var(--primary-600)', fontWeight: 'var(--font-semibold)' }}>Privacy Policy</Link>
            </span>
          </label>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading} id="signup-submit">
            {loading ? <span className="spinner"></span> : 'Create Account'}
          </button>
        </form>

        {isDemoMode && (
          <div style={{
            marginTop: 'var(--space-5)',
            padding: 'var(--space-3)',
            background: 'var(--warm-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--warm-200)',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--warm-600)' }}>
              🧪 Demo Mode — <button onClick={() => { demoLogin('customer'); navigate('/shop'); }} style={{ color: 'var(--primary-600)', fontWeight: 'var(--font-bold)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Quick Demo Login</button>
            </p>
          </div>
        )}

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
