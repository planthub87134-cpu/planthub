import { Package, Clock, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const OrdersPage = () => {
  const orders = [
    { id: 'ORD-8472', date: 'Oct 24, 2024', total: 70.98, status: 'Shipped', items: 3 },
    { id: 'ORD-8451', date: 'Sep 12, 2024', total: 45.99, status: 'Delivered', items: 1 },
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Shipped': return <Clock className="text-warning" size={18} />;
      case 'Delivered': return <CheckCircle className="text-success" size={18} />;
      default: return <Package size={18} />;
    }
  };

  return (
    <div className="orders-page container">
      <h1>Your Orders</h1>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="card order-card">
            <div className="order-header">
              <div>
                <h3>{order.id}</h3>
                <p className="date">{order.date}</p>
              </div>
              <div className="order-status">
                {getStatusIcon(order.status)}
                <span>{order.status}</span>
              </div>
            </div>
            <div className="order-details">
              <p>{order.items} item(s)</p>
              <p className="total">{formatCurrency(order.total)}</p>
            </div>
            <button className="btn btn-secondary btn-sm mt-4">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
