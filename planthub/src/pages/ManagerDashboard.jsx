import { useState } from 'react';
import { Clock, CheckCircle, Package, Truck, Search } from 'lucide-react';

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('Pending');
  
  const mockOrders = [
    { id: 'ORD-1234', customer: 'Alice Smith', items: 3, total: 145.00, status: 'Pending', date: 'Today, 10:42 AM' },
    { id: 'ORD-1235', customer: 'Bob Jones', items: 1, total: 45.99, status: 'Processing', date: 'Today, 09:15 AM' },
    { id: 'ORD-1236', customer: 'Charlie Brown', items: 5, total: 320.50, status: 'Shipped', date: 'Yesterday, 04:30 PM' },
    { id: 'ORD-1237', customer: 'Diana Prince', items: 2, total: 89.99, status: 'Delivered', date: 'Oct 24, 2024' },
  ];

  const filteredOrders = mockOrders.filter(o => 
    activeTab === 'All' ? true : 
    activeTab === 'Pending' ? o.status === 'Pending' || o.status === 'Processing' :
    o.status === activeTab
  );

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Order Management</h1>
        <p>Review and process customer orders.</p>
      </div>

      <div className="dashboard-controls mt-6 mb-6 flex space-between align-center">
        <div className="tabs">
          {['Pending', 'Shipped', 'Delivered', 'All'].map(tab => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="search-bar dashboard-search">
          <Search className="icon" size={18} />
          <input type="text" placeholder="Search orders..." className="input input-sm" />
        </div>
      </div>

      <div className="orders-table card">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id} className="table-row">
                <td><strong>{order.id}</strong></td>
                <td>{order.customer}</td>
                <td><span className="text-muted">{order.date}</span></td>
                <td>{order.items}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <span className={`badge badge-${
                    order.status === 'Delivered' ? 'success' : 
                    order.status === 'Shipped' ? 'primary' : 'warning'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-secondary">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <div className="text-center p-8 text-muted">
            No orders found for this status.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;
