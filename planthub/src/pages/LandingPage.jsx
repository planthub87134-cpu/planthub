import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { PRODUCTS, FEATURES, TESTIMONIALS } from '../utils/constants';
import { formatCurrency } from '../utils/formatters';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock } from 'lucide-react';

export default function LandingPage() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };
  const featuredProducts = PRODUCTS.slice(0, 4);
  const trendingProducts = PRODUCTS.slice(4, 8);
  const navigate = useNavigate();
  const { isDemoMode } = useAuth();



  return (
    <div className="page-enter">
      {/* Promotional Banner */}
      <div style={{ background: 'linear-gradient(90deg, #0d9488, #0f766e)', color: 'white', padding: '12px 20px', textAlign: 'center', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
        <span>❄️ Winter Special: Get up to 30% Off on all Indoor Plants! Use code <strong>WINTER30</strong></span>
        <Link to="/shop" className="btn btn-sm hover-scale" style={{ background: 'white', color: '#0f766e', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', border: 'none', fontWeight: 'bold' }}>Claim Offer</Link>
      </div>

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
              <Link to="/login" className="btn btn-outline btn-lg hover-scale" style={{ background: 'rgba(255,255,255,0.8)' }}>
                <Lock size={20} style={{ display: 'inline', marginRight: '8px' }} />
                Login
              </Link>
            </div>
          </div>
          <div className="hero-decoration animate-float">🌿</div>
        </div>
      </section>

      {/* Winter Special Promo Section */}
      <section className="section" style={{ padding: 'var(--space-8) 0' }}>
        <div className="container">
          <div style={{ background: 'linear-gradient(135deg, #e0f2fe, #bae6fd)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-10)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-8)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ flex: '1 1 400px', position: 'relative', zIndex: 1 }}>
              <div className="badge" style={{ background: '#0284c7', color: 'white', marginBottom: 'var(--space-4)', display: 'inline-block' }}>Limited Time Offer</div>
              <h2 style={{ fontSize: '2.5rem', color: '#0369a1', marginBottom: 'var(--space-4)', fontWeight: '800' }}>Winter Plant Sale ❄️</h2>
              <p style={{ fontSize: '1.2rem', color: '#0c4a6e', marginBottom: 'var(--space-6)', lineHeight: '1.6' }}>
                Bring life to your indoor spaces this winter. Enjoy a flat <strong>30% discount</strong> on our exclusive collection of indoor and air-purifying plants.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                <Link to="/shop" className="btn btn-lg hover-scale" style={{ background: '#0284c7', color: 'white', border: 'none', boxShadow: '0 4px 14px 0 rgba(2, 132, 199, 0.39)' }}>Shop Winter Collection</Link>
              </div>
            </div>
            <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
              <img src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600" alt="Winter Plants" style={{ borderRadius: 'var(--radius-xl)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)', maxWidth: '100%', height: 'auto', objectFit: 'cover', transform: 'rotate(2deg)' }} />
            </div>
            {/* Decorative background elements */}
            <div style={{ position: 'absolute', top: '-10%', right: '-5%', fontSize: '15rem', opacity: 0.1, zIndex: 0, pointerEvents: 'none' }}>❄️</div>
            <div style={{ position: 'absolute', bottom: '-20%', left: '10%', fontSize: '10rem', opacity: 0.05, zIndex: 0, pointerEvents: 'none' }}>🌿</div>
          </div>
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
                className={`product-card stagger-item animate-slide-up delay-${index + 1} hover-lift`}
                style={{ transition: 'all 0.3s ease', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-light)', background: 'var(--bg-primary)' }}
              >
                <div className="product-card-image" style={{ position: 'relative', overflow: 'hidden' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
                  {product.stock < 10 && (
                    <div className="product-card-badge">
                      <span className="badge badge-solid-warning">Low Stock</span>
                    </div>
                  )}
                </div>
                <div className="product-card-body" style={{ padding: 'var(--space-4)' }}>
                  <p className="product-card-category" style={{ fontSize: 'var(--text-xs)', color: 'var(--primary-600)', fontWeight: 'var(--font-bold)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-1)' }}>{product.category}</p>
                  <h3 className="product-card-name" style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>{product.name}</h3>
                  <p className="product-card-desc" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.description}</p>
                  <div className="product-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-3)' }}>
                    <span className="product-card-price" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)' }}>{formatCurrency(product.price)}</span>
                    <Link to="/shop" className="btn btn-primary btn-sm hover-scale">View</Link>
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

      {/* Trending / Best Sellers Products */}
      <section className="section" id="trending-products">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Most Popular</p>
            <h2 className="section-title">Best Sellers & Trending</h2>
            <p className="section-subtitle">
              The plants everyone is talking about. Get them before they're gone!
            </p>
          </div>

          <div className="grid grid-4" style={{ gap: 'var(--space-6)' }}>
            {trendingProducts.map((product, index) => (
              <div
                key={`trending-${product.id}`}
                className={`product-card stagger-item animate-slide-up delay-${index + 1} hover-lift`}
                style={{ transition: 'all 0.3s ease', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-light)', background: 'var(--bg-primary)' }}
              >
                <div className="product-card-image" style={{ position: 'relative', overflow: 'hidden' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
                  <div className="product-card-badge" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    <span className="badge badge-solid-danger" style={{ background: '#ef4444', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>🔥 Hot Selling</span>
                  </div>
                </div>
                <div className="product-card-body" style={{ padding: 'var(--space-4)' }}>
                  <p className="product-card-category" style={{ fontSize: 'var(--text-xs)', color: 'var(--primary-600)', fontWeight: 'var(--font-bold)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-1)' }}>{product.category}</p>
                  <h3 className="product-card-name" style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>{product.name}</h3>
                  <p className="product-card-desc" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.description}</p>
                  <div className="product-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-3)' }}>
                    <span className="product-card-price" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)' }}>{formatCurrency(product.price)}</span>
                    <Link to="/shop" className="btn btn-primary btn-sm hover-scale">View</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-10)' }}>
            <Link to="/shop?sort=popular" className="btn btn-secondary btn-lg" id="view-trending">
              Explore More Best Sellers →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }} id="features">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Why Greenera Foundation</p>
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
              Join thousands of happy plant parents who love Greenera Foundation.
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

      {/* Newsletter Section */}
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--primary-900), var(--gray-900))', color: 'white' }}>
        <div className="container">
          <div className="grid grid-2 items-center" style={{ gap: 'var(--space-10)' }}>
            <div className="animate-slide-right">
              <h2 className="section-title" style={{ color: 'white', marginBottom: 'var(--space-4)' }}>Join Our Green Community</h2>
              <p className="section-subtitle" style={{ color: 'var(--primary-100)', marginBottom: '0' }}>
                Subscribe to our newsletter for exclusive plant care tips, new arrival updates, and 15% off your first order.
              </p>
            </div>
            <div className="animate-slide-left">
              {subscribed ? (
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
                  <h3 style={{ color: 'var(--success)', marginBottom: 'var(--space-2)' }}>Thanks for subscribing!</h3>
                  <p style={{ margin: 0 }}>Check your email for the 15% off coupon.</p>
                </div>
              ) : (
                <form className="flex gap-2" onSubmit={handleSubscribe} style={{ background: 'rgba(255,255,255,0.1)', padding: 'var(--space-2)', borderRadius: 'var(--radius-full)', backdropFilter: 'blur(10px)' }}>
                  <input 
                    type="email" 
                    placeholder="Enter your email address..." 
                    className="input" 
                    style={{ flex: 1, border: 'none', background: 'transparent', color: 'white', paddingLeft: 'var(--space-4)' }}
                    required
                  />
                  <button type="submit" className="btn btn-primary hover-scale" style={{ borderRadius: 'var(--radius-full)' }}>
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-banner" style={{ background: 'linear-gradient(135deg, var(--primary-50), var(--accent-50))', padding: 'var(--space-12)', borderRadius: 'var(--radius-2xl)', textAlign: 'center', border: '1px solid var(--primary-200)', position: 'relative', overflow: 'hidden' }}>
            <div className="leaf-pattern leaf-1" style={{ opacity: 0.1, zIndex: 0 }}>🌿</div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 className="cta-banner-title" style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>Ready to Go Green?</h2>
              <p className="cta-banner-text" style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', maxWidth: '600px', margin: '0 auto var(--space-6)' }}>
                Start your plant journey today. We have everything you need to build your perfect indoor jungle.
              </p>
              <Link to="/shop" className="btn btn-primary btn-lg hover-scale hover-glow" id="cta-shop">
                Shop Our Collection →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
