import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { demoLogin, signIn, isDemoMode } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isDemoMode) {
      if (formData.email === 'admin@planthub.com' && formData.password === 'admin123') {
        demoLogin('admin');
        navigate('/admin');
      } else {
        setError('Invalid admin credentials. (Hint: admin@planthub.com / admin123)');
      }
      setLoading(false);
      return;
    }

    const { error: signInError } = await signIn(formData.email, formData.password);
    if (signInError) {
      setError(signInError.message);
    } else {
      navigate('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page gradient-primary">
      {/* Decorative elements */}
      <div className="leaf-pattern leaf-1">🍃</div>
      <div className="leaf-pattern leaf-2">🌿</div>
      <div className="leaf-pattern leaf-3">🌱</div>

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo" style={{ background: 'var(--warm-800)', color: 'white' }}>
            <Shield size={32} />
          </div>
          <h1 className="auth-title">Admin Portal</h1>
          <p className="auth-subtitle">Sign in to access the administrative dashboard</p>
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
          <div className="form-field">
            <label className="form-label">Admin Email</label>
            <div className="input-group" style={{ display: 'flex', alignItems: 'center', background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', padding: '0 12px' }}>
              <Mail size={18} style={{ color: 'var(--gray-400)' }} />
              <input 
                name="email" 
                type="email" 
                placeholder="admin@planthub.com" 
                required 
                className="input" 
                style={{ border: 'none', boxShadow: 'none', flex: 1, padding: '12px', background: 'transparent' }}
                onChange={handleChange} 
              />
            </div>
          </div>
          
          <div className="form-field" style={{ marginBottom: '24px' }}>
            <label className="form-label">Password</label>
            <div className="input-group" style={{ display: 'flex', alignItems: 'center', background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', padding: '0 12px' }}>
              <Lock size={18} style={{ color: 'var(--gray-400)' }} />
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
          
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? <span className="spinner"></span> : 'Access Dashboard'}
          </button>
        </form>
        
        <div className="auth-footer" style={{ marginTop: '24px', textAlign: 'center' }}>
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ color: 'var(--gray-600)', fontWeight: '500', textDecoration: 'none' }}>
            ← Return to Store
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
