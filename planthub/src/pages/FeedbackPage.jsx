import { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';

const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="feedback-page container pt-8 pb-16 max-w-md mx-auto">
      <div className="card card-glass">
        <h1 className="text-center">Leave Feedback</h1>
        
        {submitted ? (
          <div className="success-message text-center mt-8">
            <h2 className="text-success">Thank you!</h2>
            <p>Your feedback helps us grow better every day.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="form-group text-center">
              <label>How would you rate your experience?</label>
              <div className="star-rating mt-4">
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={index <= (hover || rating) ? "star on" : "star off"}
                      onClick={() => setRating(index)}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(rating)}
                    >
                      <Star size={32} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-group mt-6">
              <label>Category</label>
              <select className="input">
                <option>Product Quality</option>
                <option>Delivery Experience</option>
                <option>Customer Service</option>
                <option>Website/App Experience</option>
              </select>
            </div>

            <div className="form-group mt-4">
              <label>Tell us more</label>
              <textarea className="input" rows="4" placeholder="What did you love? What could we improve?" required></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-block mt-6" disabled={rating === 0}>
              <MessageSquare size={18} /> Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
