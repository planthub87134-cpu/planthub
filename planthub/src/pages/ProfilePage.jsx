import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="profile-page container">
      <div className="profile-card card card-glass">
        <div className="profile-header">
          <div className="avatar">
            <User size={48} />
          </div>
          <h2>{user?.user_metadata?.full_name || 'Plant Lover'}</h2>
          <span className="badge badge-success">{user?.user_metadata?.role || 'Customer'}</span>
        </div>
        
        <div className="profile-details">
          <div className="detail-item">
            <Mail className="icon" />
            <div>
              <p className="label">Email</p>
              <p className="value">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
          <div className="detail-item">
            <Shield className="icon" />
            <div>
              <p className="label">Password</p>
              <p className="value">********</p>
            </div>
          </div>
        </div>

        <button onClick={signOut} className="btn btn-danger btn-block mt-6">
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
