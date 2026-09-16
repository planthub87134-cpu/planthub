import { useState } from 'react';
import { useOutletContext } from 'react-router';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, DollarSign, Users, AlertCircle, Edit, Trash2 } from 'lucide-react';
import { PRODUCTS, DEMO_ORDERS } from '../utils/constants';
import CRMDashboard from '../components/admin/CRMDashboard';

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const MOCK_USERS = [
  { id: 1, name: 'Admin User', email: 'admin@planthub.com', role: 'admin', status: 'active' },
  { id: 'USR002', name: 'Laura Agent', email: 'laura@example.com', role: 'manager', status: 'active' },
  { id: 'USR003', name: 'Support Bot', email: 'support@planthub.com', role: 'agent', status: 'active' },
  { id: 'USR004', name: 'John Doe', email: 'john@example.com', role: 'customer', status: 'inactive' },
  { id: 'USR005', name: 'Alice Smith', email: 'alice@example.com', role: 'customer', status: 'active' },
];

const AdminDashboard = () => {
  const { activeView, setActiveView } = useOutletContext();
  const activeTab = activeView || 'overview';
  const setActiveTab = setActiveView;
  const [inventory, setInventory] = useState(PRODUCTS);
  const [users, setUsers] = useState(MOCK_USERS);
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [whatsappNumber, setWhatsappNumber] = useState(localStorage.getItem('planthub_whatsapp_number') || '7209306446');

  // Inventory State
  const [editingProductId, setEditingProductId] = useState(null);
  const [editProductForm, setEditProductForm] = useState({});
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  
  const handleEditProductClick = (product) => {
    setEditingProductId(product.id);
    setEditProductForm(product);
  };

  const handleSaveProduct = () => {
    setInventory(inventory.map(p => p.id === editingProductId ? editProductForm : p));
    setEditingProductId(null);
  };

  const handleAddProduct = () => {
    const newProduct = {
      ...editProductForm,
      id: `P${Math.floor(Math.random() * 10000)}`,
      image: editProductForm.image || 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=500' // fallback image
    };
    setInventory([...inventory, newProduct]);
    setIsAddingProduct(false);
    setEditProductForm({});
  };
  
  const handleDeleteProduct = (id) => {
    setInventory(inventory.filter(p => p.id !== id));
  };

  // User State
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserForm, setEditUserForm] = useState({});
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', role: 'customer', status: 'active' });

  const handleEditUser = (user) => {
    setEditingUserId(user.id);
    setEditUserForm(user);
  };

  const handleSaveUser = (id) => {
    setUsers(users.map(u => u.id === id ? editUserForm : u));
    setEditingUserId(null);
  };

  const handleAddUser = () => {
    const newUser = {
      ...newUserForm,
      id: `USR${Math.floor(Math.random() * 1000)}`,
    };
    setUsers([...users, newUser]);
    setIsAddingUser(false);
    setNewUserForm({ name: '', email: '', role: 'customer', status: 'active' });
  };

  // Order State
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editOrderStatus, setEditOrderStatus] = useState('');

  const handleEditOrderStatus = (order) => {
    setEditingOrderId(order.id);
    setEditOrderStatus(order.status);
  };

  const handleSaveOrderStatus = (id) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: editOrderStatus } : o));
    setEditingOrderId(null);
  };

  const handleTogglePacked = (id) => {
    setOrders(orders.map(o => o.id === id ? { ...o, packed: !o.packed } : o));
  };

  const handleAutoAssignCourier = (id) => {
    const couriers = ['FedEx', 'DHL', 'BlueDart', 'Delhivery'];
    const randomCourier = couriers[Math.floor(Math.random() * couriers.length)];
    setOrders(orders.map(o => o.id === id ? { ...o, courier: randomCourier } : o));
  };

  const handleRequestRefund = (id) => {
    const notes = prompt("Enter damage notes:");
    if (notes !== null) {
      setOrders(orders.map(o => o.id === id ? { ...o, refundStatus: 'requested', damageNotes: notes } : o));
    }
  };

  const handleProcessRefund = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, refundStatus: newStatus } : o));
  };

  return (
    <div className="dashboard-page container" style={{ padding: '20px' }}>
      <div className="dashboard-header" style={{ marginBottom: '20px' }}>
        <h1>Admin Dashboard</h1>
        <p>Welcome back! Here's what's happening today.</p>
      </div>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <button className={`btn ${activeTab === 'overview' ? 'btn-admin' : 'btn-secondary'} hover-scale`} onClick={() => setActiveTab('overview')}>Overview</button>
        <button className={`btn ${activeTab === 'inventory' ? 'btn-admin' : 'btn-secondary'} hover-scale`} onClick={() => setActiveTab('inventory')}>Inventory Management</button>
        <button className={`btn ${activeTab === 'orders' ? 'btn-admin' : 'btn-secondary'} hover-scale`} onClick={() => setActiveTab('orders')}>Order Management</button>
        <button className={`btn ${activeTab === 'refunds' ? 'btn-admin' : 'btn-secondary'} hover-scale`} onClick={() => setActiveTab('refunds')}>Refunds & Damages</button>
        <button className={`btn ${activeTab === 'users' ? 'btn-admin' : 'btn-secondary'} hover-scale`} onClick={() => setActiveTab('users')}>User Management</button>
        <button className={`btn ${activeTab === 'crm' ? 'btn-admin' : 'btn-secondary'} hover-scale`} onClick={() => setActiveTab('crm')}>CRM & Doctor</button>
        <button className={`btn ${activeTab === 'settings' ? 'btn-admin' : 'btn-secondary'} hover-scale`} onClick={() => setActiveTab('settings')}>Settings</button>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            <div className="stat-card card hover-lift animate-slide-up delay-1" style={{ borderTop: '4px solid var(--primary-500)' }}>
              <div className="stat-icon" style={{ background: 'var(--primary-50)', padding: '12px', borderRadius: '50%', color: 'var(--primary-600)', width: 'fit-content' }}><DollarSign /></div>
              <div className="stat-info" style={{ marginTop: '16px' }}>
                <h3 style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Total Revenue</h3>
                <p className="value" style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', margin: '4px 0' }}>$24,590</p>
                <span className="trend positive" style={{ color: 'var(--success-600)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>↑ +12% this week</span>
              </div>
            </div>
            <div className="stat-card card hover-lift animate-slide-up delay-2" style={{ borderTop: '4px solid var(--info-500)' }}>
              <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '50%', color: 'var(--info-500)', width: 'fit-content' }}><Package /></div>
              <div className="stat-info" style={{ marginTop: '16px' }}>
                <h3 style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Total Orders</h3>
                <p className="value" style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', margin: '4px 0' }}>{DEMO_ORDERS.length}</p>
                <span className="trend positive" style={{ color: 'var(--success-600)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>↑ +5% this week</span>
              </div>
            </div>
            <div className="stat-card card hover-lift animate-slide-up delay-3" style={{ borderTop: '4px solid var(--admin-500)' }}>
              <div className="stat-icon" style={{ background: 'var(--admin-50)', padding: '12px', borderRadius: '50%', color: 'var(--admin-600)', width: 'fit-content' }}><Users /></div>
              <div className="stat-info" style={{ marginTop: '16px' }}>
                <h3 style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Total Plants</h3>
                <p className="value" style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', margin: '4px 0' }}>{inventory.length}</p>
                <span className="trend neutral" style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Active items</span>
              </div>
            </div>
            <div className="stat-card card hover-lift animate-slide-up delay-4" style={{ borderTop: '4px solid var(--danger-500)' }}>
              <div className="stat-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '50%', color: 'var(--danger-600)', width: 'fit-content' }}><AlertCircle /></div>
              <div className="stat-info" style={{ marginTop: '16px' }}>
                <h3 style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Low Stock</h3>
                <p className="value" style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', margin: '4px 0' }}>{inventory.filter(p => p.stock < 10).length} Items</p>
                <button className="btn btn-sm btn-ghost hover-scale" style={{ padding: 0, color: 'var(--danger-600)', marginTop: '8px' }} onClick={() => setActiveTab('inventory')}>View Inventory →</button>
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
        <div className="card animate-slide-up" style={{ padding: '24px', borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '4px' }}>Plant Inventory Data</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>Manage your catalog. Add new plants, update pricing, or adjust stock levels below.</p>
            </div>
            {!isAddingProduct && (
              <button className="btn btn-admin hover-scale" onClick={() => { setIsAddingProduct(true); setEditProductForm({ name: '', category: 'Indoor', price: 0, stock: 0 }); }}>
                + Add New Plant
              </button>
            )}
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-light)', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Image</th>
                  <th style={{ padding: '10px' }}>Name</th>
                  <th style={{ padding: '10px' }}>Category</th>
                  <th style={{ padding: '10px' }}>Price</th>
                  <th style={{ padding: '10px' }}>Stock</th>
                  <th style={{ padding: '10px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isAddingProduct && (
                  <tr style={{ borderBottom: '1px solid var(--border-light)', background: 'var(--primary-50)' }}>
                    <td style={{ padding: '10px' }}>
                      <input type="text" className="input input-sm" placeholder="Image URL" value={editProductForm.image || ''} onChange={(e) => setEditProductForm({...editProductForm, image: e.target.value})} style={{ padding: '4px', width: '80px' }} />
                    </td>
                    <td style={{ padding: '10px' }}>
                      <input type="text" className="input input-sm" placeholder="Plant Name" value={editProductForm.name || ''} onChange={(e) => setEditProductForm({...editProductForm, name: e.target.value})} style={{ padding: '4px', width: '100%' }} />
                    </td>
                    <td style={{ padding: '10px' }}>
                      <select className="input input-sm" value={editProductForm.category || 'Indoor'} onChange={(e) => setEditProductForm({...editProductForm, category: e.target.value})} style={{ padding: '4px' }}>
                        <option value="Indoor">Indoor</option>
                        <option value="Outdoor">Outdoor</option>
                        <option value="Succulent">Succulent</option>
                      </select>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <input type="number" className="input input-sm" placeholder="0.00" value={editProductForm.price || ''} onChange={(e) => setEditProductForm({...editProductForm, price: parseFloat(e.target.value)})} style={{ padding: '4px', width: '80px' }} />
                    </td>
                    <td style={{ padding: '10px' }}>
                      <input type="number" className="input input-sm" placeholder="0" value={editProductForm.stock || ''} onChange={(e) => setEditProductForm({...editProductForm, stock: parseInt(e.target.value, 10)})} style={{ padding: '4px', width: '80px' }} />
                    </td>
                    <td style={{ padding: '10px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn btn-sm btn-primary" onClick={handleAddProduct}>Save</button>
                        <button className="btn btn-sm btn-ghost" onClick={() => setIsAddingProduct(false)}>Cancel</button>
                      </div>
                    </td>
                  </tr>
                )}
                {inventory.map(product => (
                  <tr key={product.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px' }}>
                      <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                    </td>
                    
                    {editingProductId === product.id ? (
                      <>
                        <td style={{ padding: '10px' }}>
                          <input type="text" className="input input-sm" value={editProductForm.name} onChange={(e) => setEditProductForm({...editProductForm, name: e.target.value})} style={{ padding: '4px', width: '100%' }} />
                        </td>
                        <td style={{ padding: '10px' }}>
                          <select className="input input-sm" value={editProductForm.category} onChange={(e) => setEditProductForm({...editProductForm, category: e.target.value})} style={{ padding: '4px' }}>
                            <option value="Indoor">Indoor</option>
                            <option value="Outdoor">Outdoor</option>
                            <option value="Succulent">Succulent</option>
                          </select>
                        </td>
                        <td style={{ padding: '10px' }}>
                          <input type="number" className="input input-sm" value={editProductForm.price} onChange={(e) => setEditProductForm({...editProductForm, price: parseFloat(e.target.value)})} style={{ padding: '4px', width: '80px' }} />
                        </td>
                        <td style={{ padding: '10px' }}>
                          <input type="number" className="input input-sm" value={editProductForm.stock} onChange={(e) => setEditProductForm({...editProductForm, stock: parseInt(e.target.value, 10)})} style={{ padding: '4px', width: '80px' }} />
                        </td>
                        <td style={{ padding: '10px' }}>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="btn btn-sm btn-primary" onClick={handleSaveProduct}>Save</button>
                            <button className="btn btn-sm btn-ghost" onClick={() => setEditingProductId(null)}>Cancel</button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ padding: '10px', fontWeight: 'bold' }}>{product.name}</td>
                        <td style={{ padding: '10px' }}>{product.category}</td>
                        <td style={{ padding: '10px' }}>${product.price}</td>
                        <td style={{ padding: '10px' }}>
                          <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem', backgroundColor: product.stock < 10 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)', color: product.stock < 10 ? 'var(--danger-600)' : 'var(--success-600)' }}>
                            {product.stock} in stock
                          </span>
                        </td>
                        <td style={{ padding: '10px' }}>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--info-500)' }} onClick={() => handleEditProductClick(product)} title="Edit"><Edit size={18} /></button>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--danger-500)' }} onClick={() => handleDeleteProduct(product.id)} title="Delete"><Trash2 size={18} /></button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="card animate-slide-up" style={{ padding: '24px', borderRadius: 'var(--radius-xl)' }}>
          <h2 style={{ marginBottom: '20px', fontSize: 'var(--text-xl)' }}>Recent Orders</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-light)', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Order ID</th>
                  <th style={{ padding: '10px' }}>Date</th>
                  <th style={{ padding: '10px' }}>Total</th>
                  <th style={{ padding: '10px' }}>Status</th>
                  <th style={{ padding: '10px' }}>Courier</th>
                  <th style={{ padding: '10px' }}>Packed</th>
                  <th style={{ padding: '10px' }}>Tracking</th>
                  <th style={{ padding: '10px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>{order.id}</td>
                    <td style={{ padding: '10px' }}>{order.date}</td>
                    <td style={{ padding: '10px' }}>${order.total}</td>
                    <td style={{ padding: '10px' }}>
                      {editingOrderId === order.id ? (
                        <select className="input input-sm" value={editOrderStatus} onChange={(e) => setEditOrderStatus(e.target.value)} style={{ padding: '4px' }}>
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      ) : (
                        <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem', textTransform: 'capitalize',
                          backgroundColor: order.status === 'delivered' ? 'rgba(34, 197, 94, 0.1)' : order.status === 'shipped' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: order.status === 'delivered' ? 'var(--success-600)' : order.status === 'shipped' ? 'var(--info-500)' : 'var(--warning-600)'
                        }}>
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '10px' }}>
                      {order.courier !== 'Unassigned' && order.courier ? (
                        <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{order.courier}</span>
                      ) : (
                        <button className="btn btn-sm btn-ghost" style={{ padding: '4px 8px', fontSize: '0.8rem' }} onClick={() => handleAutoAssignCourier(order.id)}>Auto-Assign</button>
                      )}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <input type="checkbox" checked={order.packed || false} onChange={() => handleTogglePacked(order.id)} style={{ cursor: 'pointer', width: '18px', height: '18px', accentColor: 'var(--primary-600)' }} />
                    </td>
                    <td style={{ padding: '10px' }}>{order.trackingNumber}</td>
                    <td style={{ padding: '10px' }}>
                      {editingOrderId === order.id ? (
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button className="btn btn-sm btn-primary" onClick={() => handleSaveOrderStatus(order.id)}>Save</button>
                          <button className="btn btn-sm btn-ghost" onClick={() => setEditingOrderId(null)}>Cancel</button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button className="btn btn-sm btn-secondary hover-scale" onClick={() => handleEditOrderStatus(order)}>Update</button>
                          <button className="btn btn-sm btn-ghost hover-scale" style={{ color: 'var(--danger-500)' }} onClick={() => handleRequestRefund(order.id)} title="Report Damage">⚠️ Report</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'refunds' && (
        <div className="card animate-slide-up" style={{ padding: '24px', borderRadius: 'var(--radius-xl)' }}>
          <h2 style={{ marginBottom: '20px', fontSize: 'var(--text-xl)' }}>Refunds & Damage Reports</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-light)', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Order ID</th>
                  <th style={{ padding: '10px' }}>Date</th>
                  <th style={{ padding: '10px' }}>Total</th>
                  <th style={{ padding: '10px' }}>Damage Notes</th>
                  <th style={{ padding: '10px' }}>Refund Status</th>
                  <th style={{ padding: '10px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.filter(o => o.refundStatus && o.refundStatus !== 'none').length === 0 ? (
                  <tr><td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No refund requests found.</td></tr>
                ) : (
                  orders.filter(o => o.refundStatus && o.refundStatus !== 'none').map(order => (
                    <tr key={order.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '10px', fontWeight: 'bold' }}>{order.id}</td>
                      <td style={{ padding: '10px' }}>{order.date}</td>
                      <td style={{ padding: '10px' }}>${order.total}</td>
                      <td style={{ padding: '10px', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={order.damageNotes}>{order.damageNotes}</td>
                      <td style={{ padding: '10px' }}>
                        <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem', textTransform: 'capitalize',
                          backgroundColor: order.refundStatus === 'approved' ? 'rgba(34, 197, 94, 0.1)' : order.refundStatus === 'rejected' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: order.refundStatus === 'approved' ? 'var(--success-600)' : order.refundStatus === 'rejected' ? 'var(--danger-600)' : 'var(--warning-600)'
                        }}>
                          {order.refundStatus}
                        </span>
                      </td>
                      <td style={{ padding: '10px' }}>
                        {order.refundStatus === 'requested' && (
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-sm btn-primary hover-scale" onClick={() => handleProcessRefund(order.id, 'approved')}>Approve</button>
                            <button className="btn btn-sm btn-danger hover-scale" style={{ background: 'var(--danger-50)', color: 'var(--danger-600)' }} onClick={() => handleProcessRefund(order.id, 'rejected')}>Reject</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="card animate-slide-up" style={{ padding: '24px', borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: 'var(--text-xl)' }}>System Users</h2>
            {!isAddingUser && (
              <button className="btn btn-admin hover-scale" onClick={() => setIsAddingUser(true)}>+ Add New User</button>
            )}
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-light)', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Name</th>
                  <th style={{ padding: '10px' }}>Email</th>
                  <th style={{ padding: '10px' }}>Role</th>
                  <th style={{ padding: '10px' }}>Status</th>
                  <th style={{ padding: '10px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isAddingUser && (
                  <tr style={{ borderBottom: '1px solid var(--border-light)', background: 'var(--primary-50)' }}>
                    <td style={{ padding: '10px' }}>
                      <input type="text" className="input input-sm" placeholder="Name" value={newUserForm.name} onChange={(e) => setNewUserForm({...newUserForm, name: e.target.value})} style={{ padding: '4px', width: '100%' }} />
                    </td>
                    <td style={{ padding: '10px' }}>
                      <input type="email" className="input input-sm" placeholder="Email" value={newUserForm.email} onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})} style={{ padding: '4px', width: '100%' }} />
                    </td>
                    <td style={{ padding: '10px' }}>
                      <select className="input input-sm" value={newUserForm.role} onChange={(e) => setNewUserForm({...newUserForm, role: e.target.value})} style={{ padding: '4px' }}>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="agent">Agent</option>
                        <option value="customer">Customer</option>
                      </select>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <select className="input input-sm" value={newUserForm.status} onChange={(e) => setNewUserForm({...newUserForm, status: e.target.value})} style={{ padding: '4px' }}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn btn-sm btn-primary" onClick={handleAddUser}>Save</button>
                        <button className="btn btn-sm btn-ghost" onClick={() => setIsAddingUser(false)}>Cancel</button>
                      </div>
                    </td>
                  </tr>
                )}
                {users.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    {editingUserId === user.id ? (
                      <>
                        <td style={{ padding: '10px' }}>
                          <input type="text" className="input input-sm" value={editUserForm.name || ''} onChange={(e) => setEditUserForm({...editUserForm, name: e.target.value})} style={{ padding: '4px', width: '100%' }} />
                        </td>
                        <td style={{ padding: '10px' }}>
                          <input type="email" className="input input-sm" value={editUserForm.email || ''} onChange={(e) => setEditUserForm({...editUserForm, email: e.target.value})} style={{ padding: '4px', width: '100%' }} />
                        </td>
                        <td style={{ padding: '10px' }}>
                          <select className="input input-sm" value={editUserForm.role || ''} onChange={(e) => setEditUserForm({...editUserForm, role: e.target.value})} style={{ padding: '4px' }}>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="agent">Agent</option>
                            <option value="customer">Customer</option>
                          </select>
                        </td>
                        <td style={{ padding: '10px' }}>
                          <select className="input input-sm" value={editUserForm.status || ''} onChange={(e) => setEditUserForm({...editUserForm, status: e.target.value})} style={{ padding: '4px' }}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </td>
                        <td style={{ padding: '10px' }}>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="btn btn-sm btn-primary" onClick={() => handleSaveUser(user.id)}>Save</button>
                            <button className="btn btn-sm btn-ghost" onClick={() => setEditingUserId(null)}>Cancel</button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ padding: '10px', fontWeight: 'bold' }}>{user.name}</td>
                        <td style={{ padding: '10px', color: 'var(--text-muted)' }}>{user.email}</td>
                        <td style={{ padding: '10px', textTransform: 'capitalize' }}>
                          <span className={`badge ${user.role === 'admin' ? 'badge-danger' : user.role === 'manager' ? 'badge-info' : 'badge-neutral'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td style={{ padding: '10px' }}>
                          <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td style={{ padding: '10px' }}>
                          <button className="btn btn-sm btn-secondary hover-scale" onClick={() => handleEditUser(user)}>Edit</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="card animate-slide-up" style={{ padding: '24px', borderRadius: 'var(--radius-xl)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '20px' }}>General Settings</h2>
          <div style={{ maxWidth: '500px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>WhatsApp Support Number</label>
              <input type="text" className="input" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} placeholder="e.g. 7209306446" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>This number is used for the WhatsApp floating widget on the customer site.</p>
            </div>
            <button className="btn btn-primary hover-scale" onClick={() => {
              localStorage.setItem('planthub_whatsapp_number', whatsappNumber);
              // Dispatch a custom event to notify WhatsAppWidget to update immediately across the app
              window.dispatchEvent(new Event('whatsappNumberUpdated'));
              alert('Settings saved!');
            }}>Save Settings</button>
          </div>
        </div>
      )}

      {activeTab === 'crm' && (
        <div className="animate-slide-up" style={{ height: '700px' }}>
          <CRMDashboard />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
