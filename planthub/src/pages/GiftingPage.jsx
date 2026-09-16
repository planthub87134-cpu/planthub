import React from 'react';
import { Gift, Briefcase, Sparkles, MessageSquare, Package, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export default function GiftingPage() {
  return (
    <div className="page-enter">
      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, #fdf4ff, #fae8ff)', color: 'var(--primary-900)', padding: 'var(--space-16) 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '10%', fontSize: '8rem', opacity: 0.1, transform: 'rotate(15deg)' }}>🎁</div>
        <div style={{ position: 'absolute', bottom: '-10%', left: '5%', fontSize: '6rem', opacity: 0.1, transform: 'rotate(-15deg)' }}>✨</div>
        
        <div className="container" style={{ maxWidth: '800px', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'inline-flex', padding: '16px', background: 'white', borderRadius: '50%', marginBottom: 'var(--space-4)', boxShadow: 'var(--shadow-md)' }}>
            <Gift size={40} className="text-primary-600" />
          </div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: 'var(--space-4)', color: 'var(--primary-900)' }}>Give the Gift of Green</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: 'var(--space-8)' }}>
            Whether it's for Diwali, a birthday, or corporate partners, plants make the perfect sustainable and memorable gift. Customize your packaging and add a personal touch.
          </p>
          <a href="#bulk-inquiry" className="btn btn-primary btn-lg hover-scale">Inquire for Bulk Orders <ArrowRight size={20} /></a>
        </div>
      </div>

      <div className="container" style={{ padding: 'var(--space-16) 0' }}>
        
        {/* Features Section */}
        <div className="grid grid-3" style={{ gap: 'var(--space-8)', marginBottom: 'var(--space-16)' }}>
          <div className="card text-center hover-lift" style={{ borderTop: '4px solid #f59e0b' }}>
            <div style={{ display: 'inline-flex', padding: '16px', background: '#fef3c7', color: '#f59e0b', borderRadius: '50%', marginBottom: 'var(--space-4)' }}>
              <Sparkles size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>Festive Gifting</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Make this Diwali eco-friendly! Special festive packaging with diyas and customized greeting cards.</p>
          </div>

          <div className="card text-center hover-lift" style={{ borderTop: '4px solid var(--primary-500)' }}>
            <div style={{ display: 'inline-flex', padding: '16px', background: 'var(--primary-50)', color: 'var(--primary-600)', borderRadius: '50%', marginBottom: 'var(--space-4)' }}>
              <Briefcase size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>Corporate Gifting</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Impress clients and employees. We can print your company logo directly on the ceramic pots!</p>
          </div>

          <div className="card text-center hover-lift" style={{ borderTop: '4px solid #ec4899' }}>
            <div style={{ display: 'inline-flex', padding: '16px', background: '#fdf2f8', color: '#ec4899', borderRadius: '50%', marginBottom: 'var(--space-4)' }}>
              <Gift size={32} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>Birthdays & Events</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Return gifts for parties and weddings. Add personalized tags and choose from a variety of mini succulents.</p>
          </div>
        </div>

        {/* Customization Details */}
        <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-12)', marginBottom: 'var(--space-16)' }}>
          <div className="grid grid-2 items-center" style={{ gap: 'var(--space-12)' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-6)' }}>The Perfect Presentation</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'white', padding: '8px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
                    <Package className="text-primary-600" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Premium Gift Wrapping</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Elegant jute bags, satin ribbons, or customized cardboard boxes.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'white', padding: '8px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
                    <MessageSquare className="text-primary-600" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Custom Message Cards</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Include a handwritten or beautifully printed note with every plant.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'white', padding: '8px', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
                    <Star className="text-primary-600" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Brand Customization</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>For bulk orders, we laser engrave or print your logo directly on the planters.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
              <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800" alt="Gift Plants" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* Contact Form for Bulk Orders */}
        <div id="bulk-inquiry" className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: 'var(--space-8)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>Request a Bulk Quote</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Planning a corporate event or need more than 20 plants? Fill this out and we'll get back to you with special pricing.</p>
          </div>
          
          <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert("Quote request sent successfully! We will contact you shortly."); }}>
            <div className="grid grid-2 gap-4">
              <div className="form-field">
                <label className="form-label">Full Name</label>
                <input type="text" className="input" placeholder="Your name" required />
              </div>
              <div className="form-field">
                <label className="form-label">Company (Optional)</label>
                <input type="text" className="input" placeholder="Company name" />
              </div>
            </div>
            
            <div className="grid grid-2 gap-4">
              <div className="form-field">
                <label className="form-label">Email Address</label>
                <input type="email" className="input" placeholder="john@example.com" required />
              </div>
              <div className="form-field">
                <label className="form-label">Phone Number</label>
                <input type="tel" className="input" placeholder="+91 xxxxx xxxxx" required />
              </div>
            </div>
            
            <div className="form-field">
              <label className="form-label">Event Type & Requirements</label>
              <textarea className="input textarea" placeholder="Tell us about the occasion, estimated quantity, and if you need logo printing..." required></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: 'var(--space-2)' }}>
              Submit Request
            </button>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 'var(--space-4)' }}>
              Or chat with us directly via the WhatsApp button!
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
