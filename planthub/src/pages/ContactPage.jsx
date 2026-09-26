import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DEFAULT_CONTACT_INFO = {
  subtitle: "Have a question or need help? We're here for you.",
  email: "support@planthub.com",
  phone: "+1 (555) 123-4567",
  address: "123 Green Street, Botanical District\nCityville, ST 12345"
};

const ContactPage = () => {
  const { user } = useAuth();
  const [sent, setSent] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [contactInfo, setContactInfo] = useState(DEFAULT_CONTACT_INFO);
  const [editForm, setEditForm] = useState(DEFAULT_CONTACT_INFO);

  useEffect(() => {
    // Load from local storage or database
    const saved = localStorage.getItem('planthub_contact_info');
    if (saved) {
      setContactInfo(JSON.parse(saved));
      setEditForm(JSON.parse(saved));
    }
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveInfo = () => {
    setContactInfo(editForm);
    localStorage.setItem('planthub_contact_info', JSON.stringify(editForm));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm(contactInfo);
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="contact-page container pt-8 pb-16">
      <h1 className="text-center mb-8">Contact Us</h1>
      
      <div className="contact-grid">
        <div className="contact-info card" style={{ position: 'relative' }}>
          {isAdmin && !isEditing && (
            <button 
              onClick={() => setIsEditing(true)} 
              className="btn btn-ghost" 
              style={{ position: 'absolute', top: '10px', right: '10px', padding: '8px' }}
              title="Edit Contact Info (Admin Only)"
            >
              <Edit2 size={18} />
            </button>
          )}

          <h2>Get in Touch</h2>
          
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              <input 
                name="subtitle" 
                value={editForm.subtitle} 
                onChange={handleEditChange} 
                className="input" 
                placeholder="Subtitle" 
              />
              <div className="info-item">
                <Mail className="icon" />
                <input name="email" value={editForm.email} onChange={handleEditChange} className="input" placeholder="Email" />
              </div>
              <div className="info-item">
                <Phone className="icon" />
                <input name="phone" value={editForm.phone} onChange={handleEditChange} className="input" placeholder="Phone" />
              </div>
              <div className="info-item">
                <MapPin className="icon" />
                <textarea name="address" value={editForm.address} onChange={handleEditChange} className="input" rows="2" placeholder="Address" />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={handleSaveInfo} className="btn btn-primary" style={{ flex: 1 }}><Save size={16} style={{ marginRight: '5px' }} /> Save</button>
                <button onClick={handleCancelEdit} className="btn btn-secondary"><X size={16} /></button>
              </div>
            </div>
          ) : (
            <>
              <p>{contactInfo.subtitle}</p>
              
              <div className="info-item">
                <Mail className="icon" />
                <div>
                  <strong>Email</strong>
                  <p>{contactInfo.email}</p>
                </div>
              </div>
              
              <div className="info-item">
                <Phone className="icon" />
                <div>
                  <strong>Phone</strong>
                  <p>{contactInfo.phone}</p>
                </div>
              </div>
              
              <div className="info-item">
                <MapPin className="icon" />
                <div>
                  <strong>Address</strong>
                  <p style={{ whiteSpace: 'pre-line' }}>{contactInfo.address}</p>
                </div>
              </div>
            </>
          )}
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
