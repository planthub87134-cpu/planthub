import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Truck, CheckCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatters';
import { supabase } from '../lib/supabase';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, addOrder, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: '', zip: ''
  });

  const shipping = cartTotal > 999 ? 0 : 99;
  const finalTotal = cartTotal + shipping;

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const saveOrderToSupabase = async (paymentId) => {
    const orderId = `ORD${Math.floor(Math.random() * 10000)}`;
    
    const dbOrder = {
      id: orderId,
      total: finalTotal,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      trackingnumber: `TRK-PH-${Math.floor(Math.random() * 10000)}`
    };

    if (supabase) {
      try {
        const { error: orderError } = await supabase.from('orders').insert(dbOrder);
        if (orderError) {
          console.error('Error creating order:', orderError);
          alert('Failed to place order in database.');
          setIsProcessing(false);
          return;
        }

        const orderItems = cart.map(item => ({
          order_id: orderId,
          product_id: item.id,
          qty: item.qty,
          price: item.price,
          name: item.name,
          image: item.image
        }));

        await supabase.from('order_items').insert(orderItems);
      } catch (err) {
        console.error('Supabase error:', err);
      }
    } else {
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    addOrder({ ...dbOrder, trackingNumber: dbOrder.trackingnumber, items: cart, paymentId });
    clearCart();
    setStep(3);
    setIsProcessing(false);
    setTimeout(() => {
      navigate('/orders');
    }, 3000);
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Check your connection.');
      setIsProcessing(false);
      return;
    }

    const rzpKey = import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_dummy_key';

    if (rzpKey === 'rzp_test_dummy_key') {
      alert("Note: Using a dummy Razorpay key. The payment modal will open but might show an 'Invalid Key' error. Update VITE_RAZORPAY_KEY in .env to fix this.");
    }

    const options = {
      key: rzpKey,
      amount: finalTotal * 100, // paise
      currency: 'INR',
      name: 'PlantHub',
      description: 'Premium Plant Purchase',
      image: 'https://cdn-icons-png.flaticon.com/512/628/628283.png',
      handler: async function (response) {
        await saveOrderToSupabase(response.razorpay_payment_id);
      },
      prefill: {
        name: formData.name,
        email: formData.email || 'customer@planthub.com',
        contact: formData.phone || '9999999999'
      },
      notes: {
        address: formData.address
      },
      theme: {
        color: '#10b981'
      }
    };

    try {
      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        console.error(response.error);
        alert(`Payment failed: ${response.error.description}`);
        setIsProcessing(false);
      });
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert('Error opening Razorpay. Falling back to mock success.');
      await saveOrderToSupabase('mock_pay_fallback');
    }
  };

  return (
    <div className="checkout-page container page-enter" style={{ padding: 'var(--space-8) 0' }}>
      {step < 3 && <h1 style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>Complete Your Order</h1>}

      {step === 3 ? (
        <div className="checkout-container card" style={{ maxWidth: '600px', margin: '0 auto', padding: 'var(--space-8)' }}>
          <div className="success-message text-center">
            <CheckCircle size={80} className="text-success mb-4 mx-auto" style={{ color: 'var(--primary-color)' }} />
            <h2 style={{ marginBottom: 'var(--space-4)' }}>Payment Successful!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Thank you for shopping with PlantHub. Redirecting to your orders...</p>
          </div>
        </div>
      ) : (
        <div className="checkout-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 'var(--space-8)',
          alignItems: 'start' 
        }}>
          {/* Left Column: Form */}
          <div className="checkout-form-section card" style={{ padding: 'var(--space-6)' }}>
            {step === 1 && (
              <form onSubmit={handleNext}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-6)' }}>
                  <Truck className="icon" /> Shipping Details
                </h2>
                <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                  <input name="name" placeholder="Full Name" required className="input" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <input name="email" type="email" placeholder="Email Address" required className="input" value={formData.email} onChange={handleChange} />
                  <input name="phone" type="tel" placeholder="Phone Number" required className="input" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                  <input name="address" placeholder="Complete Address" required className="input" value={formData.address} onChange={handleChange} />
                </div>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                  <input name="city" placeholder="City" required className="input" value={formData.city} onChange={handleChange} />
                  <input name="zip" placeholder="ZIP Code" required className="input" value={formData.zip} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary btn-block" style={{ width: '100%' }}>Continue to Payment</button>
              </form>
            )}

            {step === 2 && (
              <div>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-6)' }}>
                  <ShieldCheck className="icon" /> Secure Checkout
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
                  You will be redirected to the secure <strong>Razorpay</strong> payment gateway to complete your purchase. All major Credit/Debit cards, UPI (GPay, PhonePe, Paytm), and Netbanking are supported.
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  <button type="button" onClick={() => setStep(1)} className="btn btn-secondary" style={{ flex: 1 }} disabled={isProcessing}>Back</button>
                  <button type="button" onClick={handlePayment} className="btn btn-primary" style={{ flex: 2 }} disabled={isProcessing}>
                    {isProcessing ? 'Opening Razorpay...' : `Pay ${formatCurrency(finalTotal)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="order-summary-section card" style={{ padding: 'var(--space-6)', backgroundColor: '#f8fafc' }}>
            <h3 style={{ marginBottom: 'var(--space-6)' }}>Order Summary</h3>
            <div className="summary-items" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', maxHeight: '300px', overflowY: 'auto' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 'var(--font-bold)', margin: 0 }}>{item.name}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Qty: {item.qty}</p>
                  </div>
                  <p style={{ fontWeight: 'var(--font-bold)', margin: 0 }}>{formatCurrency(item.price * item.qty)}</p>
                </div>
              ))}
            </div>
            
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-4)', fontSize: '1.2rem', fontWeight: 'var(--font-bold)' }}>
                <span>Total</span>
                <span style={{ color: 'var(--primary-color)' }}>{formatCurrency(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
