import { Package, Clock, CheckCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatters';

const OrdersPage = () => {
  const { orders } = useCart();

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Shipped': return <Clock className="text-warning" size={18} />;
      case 'Delivered': return <CheckCircle className="text-success" size={18} />;
      default: return <Package size={18} />;
    }
  };

  return (
    <div className="orders-page container page-enter" style={{ padding: 'var(--space-8) 0' }}>
      <h1 style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--text-3xl)', textAlign: 'center' }}>Your Orders</h1>
      <div className="orders-list grid" style={{ gap: 'var(--space-6)', maxWidth: '800px', margin: '0 auto' }}>
        {orders.map((order, index) => (
          <div key={order.id} className={`card hover-lift animate-slide-up delay-${index + 1}`} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-6)' }}>
            <div className="order-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: 'var(--space-4)' }}>
              <div>
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>{order.id}</h3>
                <p className="date" style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>{order.date}</p>
              </div>
              <div className="order-status" style={{ 
                display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                backgroundColor: order.status === 'Delivered' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                color: order.status === 'Delivered' ? 'var(--success-600)' : 'var(--warning-600)',
                padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-full)', fontWeight: 'var(--font-bold)', fontSize: 'var(--text-sm)'
              }}>
                {getStatusIcon(order.status)}
                <span>{order.status}</span>
              </div>
            </div>
            <div className="order-details" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {typeof order.items === 'number' ? order.items : (Array.isArray(order.items) ? order.items.length : 0)} item(s)
                </p>
                <p className="total" style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--text-primary)', marginTop: 'var(--space-1)' }}>{formatCurrency(order.total)}</p>
              </div>
              <button className="btn btn-primary hover-scale" onClick={() => alert(`Tracking information for ${order.id}:\nStatus: ${order.status}\nCarrier: PlantHub Logistics\nExpected Delivery: 2-3 business days`)}>Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
