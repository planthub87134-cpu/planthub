import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, DollarSign, Users, AlertCircle } from 'lucide-react';

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const AdminDashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back! Here's what's happening today.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-icon"><DollarSign /></div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p className="value">$24,590</p>
            <span className="trend positive">+12% this week</span>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon"><Package /></div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p className="value">1,432</p>
            <span className="trend positive">+5% this week</span>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon"><Users /></div>
          <div className="stat-info">
            <h3>Active Users</h3>
            <p className="value">892</p>
            <span className="trend neutral">Same as last week</span>
          </div>
        </div>
        <div className="stat-card card">
          <div className="stat-icon alert"><AlertCircle /></div>
          <div className="stat-info">
            <h3>Low Stock</h3>
            <p className="value">12 Items</p>
            <button className="btn btn-sm btn-secondary mt-2">View Inventory</button>
          </div>
        </div>
      </div>

      <div className="chart-section card mt-8">
        <h2>Weekly Sales Overview</h2>
        <div className="chart-container" style={{ height: 300, marginTop: 20 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Line type="monotone" dataKey="sales" stroke="var(--primary-color)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
