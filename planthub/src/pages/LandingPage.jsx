import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { PRODUCTS, FEATURES, TESTIMONIALS } from '../utils/constants';
import { formatCurrency } from '../utils/formatters';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock } from 'lucide-react';

export default function LandingPage() {
  const featuredProducts = PRODUCTS.slice(0, 4);
  const navigate = useNavigate();
  const { signIn, isDemoMode, demoLogin } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuickLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isDemoMode) {
      if (email && password) {
        demoLogin('customer');
        navigate('/shop');
      } else {
        setError('Please enter email and password');
      }
      setLoading(false);
      return;
    }

    const { error: signInError } = await signIn(email, password);
    if (signInError) {
      setError(signInError.message);
    } else {
      navigate('/shop');
    }
    setLoading(false);
  };

  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className="hero gradient-hero">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center', gap: '40px' }}>
            {/* Hero Text */}
            <div className="hero-content animate-slide-up" style={{ textAlign: 'left', maxWidth: '100%' }}>
              <div className="hero-badge" style={{ display: 'inline-block' }}>
                🌿 Premium Quality Plants — Free shipping over $50
              </div>
              <h1 className="hero-title" style={{ fontSize: '3rem', marginTop: '20px' }}>
                Bring Nature
                <span className="gradient-text"> Into Your Home</span>
              </h1>
              <p className="hero-subtitle" style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
                Discover our curated collection of premium indoor plants, succulents, and herbs.
                Delivered fresh to your doorstep with expert care guides.
              </p>
              <div className="hero-stats" style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div className="stagger-item animate-slide-up delay-2">
                  <div className="hero-stat-value">10K+</div>
                  <div className="hero-stat-label">Plants Delivered</div>
                </div>
                <div className="stagger-item animate-slide-up delay-3">
                  <div className="hero-stat-value">5K+</div>
                  <div className="hero-stat-label">Happy Customers</div>
                </div>
              </div>
            </div>

            {/* Quick Login Form */}
            <div className="hero-login-card card animate-slide-up delay-2" style={{ padding: '30px', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: 'var(--warm-900)' }}>Quick Access</h3>
              <p style={{ color: 'var(--gray-600)', marginBottom: '20px' }}>Sign in to continue your plant journey.</p>
              
              {error && <div style={{ color: '#991b1b', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '0.9rem' }}>{error}</div>}

              <form onSubmit={handleQuickLogin}>
                <div className="form-field" style={{ marginBottom: '15px' }}>
                  <label className="form-label">Email Address</label>
                  <div className="input-group" style={{ display: 'flex', alignItems: 'center', background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', padding: '0 12px' }}>
                    <Mail size={18} style={{ color: 'var(--gray-400)' }} />
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ border: 'none', boxShadow: 'none', flex: 1, padding: '12px', background: 'transparent', outline: 'none' }}
                    />
                  </div>
                </div>
                
                <div className="form-field" style={{ marginBottom: '20px' }}>
                  <label className="form-label">Password</label>
                  <div className="input-group" style={{ display: 'flex', alignItems: 'center', background: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', padding: '0 12px' }}>
                    <Lock size={18} style={{ color: 'var(--gray-400)' }} />
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      required 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ border: 'none', boxShadow: 'none', flex: 1, padding: '12px', background: 'transparent', outline: 'none' }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" disabled={loading} style={{ width: '100%', marginBottom: '15px' }}>
                  {loading ? <span className="spinner"></span> : 'Sign In Now'}
                </button>
              </form>

              <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--gray-600)' }}>
                Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Sign up</Link>
              </div>
            </div>
          </div>
          <div className="hero-decoration animate-float">🌿</div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section" id="featured-products">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Our Collection</p>
            <h2 className="section-title">Featured Plants</h2>
            <p className="section-subtitle">
              Hand-picked favorites that our customers love the most.
            </p>
          </div>

          <div className="grid grid-4" style={{ gap: 'var(--space-6)' }}>
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`product-card stagger-item animate-slide-up delay-${index + 1}`}
              >
                <div className="product-card-image">
                  {product.image}
                  {product.stock < 10 && (
                    <div className="product-card-badge">
                      <span className="badge badge-solid-warning">Low Stock</span>
                    </div>
                  )}
                </div>
                <div className="product-card-body">
                  <p className="product-card-category">{product.category}</p>
                  <h3 className="product-card-name">{product.name}</h3>
                  <p className="product-card-desc">{product.description}</p>
                  <div className="product-card-footer">
                    <span className="product-card-price">{formatCurrency(product.price)}</span>
                    <Link to="/shop" className="btn btn-primary btn-sm">View</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-10)' }}>
            <Link to="/shop" className="btn btn-secondary btn-lg" id="view-all-plants">
              View All Plants →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }} id="features">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Why PlantHub</p>
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">
              We go above and beyond to ensure your plant shopping experience is exceptional.
            </p>
          </div>

          <div className="grid grid-3" style={{ gap: 'var(--space-6)' }}>
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className={`feature-card stagger-item animate-slide-up delay-${index + 1}`}
              >
                <div className="feature-card-icon">{feature.icon}</div>
                <h3 className="feature-card-title">{feature.title}</h3>
                <p className="feature-card-text">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" id="testimonials">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Testimonials</p>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">
              Join thousands of happy plant parents who love PlantHub.
            </p>
          </div>

          <div className="grid grid-3" style={{ gap: 'var(--space-6)' }}>
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className={`testimonial-card stagger-item animate-slide-up delay-${index + 1}`}>
                <div style={{ color: 'var(--warm-400)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
                  ★★★★★
                </div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-author">
                  <div className="avatar">{testimonial.avatar}</div>
                  <div>
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2 className="cta-banner-title">Ready to Go Green?</h2>
            <p className="cta-banner-text">
              Start your plant journey today and enjoy 15% off your first order.
            </p>
            <Link to="/shop" className="btn btn-lg" id="cta-shop">
              Shop Now →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
