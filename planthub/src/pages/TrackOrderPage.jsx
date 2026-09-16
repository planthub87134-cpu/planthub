import React, { useState } from 'react';
import { Package, Truck, CheckCircle2, MapPin, Search, Calendar, Clock } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [trackingData, setTrackingData] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsSearching(true);
    setTrackingData(null);

    // Simulate API call delay
    setTimeout(() => {
      // Mock data representing the tracking timeline
      setTrackingData({
        id: orderId.toUpperCase(),
        status: 'In Transit',
        carrier: 'Delhivery',
        expectedDelivery: 'Tommorrow, by 8:00 PM',
        currentLocation: 'Hub, Mumbai',
        events: [
          {
            id: 1,
            title: 'Order Placed',
            date: '10 Oct, 2026',
            time: '10:30 AM',
            location: 'Online',
            description: 'Your order was successfully placed and confirmed.',
            completed: true,
            icon: <CheckCircle2 size={24} />
          },
          {
            id: 2,
            title: 'Packed & Ready',
            date: '11 Oct, 2026',
            time: '02:15 PM',
            location: 'Greenera Nursery, Pune',
            description: 'Your plants were safely packed in our specialized damage-proof boxes.',
            completed: true,
            icon: <Package size={24} />
          },
          {
            id: 3,
            title: 'Shipped (In Transit)',
            date: '12 Oct, 2026',
            time: '08:45 AM',
            location: 'Sorting Hub, Mumbai',
            description: 'Package has reached the main sorting facility and is on its way to your city.',
            completed: true,
            icon: <Truck size={24} />
          },
          {
            id: 4,
            title: 'Out for Delivery',
            date: 'Expected Tommorrow',
            time: 'Morning',
            location: 'Your Local Hub',
            description: 'Courier partner will contact you before delivery.',
            completed: false,
            icon: <MapPin size={24} />
          },
          {
            id: 5,
            title: 'Delivered',
            date: 'Pending',
            time: '-',
            location: 'Your Address',
            description: 'Package handed over to customer.',
            completed: false,
            icon: <CheckCircle2 size={24} />
          }
        ]
      });
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="page-enter" style={{ minHeight: '80vh', padding: 'var(--space-12) 0', background: 'var(--bg-secondary)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Header & Search Form */}
        <div className="card" style={{ padding: 'var(--space-8)', textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'inline-flex', padding: '16px', background: 'var(--primary-50)', color: 'var(--primary-600)', borderRadius: '50%', marginBottom: 'var(--space-4)' }}>
            <MapPin size={40} />
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>Track Your Order</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
            Enter your Order ID or AWB Tracking Number to see live updates of your plant delivery.
          </p>
          
          <form onSubmit={handleTrack} style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
            <div className="input-group">
              <Search className="input-group-icon" size={20} />
              <input 
                type="text" 
                className="input" 
                placeholder="e.g. ORD-837492 or AWB98437..." 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                style={{ paddingRight: '120px', height: '56px', fontSize: '1.1rem' }}
                required
              />
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ position: 'absolute', right: '4px', top: '4px', bottom: '4px', border: 'none', padding: '0 24px' }}
                disabled={isSearching}
              >
                {isSearching ? <span className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></span> : 'Track'}
              </button>
            </div>
          </form>
        </div>

        {/* Tracking Results */}
        {trackingData && (
          <div className="card animate-slide-up" style={{ padding: 'var(--space-8)' }}>
            
            {/* Shipment Summary Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Order: #{trackingData.id}</h2>
                <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Truck size={14}/> {trackingData.carrier}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14}/> {trackingData.currentLocation}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', background: 'var(--primary-50)', padding: '12px 20px', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary-600)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '2px' }}>Expected Delivery</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary-900)' }}>{trackingData.expectedDelivery}</div>
              </div>
            </div>

            {/* Vertical Timeline */}
            <div style={{ paddingLeft: '16px' }}>
              {trackingData.events.map((event, index) => {
                const isLast = index === trackingData.events.length - 1;
                return (
                  <div key={event.id} style={{ display: 'flex', position: 'relative', marginBottom: isLast ? '0' : 'var(--space-8)' }}>
                    
                    {/* Timeline Vertical Line */}
                    {!isLast && (
                      <div style={{ 
                        position: 'absolute', 
                        left: '20px', 
                        top: '40px', 
                        bottom: '-32px', 
                        width: '2px', 
                        backgroundColor: event.completed ? 'var(--primary-500)' : 'var(--border-light)',
                        zIndex: 0
                      }} />
                    )}

                    {/* Timeline Icon */}
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      backgroundColor: event.completed ? 'var(--primary-500)' : 'white',
                      border: event.completed ? 'none' : '2px solid var(--border-light)',
                      color: event.completed ? 'white' : 'var(--text-muted)',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0,
                      zIndex: 1,
                      position: 'relative'
                    }}>
                      {event.icon}
                    </div>

                    {/* Timeline Content */}
                    <div style={{ marginLeft: 'var(--space-6)', flex: 1 }}>
                      <h3 style={{ fontSize: '1.2rem', color: event.completed ? 'var(--text-primary)' : 'var(--text-muted)', marginBottom: '4px' }}>
                        {event.title}
                      </h3>
                      <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={12}/> {event.date}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12}/> {event.time}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12}/> {event.location}</span>
                      </div>
                      <p style={{ color: event.completed ? 'var(--text-secondary)' : 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>
                        {event.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
          </div>
        )}

      </div>
    </div>
  );
}
