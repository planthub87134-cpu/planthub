import React from 'react';
import { Link } from 'react-router';
import { Lock } from 'lucide-react';

export default function LandingPage() {  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className="hero gradient-hero">
        <div className="container">
          <div className="hero-content animate-slide-up" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
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
            <div className="hero-stats" style={{ display: 'flex', gap: '40px', marginTop: '30px', justifyContent: 'center' }}>
              <div className="stagger-item animate-slide-up delay-2">
                <div className="hero-stat-value">10K+</div>
                <div className="hero-stat-label">Plants Delivered</div>
              </div>
              <div className="stagger-item animate-slide-up delay-3">
                <div className="hero-stat-value">5K+</div>
                <div className="hero-stat-label">Happy Customers</div>
              </div>
            </div>
            
            <div style={{ marginTop: '40px', display: 'flex', gap: '16px', justifyContent: 'center' }} className="animate-slide-up delay-4">
              <Link to="/shop" className="btn btn-primary btn-lg hover-scale">Shop Now</Link>
              <Link to="/admin-login" className="btn btn-outline btn-lg hover-scale" style={{ background: 'rgba(255,255,255,0.8)' }}>
                <Lock size={20} style={{ display: 'inline', marginRight: '8px' }} />
                Admin Login
              </Link>
            </div>
          </div>
          <div className="hero-decoration animate-float">🌿</div>
        </div>
      </section>

    </div>
  );
}
