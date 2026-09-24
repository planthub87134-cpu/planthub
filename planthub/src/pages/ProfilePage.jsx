import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, LogOut, Droplets, Sun, Calendar, Plus, Check } from 'lucide-react';

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const [plants, setPlants] = useState([
    { id: 1, name: 'Fiddle Leaf Fig', nextWater: 'Today', nextFertilize: '10 Days', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=200', watered: false },
    { id: 2, name: 'Snake Plant', nextWater: 'In 3 Days', nextFertilize: '1 Month', image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=200', watered: false },
    { id: 3, name: 'Monstera Deliciosa', nextWater: 'Tomorrow', nextFertilize: '2 Weeks', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=200', watered: false },
  ]);

  const handleWater = (id) => {
    setPlants(plants.map(p => p.id === id ? { ...p, watered: true, nextWater: 'In 7 Days' } : p));
  };

  return (
    <div className="container" style={{ padding: '2rem 0', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Profile Card */}
        <div className="card" style={{ padding: '2rem', height: 'fit-content' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '80px', height: '80px', background: 'var(--primary-100)', color: 'var(--primary-600)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <User size={40} />
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{user?.user_metadata?.full_name || user?.name || 'Plant Lover'}</h2>
            <span className="badge badge-success">{user?.user_metadata?.role || user?.role || 'Customer'}</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-lg)' }}>
              <Mail className="text-primary-500" />
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Email</p>
                <p style={{ fontWeight: '500' }}>{user?.email || 'user@example.com'}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-lg)' }}>
              <Shield className="text-primary-500" />
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Password</p>
                <p style={{ fontWeight: '500' }}>••••••••</p>
              </div>
            </div>
          </div>

          <button onClick={signOut} className="btn btn-outline" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        {/* Plant Care Reminders */}
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Droplets className="text-info-500" /> My Plants Care</h2>
            <button className="btn btn-sm btn-primary btn-icon"><Plus size={18} /></button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {plants.map(plant => (
              <div key={plant.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', background: plant.watered ? 'var(--success-50)' : 'transparent', transition: 'all 0.3s' }}>
                <img src={plant.image} alt={plant.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>{plant.name}</h4>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: plant.watered ? 'var(--success-600)' : (plant.nextWater === 'Today' ? 'var(--danger-500)' : 'inherit') }}>
                      <Droplets size={14} /> Water: {plant.nextWater}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} /> Feed: {plant.nextFertilize}
                    </span>
                  </div>
                </div>
                <button 
                  className={`btn btn-sm ${plant.watered ? 'btn-success' : 'btn-outline'}`} 
                  onClick={() => handleWater(plant.id)}
                  disabled={plant.watered}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  {plant.watered ? <><Check size={16} /> Done</> : <><Droplets size={16} /> Water</>}
                </button>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--warning-50)', borderRadius: 'var(--radius-lg)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <Sun className="text-warning-500" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ margin: '0 0 4px 0', color: 'var(--warning-700)' }}>Seasonal Tip</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--warning-800)' }}>Winter is coming! Reduce watering frequency for your indoor plants as they enter dormancy. Keep them away from cold drafts.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
