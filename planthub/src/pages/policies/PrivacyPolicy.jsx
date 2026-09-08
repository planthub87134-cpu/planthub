const PrivacyPolicy = () => {
  return (
    <div className="policy-page container pt-8 pb-16 max-w-3xl mx-auto">
      <h1 className="mb-8 text-center">Privacy Policy</h1>
      
      <div className="card content-formatted">
        <p className="text-muted mb-6">Last Updated: October 24, 2024</p>
        
        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly to us when you create an account, make a purchase, or contact us for support. This includes:</p>
        <ul>
          <li>Name and email address</li>
          <li>Shipping and billing address</li>
          <li>Payment information (processed securely by our payment partners)</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process your orders and manage your account</li>
          <li>Communicate with you about products, services, and promotions</li>
          <li>Improve our website and customer service</li>
        </ul>

        <h2>3. Data Sharing</h2>
        <p>We do not sell your personal information. We may share data with service providers who help us operate our business, such as shipping carriers and payment processors.</p>

        <h2>4. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise these rights.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
