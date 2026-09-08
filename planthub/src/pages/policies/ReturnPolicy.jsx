const ReturnPolicy = () => {
  return (
    <div className="policy-page container pt-8 pb-16 max-w-3xl mx-auto">
      <h1 className="mb-8 text-center">Return & Refund Policy</h1>
      
      <div className="card content-formatted">
        <p className="text-muted mb-6">Last Updated: October 24, 2024</p>
        
        <h2>30-Day Plant Guarantee</h2>
        <p>We take pride in the health and quality of our plants. If your plant arrives damaged or dies within the first 30 days of receipt despite proper care, we will replace it or issue a full refund.</p>

        <h2>How to Start a Return</h2>
        <ol>
          <li>Take clear photos of the damaged/dead plant and the packaging.</li>
          <li>Email our support team at support@planthub.com within the 30-day window.</li>
          <li>Include your order number and photos in the email.</li>
          <li>Our team will review your request within 48 hours.</li>
        </ol>

        <h2>Non-Plant Items</h2>
        <p>Pots, tools, and accessories can be returned within 30 days of purchase in unused condition with original packaging. Return shipping costs for non-plant items are the responsibility of the customer unless the item arrived defective.</p>

        <h2>Refund Processing</h2>
        <p>Approved refunds will be processed back to your original payment method within 3-5 business days.</p>
      </div>
    </div>
  );
};

export default ReturnPolicy;
