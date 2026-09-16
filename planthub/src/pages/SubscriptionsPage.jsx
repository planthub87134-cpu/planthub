import React, { useState } from 'react';
import { Link } from 'react-router';
import { PackageOpen, Leaf, CheckCircle2, Sprout, ShieldCheck, Truck, ArrowRight, Star } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export default function SubscriptionsPage() {
  const { addToCart } = useCart();
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubscribe = (planName, price) => {
    addToCart({
      id: `sub-${planName.toLowerCase().replace(/\s+/g, '-')}`,
      name: `Subscription: ${planName}`,
      price: price,
      image: "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&q=80&w=400",
      description: "Monthly Auto-Renewal Subscription",
      stock: 999,
      category: "Subscription"
    });
    setSuccessMsg(`Successfully added ${planName} to your cart!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="page-enter">
      {/* Toast Notification */}
      {successMsg && (
        <div className="toast toast-success" style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}>
          {successMsg}
        </div>
      )}

      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, var(--primary-900), var(--primary-700))', color: 'white', padding: 'var(--space-12) 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', padding: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', marginBottom: 'var(--space-4)' }}>
            <PackageOpen size={40} color="white" />
          </div>
          <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>Greenera Subscriptions</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--primary-100)', lineHeight: '1.6' }}>
            Elevate your plant parenting journey. Get premium care essentials or rare exotic plants delivered to your doorstep every single month. Pause or cancel anytime.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 10, paddingBottom: 'var(--space-16)' }}>
        <div className="grid grid-2" style={{ gap: 'var(--space-8)', maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Plan 1: The Care Kit Box */}
          <div className="card hover-lift" style={{ display: 'flex', flexDirection: 'column', border: '2px solid var(--border-light)' }}>
            <div style={{ height: '200px', overflow: 'hidden', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', margin: 'calc(var(--space-6) * -1) calc(var(--space-6) * -1) var(--space-6) calc(var(--space-6) * -1)' }}>
              <img 
                src="https://images.unsplash.com/photo-1416879598555-39281a8c3d31?auto=format&fit=crop&q=80&w=800" 
                alt="Plant Care Kit" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
                <Sprout size={24} className="text-primary-600" />
                <h2 style={{ fontSize: '1.8rem', margin: 0 }}>The Care Kit Box</h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                Everything your plants need to thrive, delivered monthly. Perfect for beginners and experts alike.
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: 'var(--space-6)' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>₹499</span>
                <span style={{ color: 'var(--text-muted)' }}>/ month</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-8) 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <CheckCircle2 className="text-primary-500" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Premium nutrient-rich potting soil (2kg)</span>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <CheckCircle2 className="text-primary-500" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Organic liquid fertilizer (100ml)</span>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <CheckCircle2 className="text-primary-500" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Neem oil natural pesticide spray</span>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <CheckCircle2 className="text-primary-500" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Monthly seasonal care guide</span>
                </li>
              </ul>
            </div>
            <button 
              className="btn btn-outline btn-lg" 
              style={{ width: '100%', borderWidth: '2px' }}
              onClick={() => handleSubscribe('Care Kit Box', 499)}
            >
              Subscribe to Care Kit
            </button>
          </div>

          {/* Plan 2: Plant of the Month Club */}
          <div className="card hover-lift" style={{ display: 'flex', flexDirection: 'column', border: '2px solid var(--primary-500)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary-500)', color: 'white', padding: '4px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem', zIndex: 1, boxShadow: 'var(--shadow-md)' }}>
              Most Popular
            </div>
            <div style={{ height: '200px', overflow: 'hidden', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', margin: 'calc(var(--space-6) * -1) calc(var(--space-6) * -1) var(--space-6) calc(var(--space-6) * -1)' }}>
              <img 
                src="https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?auto=format&fit=crop&q=80&w=800" 
                alt="Rare Plant" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
                <Leaf size={24} className="text-primary-600" />
                <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Plant of the Month</h2>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                Build your indoor jungle effortlessly. Receive a rare, hand-picked exotic plant every month.
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: 'var(--space-6)' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>₹999</span>
                <span style={{ color: 'var(--text-muted)' }}>/ month</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-8) 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <CheckCircle2 className="text-primary-500" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>1 Rare/Exotic Indoor Plant in a premium pot</span>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <CheckCircle2 className="text-primary-500" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Guaranteed safe delivery & replacement</span>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <CheckCircle2 className="text-primary-500" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Detailed care card specifically for that plant</span>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <CheckCircle2 className="text-primary-500" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Exclusive access to the Plant Doctor AI</span>
                </li>
              </ul>
            </div>
            <button 
              className="btn btn-primary btn-lg" 
              style={{ width: '100%' }}
              onClick={() => handleSubscribe('Plant of the Month', 999)}
            >
              Subscribe to Plant Club
            </button>
          </div>

        </div>

        {/* Info Section */}
        <div style={{ marginTop: 'var(--space-16)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-12)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: 'var(--space-8)' }}>How It Works</h2>
          <div className="grid grid-3" style={{ gap: 'var(--space-6)', textAlign: 'left' }}>
            <div className="card" style={{ background: 'white' }}>
              <div style={{ display: 'inline-flex', padding: '12px', background: 'var(--primary-50)', borderRadius: '50%', color: 'var(--primary-600)', marginBottom: 'var(--space-4)' }}>
                <Star size={24} />
              </div>
              <h3>1. Choose Your Plan</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Select the subscription that fits your needs. You can switch plans or add multiple subscriptions to your account.</p>
            </div>
            <div className="card" style={{ background: 'white' }}>
              <div style={{ display: 'inline-flex', padding: '12px', background: 'var(--primary-50)', borderRadius: '50%', color: 'var(--primary-600)', marginBottom: 'var(--space-4)' }}>
                <Truck size={24} />
              </div>
              <h3>2. Monthly Delivery</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Your box ships on the 5th of every month. Enjoy unboxing your new plant or fresh supplies right at your door.</p>
            </div>
            <div className="card" style={{ background: 'white' }}>
              <div style={{ display: 'inline-flex', padding: '12px', background: 'var(--primary-50)', borderRadius: '50%', color: 'var(--primary-600)', marginBottom: 'var(--space-4)' }}>
                <ShieldCheck size={24} />
              </div>
              <h3>3. Complete Flexibility</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Going on vacation? Pause your subscription anytime. Cancel hassle-free from your dashboard with no hidden fees.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
