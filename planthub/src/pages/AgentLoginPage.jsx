import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Headset, Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AgentLoginPage = () => {
  const navigate = useNavigate();
  const { signIn, isDemoMode } = useAuth();
  const [formData, setFormData] = useState({ 
    email: isDemoMode ? 'agent@planthub.com' : '', 
    password: isDemoMode ? 'agent123' : '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: signInError } = await signIn(formData.email, formData.password);
    if (signInError) {
      setError(signInError.message || 'Invalid agent credentials.');
    } else {
      const role = data?.user?.role || data?.user?.user_metadata?.role;
      if (role !== 'agent') {
        setError('Access denied. Agent privileges required.');
      } else {
        navigate('/agent');
      }
    }
    setLoading(false);
  };

  return (
    <div className="auth-page gradient-primary">
      <div className="leaf-pattern leaf-1">🍃</div>
      <div className="leaf-pattern leaf-2">🌿</div>
      <div className="leaf-pattern leaf-3">🌱</div>

      <div className="auth-card card-glass animate-scale-in" style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-2xl)', border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255, 255, 255, 0.85)' }}>
        <div className="auth-header animate-slide-up delay-1">
          <div className="auth-logo hover-scale" style={{ background: 'linear-gradient(135deg, var(--warning-500), var(--warning-600))', color: 'white', padding: '16px', borderRadius: 'var(--radius-xl)', boxShadow: '0 8px 16px rgba(245, 158, 11, 0.3)' }}>
            <Headset size={36} />
          </div>
          <h1 className="auth-title" style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-3xl)' }}>Agent Portal</h1>
          <p className="auth-subtitle" style={{ color: 'var(--text-secondary)' }}>Sign in to access the support dashboard</p>
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
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field animate-slide-up delay-2">
            <label className="form-label">Agent Email</label>
            <div className="input-group hover-glow" style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.9)', border: '2px solid var(--border-light)', borderRadius: 'var(--radius-xl)', padding: '4px 12px', transition: 'all var(--transition-base)' }}>
              <Mail size={20} style={{ color: 'var(--warning-400)' }} />
              <input 
                name="email" 
                type="email" 
                placeholder="agent@planthub.com" 
                required 
                className="input" 
                style={{ border: 'none', boxShadow: 'none', flex: 1, padding: '12px', background: 'transparent' }}
                onChange={handleChange} 
              />
            </div>
          </div>
          
          <div className="form-field animate-slide-up delay-3" style={{ marginBottom: '24px' }}>
            <label className="form-label">Password</label>
            <div className="input-group hover-glow" style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.9)', border: '2px solid var(--border-light)', borderRadius: 'var(--radius-xl)', padding: '4px 12px', transition: 'all var(--transition-base)' }}>
              <Lock size={20} style={{ color: 'var(--warning-400)' }} />
              <input 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                className="input" 
                style={{ border: 'none', boxShadow: 'none', flex: 1, padding: '12px', background: 'transparent' }}
                onChange={handleChange} 
              />
            </div>
          </div>
          
          <button type="submit" className="btn btn-warning btn-block animate-slide-up delay-4" disabled={loading} style={{ borderRadius: 'var(--radius-xl)', padding: '16px' }}>
            {loading ? <span className="spinner"></span> : 'Secure Login'}
          </button>
        </form>
        
        <div className="auth-footer animate-fade-in delay-5" style={{ marginTop: '28px', textAlign: 'center' }}>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ color: 'var(--warning-600)', fontWeight: '600', textDecoration: 'none', display: 'inline-block', transition: 'transform var(--transition-fast)' }} className="hover-scale">
            ← Return to Store
          </a>
        </div>
      </div>
    </div>
  );
};

export default AgentLoginPage;
