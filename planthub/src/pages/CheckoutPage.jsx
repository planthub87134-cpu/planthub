import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CreditCard, Truck, CheckCircle, Smartphone, Banknote, Building, Globe } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatters';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, addOrder, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMode, setPaymentMode] = useState('card');
  const [formData, setFormData] = useState({
    name: '', email: '', address: '', city: '', zip: '', card: '', expiry: '', cvc: '', upiId: '',
  });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new order
    const shipping = cartTotal > 100 ? 0 : 10;
    const newOrder = {
      id: `ORD${Math.floor(Math.random() * 10000)}`,
      customer: formData.name,
      date: new Date().toISOString().split('T')[0],
      total: cartTotal + shipping,
      status: 'pending',
      items: cart.length
    };
    
    addOrder(newOrder);
    clearCart();
    setStep(3); // success
    setTimeout(() => {
      navigate('/orders');
    }, 3000);
  };

  return (
    <div className="checkout-page container">
      <div className="checkout-container card">
        {step === 1 && (
          <form onSubmit={handleNext}>
            <h2><Truck className="icon" /> Shipping Details</h2>
            <div className="form-group">
              <input name="name" placeholder="Full Name" required className="input" onChange={handleChange} />
            </div>
            <div className="form-group">
              <input name="address" placeholder="Address" required className="input" onChange={handleChange} />
            </div>
            <div className="form-row">
              <input name="city" placeholder="City" required className="input" onChange={handleChange} />
              <input name="zip" placeholder="ZIP Code" required className="input" onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-4">Continue to Payment</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <h2><CreditCard className="icon" /> Payment Info</h2>
            
            <div className="payment-options" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                <input type="radio" name="paymentMode" value="card" checked={paymentMode === 'card'} onChange={() => setPaymentMode('card')} />
                <CreditCard size={18} /> Credit/Debit Card
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                <input type="radio" name="paymentMode" value="upi" checked={paymentMode === 'upi'} onChange={() => setPaymentMode('upi')} />
                <Smartphone size={18} /> UPI
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                <input type="radio" name="paymentMode" value="online" checked={paymentMode === 'online'} onChange={() => setPaymentMode('online')} />
                <Globe size={18} /> Online Gateway
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                <input type="radio" name="paymentMode" value="bank" checked={paymentMode === 'bank'} onChange={() => setPaymentMode('bank')} />
                <Building size={18} /> Bank Transfer
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                <input type="radio" name="paymentMode" value="cod" checked={paymentMode === 'cod'} onChange={() => setPaymentMode('cod')} />
                <Banknote size={18} /> Cash on Delivery
              </label>
            </div>

            {paymentMode === 'card' && (
              <div className="payment-details">
                <div className="form-group">
                  <input name="card" placeholder="Card Number" required className="input" onChange={handleChange} />
                </div>
                <div className="form-row">
                  <input name="expiry" placeholder="MM/YY" required className="input" onChange={handleChange} />
                  <input name="cvc" placeholder="CVC" required className="input" type="password" onChange={handleChange} />
                </div>
              </div>
            )}

            {paymentMode === 'upi' && (
              <div className="payment-details">
                <div className="form-group">
                  <input name="upiId" placeholder="Enter UPI ID (e.g. name@okhdfcbank)" required className="input" onChange={handleChange} />
                </div>
              </div>
            )}

            {paymentMode === 'online' && (
              <div className="payment-details" style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginBottom: '15px' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>You will be redirected to our secure payment gateway after placing the order.</p>
              </div>
            )}

            {paymentMode === 'bank' && (
              <div className="payment-details" style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginBottom: '15px' }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', fontWeight: 'bold' }}>Transfer to:</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#555' }}>Account Name: PlantHub Inc.<br/>Account No: 123456789012<br/>IFSC: SBIN0001234<br/>Bank: State Bank of India</p>
              </div>
            )}

            {paymentMode === 'cod' && (
              <div className="payment-details" style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginBottom: '15px' }}>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>Please keep exact change ready. A nominal COD fee may apply.</p>
              </div>
            )}

            <div className="button-group mt-4">
              <button type="button" onClick={() => setStep(1)} className="btn btn-secondary">Back</button>
              <button type="submit" className="btn btn-primary">Place Order ({formatCurrency(cartTotal + (cartTotal > 100 ? 0 : 10))})</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="success-message text-center">
            <CheckCircle size={64} className="text-success mb-4 mx-auto" style={{ color: 'var(--primary-color)' }} />
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase. Redirecting to your orders...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
