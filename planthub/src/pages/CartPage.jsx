import { Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatters';

const CartPage = () => {
  const { cart: cartItems, removeFromCart, updateQuantity, cartTotal: subtotal } = useCart();

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
