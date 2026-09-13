import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, DollarSign, Users, AlertCircle, Edit, Trash2 } from 'lucide-react';
import { PRODUCTS, DEMO_ORDERS } from '../utils/constants';

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
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard-page container" style={{ padding: '20px' }}>
      <div className="dashboard-header" style={{ marginBottom: '20px' }}>
        <h1>Admin Dashboard</h1>
        <p>Welcome back! Here's what's happening today.</p>
      </div>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <button className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={`btn ${activeTab === 'inventory' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('inventory')}>Inventory Management</button>
        <button className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('orders')}>Order Management</button>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
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
                <p className="value">{DEMO_ORDERS.length}</p>
                <span className="trend positive">+5% this week</span>
              </div>
            </div>
            <div className="stat-card card">
              <div className="stat-icon"><Users /></div>
              <div className="stat-info">
                <h3>Total Plants</h3>
                <p className="value">{PRODUCTS.length}</p>
                <span className="trend neutral">Active items</span>
              </div>
            </div>
            <div className="stat-card card">
              <div className="stat-icon alert" style={{ color: 'red' }}><AlertCircle /></div>
              <div className="stat-info">
                <h3>Low Stock</h3>
                <p className="value">{PRODUCTS.filter(p => p.stock < 10).length} Items</p>
                <button className="btn btn-sm btn-secondary mt-2" onClick={() => setActiveTab('inventory')}>View Inventory</button>
              </div>
            </div>
          </div>

          <div className="chart-section card mt-8" style={{ marginTop: '20px', padding: '20px' }}>
            <h2>Weekly Sales Overview</h2>
            <div className="chart-container" style={{ height: 300, marginTop: 20 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Line type="monotone" dataKey="sales" stroke="var(--primary-color, #10b981)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {activeTab === 'inventory' && (
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Plant Inventory Data</h2>
            <button className="btn btn-primary">Add New Plant</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Image</th>
                  <th style={{ padding: '10px' }}>Name</th>
                  <th style={{ padding: '10px' }}>Category</th>
                  <th style={{ padding: '10px' }}>Price</th>
                  <th style={{ padding: '10px' }}>Stock</th>
                  <th style={{ padding: '10px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map(product => (
                  <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px' }}>
                      <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                    </td>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>{product.name}</td>
                    <td style={{ padding: '10px' }}>{product.category}</td>
                    <td style={{ padding: '10px' }}>${product.price}</td>
                    <td style={{ padding: '10px' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem', backgroundColor: product.stock < 10 ? '#fee2e2' : '#d1fae5', color: product.stock < 10 ? '#991b1b' : '#065f46' }}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3b82f6' }}><Edit size={18} /></button>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="card" style={{ padding: '20px' }}>
          <h2 style={{ marginBottom: '20px' }}>Recent Orders</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Order ID</th>
                  <th style={{ padding: '10px' }}>Date</th>
                  <th style={{ padding: '10px' }}>Total</th>
                  <th style={{ padding: '10px' }}>Status</th>
                  <th style={{ padding: '10px' }}>Tracking</th>
                  <th style={{ padding: '10px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_ORDERS.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>{order.id}</td>
                    <td style={{ padding: '10px' }}>{order.date}</td>
                    <td style={{ padding: '10px' }}>${order.total}</td>
                    <td style={{ padding: '10px' }}>
                      <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem', textTransform: 'capitalize',
                        backgroundColor: order.status === 'delivered' ? '#d1fae5' : order.status === 'shipped' ? '#dbeafe' : '#fef3c7',
                        color: order.status === 'delivered' ? '#065f46' : order.status === 'shipped' ? '#1e40af' : '#92400e'
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px' }}>{order.trackingNumber}</td>
                    <td style={{ padding: '10px' }}>
                      <button className="btn btn-sm btn-secondary">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
