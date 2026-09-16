import React, { useState } from 'react';
import { Trash2, ArrowRight, Gift } from 'lucide-react';
import { Link } from 'react-router';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatters';

const CartPage = () => {
  const { cart: cartItems, removeFromCart, updateQuantity, cartTotal: subtotal } = useCart();
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  const shipping = subtotal > 999 ? 0 : 99;
  const giftWrapFee = isGift ? 99 : 0;
  const total = subtotal + shipping + giftWrapFee;

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
                    <button onClick={() => updateQuantity(item.id, item.qty - 1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQuantity(item.id, item.qty + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="btn-icon btn-danger"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary card card-glass">
            <h3>Order Summary</h3>
            
            {/* Gift Wrap Option */}
            <div style={{ background: 'var(--primary-50)', padding: '12px', borderRadius: '8px', marginBottom: '16px', border: '1px solid var(--primary-200)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold', color: 'var(--primary-700)' }}>
                <input 
                  type="checkbox" 
                  checked={isGift} 
                  onChange={(e) => setIsGift(e.target.checked)} 
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary-600)' }}
                />
                <Gift size={18} /> Make this a Gift (Add ₹99)
              </label>
              {isGift && (
                <div style={{ marginTop: '12px', animation: 'fadeIn 0.3s ease' }}>
                  <textarea 
                    className="input" 
                    placeholder="Type your custom message for the greeting card..." 
                    rows="3" 
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    style={{ width: '100%', resize: 'none', fontSize: '0.9rem' }}
                  />
                </div>
              )}
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
            </div>
            {isGift && (
              <div className="summary-row" style={{ color: 'var(--primary-600)' }}>
                <span>Gift Wrap</span>
                <span>{formatCurrency(giftWrapFee)}</span>
              </div>
            )}
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
