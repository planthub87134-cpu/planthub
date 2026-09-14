import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      return;
    }
    
    login(formData.email, formData.password).then(({ error }) => {
      if (error) {
        setError(error.message);
      } else {
        // We will just navigate to home (which redirects based on role in App.jsx or DashboardLayout, but for now we'll send to `/` which goes to user dashboard/home, and admin will be able to go to /admin). 
        // Let's redirect to `/` instead of `/admin` unconditionally.
        navigate('/');
      }
    });
  };

  return (
    <div className="auth-page" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--bg-muted)',
      padding: 'var(--space-4)'
    }}>
      <div className="auth-card" style={{ maxWidth: '400px', width: '100%', background: 'var(--bg-card)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
        <div className="auth-header" style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <div className="auth-icon bg-primary-subtle text-primary mx-auto mb-4" style={{ 
            width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' 
          }}>
            <Lock size={32} />
          </div>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>
            Welcome Back
          </h2>
          <p className="text-muted" style={{ color: 'var(--text-muted)' }}>
            Login to your account
          </p>
        </div>
        
        {error && (
          <div className="alert alert-error" style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--danger-50)', color: 'var(--danger-700)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          
          <div className="form-group">
            <label className="form-label" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Email (Gmail)</label>
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <Mail size={20} className="input-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="email" 
                name="email"
                className="form-input" 
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 12px 10px 40px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Password</label>
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <Lock size={20} className="input-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                name="password"
                className="form-input" 
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 12px 10px 40px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 'var(--space-4)', padding: '12px', width: '100%', background: 'var(--primary-600)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 'var(--font-bold)', cursor: 'pointer' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
