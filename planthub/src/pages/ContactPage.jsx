import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="contact-page container pt-8 pb-16">
      <h1 className="text-center mb-8">Contact Us</h1>
      
      <div className="contact-grid">
        <div className="contact-info card">
          <h2>Get in Touch</h2>
          <p>Have a question or need help? We're here for you.</p>
          
          <div className="info-item">
            <Mail className="icon" />
            <div>
              <strong>Email</strong>
              <p>support@planthub.com</p>
            </div>
          </div>
          
          <div className="info-item">
            <Phone className="icon" />
            <div>
              <strong>Phone</strong>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
          
          <div className="info-item">
            <MapPin className="icon" />
            <div>
              <strong>Address</strong>
              <p>123 Green Street, Botanical District<br/>Cityville, ST 12345</p>
            </div>
          </div>
        </div>

        <div className="contact-form-container card card-glass">
          {sent ? (
            <div className="success-message text-center">
              <h2>Message Sent!</h2>
              <p>We'll get back to you within 24 hours.</p>
              <button onClick={() => setSent(false)} className="btn btn-secondary mt-4">Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Name</label>
                <input required className="input" placeholder="Your Name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" required className="input" placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input required className="input" placeholder="How can we help?" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea required className="input" rows="5" placeholder="Your message..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                <Send size={18} /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
