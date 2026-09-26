import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Store, User, Mail, Phone, Lock, Briefcase } from 'lucide-react';
import { useNavigate, Navigate } from 'react-router';
import { Link } from 'react-router';

export default function SellerSignupPage() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    storeName: '',
    email: '',
    phone: '',
    gstId: '',
    password: '',
    confirmPassword: '',
    agreed: false
  });
  
  const [error, setError] = useState('');
  
  // If user exists (is logged in), redirect to home
  if (user) {
    return <Navigate to="/" replace />;
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
    if (!formData.name || !formData.storeName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all mandatory fields.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (!formData.agreed) {
      setError('You must agree to the Seller Terms & Conditions.');
      return;
    }
    
    // Register the seller user
    register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: 'manager' // We map seller to manager role in this system so they can access the manager dashboard
    }).then(({ error }) => {
      if (error) {
        setError(error.message);
      } else {
        navigate('/manager'); // Redirect to manager dashboard which acts as the seller portal
      }
    });
  };

  return (
    <div className="auth-page" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--bg-muted), #e0f2fe)',
      padding: 'var(--space-8) var(--space-4)'
    }}>
      <div className="auth-card" style={{ maxWidth: '600px', width: '100%', background: 'var(--bg-card)', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
        <div className="auth-header" style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <div className="auth-icon mx-auto mb-4" style={{ 
            width: '72px', height: '72px', borderRadius: '50%', background: '#0284c7', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' 
          }}>
            <Store size={36} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0369a1', marginBottom: 'var(--space-2)' }}>
            Become a Seller
          </h2>
          <p className="text-muted" style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
            Start selling your plants to thousands of customers
          </p>
        </div>
        
        {error && (
          <div className="alert alert-error" style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--danger-50)', color: 'var(--danger-700)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Store / Business Name *</label>
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <Store size={20} className="input-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                name="storeName"
                className="form-input" 
                placeholder="Green Earth Nursery"
                value={formData.storeName}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 12px 10px 40px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Full Name *</label>
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
            <label className="form-label" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>GST/Tax ID (Optional)</label>
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <Briefcase size={20} className="input-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                name="gstId"
                className="form-input" 
                placeholder="22AAAAA0000A1Z5"
                value={formData.gstId}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 12px 10px 40px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Business Email *</label>
            <div className="input-with-icon" style={{ position: 'relative' }}>
              <Mail size={20} className="input-icon" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="email" 
                name="email"
                className="form-input" 
                placeholder="contact@nursery.com"
                value={formData.email}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px 12px 10px 40px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Mobile Number *</label>
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
            <label className="form-label" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Password *</label>
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
            <label className="form-label" style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Confirm Password *</label>
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
          
          <div className="form-group" style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
            <input 
              type="checkbox" 
              name="agreed"
              id="agreed"
              checked={formData.agreed}
              onChange={handleChange}
              style={{ marginTop: '4px' }}
            />
            <label htmlFor="agreed" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', cursor: 'pointer', lineHeight: '1.5' }}>
              I agree to the <strong>Seller Policy</strong>, <strong>Commission Agreement</strong> and <strong>Terms & Conditions</strong>.
            </label>
          </div>
          
          <div style={{ gridColumn: '1 / -1', marginTop: 'var(--space-4)' }}>
            <button type="submit" className="btn btn-primary btn-block" style={{ padding: '14px', width: '100%', background: '#0284c7', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 'var(--font-bold)', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(2, 132, 199, 0.4)' }}>
              Open Seller Account
            </button>
          </div>

          <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Already selling with us? </span>
            <Link to="/login" style={{ color: '#0369a1', fontWeight: 'var(--font-bold)', textDecoration: 'none' }}>Login to Seller Dashboard</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
