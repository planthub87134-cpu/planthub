import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', address: '', city: '', zip: '', card: '', expiry: '', cvc: ''
  });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
            <div className="form-group">
              <input name="card" placeholder="Card Number" required className="input" onChange={handleChange} />
            </div>
            <div className="form-row">
              <input name="expiry" placeholder="MM/YY" required className="input" onChange={handleChange} />
              <input name="cvc" placeholder="CVC" required className="input" type="password" onChange={handleChange} />
            </div>
            <div className="button-group mt-4">
              <button type="button" onClick={() => setStep(1)} className="btn btn-secondary">Back</button>
              <button type="submit" className="btn btn-primary">Place Order</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="success-message text-center">
            <CheckCircle size={64} className="text-success mb-4 mx-auto" />
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase. Redirecting to your orders...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
