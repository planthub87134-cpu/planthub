import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, User, Phone, ShieldCheck } from 'lucide-react';

export default function AuthGate({ children }) {
  const { user, register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreed: false
  });
  
  const [error, setError] = useState('');
  
  // If user exists (is logged in), render the actual app
  if (user) {
    return children;
  }
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validations
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (!formData.agreed) {
      setError('You must agree to the Privacy Policy and Terms & Conditions.');
      return;
    }
    
    // Register the user
    register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password // storing locally for demo
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
      <div className="auth-card" style={{ maxWidth: '500px', width: '100%', background: 'var(--bg-card)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
        <div className="auth-header" style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <div className="auth-icon bg-primary-subtle text-primary mx-auto mb-4" style={{ 
            width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' 
          }}>
            <ShieldCheck size={32} />
          </div>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', marginBottom: 'var(--space-2)' }}>Create Your Account</h2>
          <p className="text-muted" style={{ color: 'var(--text-muted)' }}>You must register to access PlantHub</p>
        </div>
        
        {error && (
          <div className="alert alert-error" style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--danger-50)', color: 'var(--danger-700)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="form-group">
            <label className="form-label" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Full Name</label>
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <User size={20} className="input-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                name="name"
                className="form-input" 
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 12px 10px 40px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Email (Gmail)</label>
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <Mail size={20} className="input-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="email" 
                name="email"
                className="form-input" 
                placeholder="you@gmail.com"
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 12px 10px 40px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Mobile Number</label>
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <Phone size={20} className="input-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="tel" 
                name="phone"
                className="form-input" 
                placeholder="+91 9876543210"
                value={formData.phone}
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
          
          <div className="form-group">
            <label className="form-label" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Confirm Password</label>
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <Lock size={20} className="input-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                name="confirmPassword"
                className="form-input" 
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 12px 10px 40px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}
              />
            </div>
          </div>
          
          <div className="form-group" style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
            <input 
              type="checkbox" 
              name="agreed"
              id="agreed"
              checked={formData.agreed}
              onChange={handleChange}
              style={{ marginTop: '4px' }}
            />
            <label htmlFor="agreed" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', cursor: 'pointer', lineHeight: '1.5' }}>
              I agree to the <strong>Privacy Policy</strong> and <strong>Terms & Conditions</strong>.
            </label>
          </div>
          
          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 'var(--space-4)', padding: '12px', width: '100%', background: 'var(--primary-600)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 'var(--font-bold)', cursor: 'pointer' }}>
            Register & Continue
          </button>
        </form>
      </div>
    </div>
  );
}
