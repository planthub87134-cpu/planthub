// PlantHub — Mega Footer Component

import React, { useState } from 'react';
import { Link } from 'react-router';

export default function MegaFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer" id="main-footer">
      {/* Main Footer Grid */}
      <div className="footer-grid">
        {/* Brand Column */}
        <div>
          <div className="footer-brand">🌱 PlantHub</div>
          <p className="footer-description">
            Your one-stop shop for beautiful, healthy plants. We bring nature closer
            to you with premium quality plants, expert care guides, and fast delivery.
          </p>
          <div className="footer-social">
            <a href="#" className="footer-social-link" aria-label="Facebook">📘</a>
            <a href="#" className="footer-social-link" aria-label="Instagram">📷</a>
            <a href="#" className="footer-social-link" aria-label="Twitter">🐦</a>
            <a href="#" className="footer-social-link" aria-label="Pinterest">📌</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="footer-heading">Quick Links</h4>
          <div className="footer-links">
            <Link to="/shop" className="footer-link">Shop All Plants</Link>
            <Link to="/shop?category=Indoor" className="footer-link">Indoor Plants</Link>
            <Link to="/shop?category=Succulent" className="footer-link">Succulents</Link>
            <Link to="/shop?category=Herb" className="footer-link">Herbs</Link>
            <Link to="/feedback" className="footer-link">Leave Feedback</Link>
          </div>
        </div>

        {/* Support */}
        <div>
          <h4 className="footer-heading">Support</h4>
          <div className="footer-links">
            <Link to="/contact" className="footer-link">Contact Us</Link>
            <Link to="/orders" className="footer-link">Track Order</Link>
            <Link to="/return-policy" className="footer-link">Returns & Refunds</Link>
            <Link to="/feedback" className="footer-link">Give Feedback</Link>
            <a href="mailto:support@planthub.com" className="footer-link">support@planthub.com</a>
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 className="footer-heading">Legal</h4>
          <div className="footer-links">
            <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
            <Link to="/return-policy" className="footer-link">Return Policy</Link>
            <Link to="/cookie-policy" className="footer-link">Cookie Policy</Link>
            <Link to="/terms-and-conditions" className="footer-link">Terms & Conditions</Link>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="footer-newsletter">
        <div className="footer-newsletter-inner">
          <div className="footer-newsletter-text">
            <h3>🌿 Join the Plant Family</h3>
            <p>Get exclusive deals, care tips, and new arrivals straight to your inbox.</p>
          </div>
          <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              id="newsletter-email"
            />
            <button type="submit" className="btn btn-primary" id="newsletter-subscribe">
              {subscribed ? '✓ Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} PlantHub. All rights reserved. Made with 🌱 for plant lovers.
        </p>
        <div className="footer-bottom-links">
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/terms-and-conditions">Terms</Link>
          <Link to="/cookie-policy">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
