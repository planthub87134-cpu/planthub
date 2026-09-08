// PlantHub — Login Page

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { signIn, signInWithGoogle, signInWithPhone, verifyOtp, demoLogin, isDemoMode } = useAuth();
  const navigate = useNavigate();
  const [method, setMethod] = useState('email'); // email | phone
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error.message || 'Login failed');
    } else {
      navigate('/shop');
    }
  };

  const handlePhoneSend = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signInWithPhone(phone);
    setLoading(false);
    if (error) {
      setError(error.message || 'Failed to send OTP');
    } else {
      setOtpSent(true);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await verifyOtp(phone, otp);
    setLoading(false);
    if (error) {
      setError(error.message || 'Invalid OTP');
    } else {
      navigate('/shop');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    const { error } = await signInWithGoogle();
    if (error) setError(error.message || 'Google login failed');
    else if (isDemoMode) navigate('/shop');
  };

  const handleDemoLogin = (role) => {
    demoLogin(role);
    if (role === 'admin') navigate('/admin');
    else if (role === 'manager') navigate('/manager');
    else navigate('/shop');
  };

  return (
    <div className="auth-page gradient-primary">
      {/* Decorative elements */}
      <div className="leaf-pattern leaf-1">🍃</div>
      <div className="leaf-pattern leaf-2">🌿</div>
      <div className="leaf-pattern leaf-3">🌱</div>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🌱</div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your PlantHub account</p>
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

        {/* Method Toggle */}
        <div className="flex gap-2" style={{ marginBottom: 'var(--space-5)' }}>
          <button
            className={`btn btn-sm ${method === 'email' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => { setMethod('email'); setError(''); }}
            style={{ flex: 1 }}
          >
            📧 Email
          </button>
          <button
            className={`btn btn-sm ${method === 'phone' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => { setMethod('phone'); setError(''); setOtpSent(false); }}
            style={{ flex: 1 }}
          >
            📱 Phone
          </button>
        </div>

        {method === 'email' ? (
          <form className="auth-form" onSubmit={handleEmailLogin}>
            <div className="form-field">
              <label className="form-label" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                className="input"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                className="input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading} id="login-submit">
              {loading ? <span className="spinner"></span> : 'Sign In'}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={otpSent ? handleOtpVerify : handlePhoneSend}>
            <div className="form-field">
              <label className="form-label" htmlFor="login-phone">Phone Number</label>
              <input
                id="login-phone"
                type="tel"
                className="input"
                placeholder="+1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={otpSent}
              />
            </div>
            {otpSent && (
              <div className="form-field">
                <label className="form-label" htmlFor="login-otp">Enter OTP</label>
                <input
                  id="login-otp"
                  type="text"
                  className="input"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                />
                <p className="form-hint">Check your phone for the verification code</p>
              </div>
            )}
            <button type="submit" className="btn btn-primary btn-block" disabled={loading} id="phone-submit">
              {loading ? <span className="spinner"></span> : otpSent ? 'Verify OTP' : 'Send OTP'}
            </button>
          </form>
        )}

        <div className="divider">or continue with</div>

        <button className="btn btn-google btn-block" onClick={handleGoogleLogin} id="google-login">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        {/* Demo Mode Quick Access */}
        {isDemoMode && (
          <div style={{
            marginTop: 'var(--space-6)',
            padding: 'var(--space-4)',
            background: 'var(--warm-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--warm-200)',
          }}>
            <p style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)', color: 'var(--warm-600)', marginBottom: 'var(--space-3)', textAlign: 'center' }}>
              🧪 Demo Mode — Quick Access
            </p>
            <div className="flex gap-2">
              <button className="btn btn-primary btn-sm" onClick={() => handleDemoLogin('customer')} style={{ flex: 1, fontSize: 'var(--text-xs)' }}>
                Customer
              </button>
              <button className="btn btn-manager btn-sm" onClick={() => handleDemoLogin('manager')} style={{ flex: 1, fontSize: 'var(--text-xs)' }}>
                Manager
              </button>
              <button className="btn btn-admin btn-sm" onClick={() => handleDemoLogin('admin')} style={{ flex: 1, fontSize: 'var(--text-xs)' }}>
                Admin
              </button>
            </div>
          </div>
        )}

        <div className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
