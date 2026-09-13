import { useState } from 'react';
import { Clock, CheckCircle, Package, Truck, Search, AlertCircle } from 'lucide-react';
import { DEMO_ORDERS, PRODUCTS } from '../utils/constants';

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orderStatus, setOrderStatus] = useState('Pending');
  const [orders, setOrders] = useState(DEMO_ORDERS);

  const filteredOrders = orders.filter(o => 
    orderStatus === 'All' ? true : 
    orderStatus === 'Pending' ? o.status === 'pending' || o.status === 'processing' :
    o.status === orderStatus.toLowerCase()
  );

  const handleUpdateStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <div className="dashboard-page container" style={{ padding: '20px' }}>
      <div className="dashboard-header" style={{ marginBottom: '20px' }}>
        <h1>Manager Dashboard</h1>
        <p>Manage daily operations, orders, and inventory.</p>
      </div>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <button className={`btn ${activeTab === 'orders' ? 'btn-manager' : 'btn-secondary'}`} onClick={() => setActiveTab('orders')}>Order Processing</button>
        <button className={`btn ${activeTab === 'inventory' ? 'btn-manager' : 'btn-secondary'}`} onClick={() => setActiveTab('inventory')}>Inventory Overview</button>
      </div>

      {activeTab === 'orders' && (
        <div className="card" style={{ padding: '20px' }}>
          <div className="dashboard-controls mb-6 flex space-between align-center" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div className="tabs" style={{ display: 'flex', gap: '10px' }}>
              {['Pending', 'Shipped', 'Delivered', 'All'].map(tab => (
                <button 
                  key={tab} 
                  className={`btn btn-sm ${orderStatus === tab ? 'btn-manager' : 'btn-ghost'}`}
                  onClick={() => setOrderStatus(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="search-bar dashboard-search" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Search className="icon" size={18} color="#666" />
              <input type="text" placeholder="Search orders..." className="input input-sm" style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }} />
            </div>
          </div>

          <div className="orders-table" style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Order ID</th>
                  <th style={{ padding: '10px' }}>Date</th>
                  <th style={{ padding: '10px' }}>Total</th>
                  <th style={{ padding: '10px' }}>Status</th>
                  <th style={{ padding: '10px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id} className="table-row" style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px' }}><strong>{order.id}</strong></td>
                    <td style={{ padding: '10px', color: '#666' }}>{order.date}</td>
                    <td style={{ padding: '10px' }}>${order.total}</td>
                    <td style={{ padding: '10px' }}>
                      <span className={`badge ${
                        order.status === 'delivered' ? 'badge-success' : 
                        order.status === 'shipped' ? 'badge-info' : 'badge-warning'
                      }`} style={{ textTransform: 'capitalize' }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px' }}>
                      {order.status === 'pending' && (
                        <button className="btn btn-sm btn-manager" onClick={() => handleUpdateStatus(order.id, 'shipped')}>Mark Shipped</button>
                      )}
                      {order.status === 'shipped' && (
                        <button className="btn btn-sm btn-success" style={{ background: '#10b981', color: 'white' }} onClick={() => handleUpdateStatus(order.id, 'delivered')}>Mark Delivered</button>
                      )}
                      {order.status === 'delivered' && (
                        <span style={{ color: '#10b981', fontSize: '0.9rem' }}><CheckCircle size={16} style={{ display: 'inline', verticalAlign: 'text-bottom' }}/> Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredOrders.length === 0 && (
              <div className="text-center p-8 text-muted" style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                No orders found for this status.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Inventory Stock Levels</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d97706' }}>
              <AlertCircle size={20} />
              <span>Low Stock Alerts: {PRODUCTS.filter(p => p.stock < 15).length} items</span>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Product Name</th>
                  <th style={{ padding: '10px' }}>Category</th>
                  <th style={{ padding: '10px' }}>Current Stock</th>
                  <th style={{ padding: '10px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map(product => (
                  <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>{product.name}</td>
                    <td style={{ padding: '10px', color: '#666' }}>{product.category}</td>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: product.stock < 15 ? '#d97706' : '#059669' }}>
                      {product.stock} units
                    </td>
                    <td style={{ padding: '10px' }}>
                      {product.stock < 15 ? (
                        <span className="badge badge-warning">Needs Restock</span>
                      ) : (
                        <span className="badge badge-success">Sufficient</span>
                      )}
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

export default ManagerDashboard;
