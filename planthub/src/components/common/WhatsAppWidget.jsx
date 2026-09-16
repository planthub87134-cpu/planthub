import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppWidget() {
  const [phoneNumber, setPhoneNumber] = useState(localStorage.getItem('planthub_whatsapp_number') || "7209306446");

  useEffect(() => {
    const handleUpdate = () => {
      setPhoneNumber(localStorage.getItem('planthub_whatsapp_number') || "7209306446");
    };
    window.addEventListener('whatsappNumberUpdated', handleUpdate);
    return () => window.removeEventListener('whatsappNumberUpdated', handleUpdate);
  }, []);

  const message = encodeURIComponent("Hi, I need help choosing a plant! 🌱");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-widget"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: '#25D366',
        color: 'white',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
        zIndex: 9999,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 211, 102, 0.4)';
      }}
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
}
