import { useState } from 'react';
import { Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { formatCurrency } from '../utils/formatters';

const CartPage = () => {
  // Mock cart items for now
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Monstera Deliciosa', price: 45.99, quantity: 1, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: 'Snake Plant', price: 24.99, quantity: 2, image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1ea7?auto=format&fit=crop&q=80&w=400' }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <div className="cart-page container">
      <h1>Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is currently empty.</p>
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item card">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="price">{formatCurrency(item.price)}</p>
                </div>
                <div className="item-controls">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="btn-icon btn-danger"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary card card-glass">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <Link to="/checkout" className="btn btn-primary btn-block">
              Proceed to Checkout <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
