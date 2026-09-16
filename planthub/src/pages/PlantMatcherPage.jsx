import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { Sun, Home, Droplets, ArrowRight, RefreshCcw, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

const QUESTIONS = [
  {
    id: 'placement',
    title: 'Aapko kahan plant rakhna hai? (Placement)',
    icon: <Home size={32} className="text-primary-600" />,
    options: [
      { label: 'Indoor (Ghar ke andar)', value: 'Indoor' },
      { label: 'Outdoor (Bahar/Balcony)', value: 'Outdoor' }
    ]
  },
  {
    id: 'sunlight',
    title: 'Aapke ghar/jagah me kaisi dhup aati hai? (Sunlight)',
    icon: <Sun size={32} className="text-warning-500" />,
    options: [
      { label: 'Full Sun (Tej dhup - 6+ hours)', value: 'high' },
      { label: 'Indirect Light (Halki roshni)', value: 'medium' },
      { label: 'Low Light (Bohot kam roshni)', value: 'low' }
    ]
  },
  {
    id: 'watering',
    title: 'Aap kitna pani de sakte hain? (Care/Watering)',
    icon: <Droplets size={32} className="text-info-500" />,
    options: [
      { label: 'I easily forget (Kam pani wale paudhe)', value: 'easy' },
      { label: '1-2 times a week (Regular watering)', value: 'moderate' },
      { label: 'I can give daily care', value: 'advanced' }
    ]
  }
];

export default function PlantMatcherPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isMatching, setIsMatching] = useState(false);
  const [matchedPlants, setMatchedPlants] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    // Fetch all products once to filter later
    const fetchAll = async () => {
      const { data } = await supabase.from('products').select('*');
      if (data) setAllProducts(data);
    };
    fetchAll();
  }, []);

  const handleOptionSelect = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      findMatches({ ...answers, [questionId]: value });
    }
  };

  const findMatches = (finalAnswers) => {
    setIsMatching(true);
    
    // Simulate AI thinking time for effect
    setTimeout(() => {
      const filtered = allProducts.filter(p => {
        let match = true;
        
        // 1. Placement Match
        if (finalAnswers.placement === 'Indoor') {
          if (!['Indoor', 'Succulent'].includes(p.category)) match = false;
        } else {
          if (!['Fruit', 'Herb'].includes(p.category)) match = false;
        }

        // 2. Sunlight Match
        if (finalAnswers.sunlight === 'high') {
          if (p.lightreq !== 'Full Sun' && p.lightreq !== 'Bright Direct') match = false;
        } else if (finalAnswers.sunlight === 'low') {
          if (p.lightreq !== 'Low to Bright' && p.lightreq !== 'Bright Indirect') match = false;
        }

        // 3. Watering / Care Match
        if (finalAnswers.watering === 'easy') {
          if (p.carelevel !== 'Easy' && p.carelevel !== 'Beginner') match = false;
        } else if (finalAnswers.watering === 'advanced') {
           // allow all for advanced, but if they want easy they shouldn't get advanced
        }

        return match;
      });

      // If strict filter leaves nothing, loosen the rules (fallback)
      if (filtered.length === 0) {
         const fallback = allProducts.filter(p => {
            if (finalAnswers.placement === 'Indoor') return ['Indoor', 'Succulent'].includes(p.category);
            return ['Fruit', 'Herb'].includes(p.category);
         });
         setMatchedPlants(fallback.slice(0, 3));
      } else {
         setMatchedPlants(filtered.slice(0, 3));
      }
      
      setIsMatching(false);
      setCurrentStep(QUESTIONS.length); // Move to results step
    }, 1500);
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setMatchedPlants([]);
  };

  return (
    <div className="container page-enter" style={{ padding: 'var(--space-12) 0', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      
      {currentStep < QUESTIONS.length && (
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>AI Plant Matcher <Sparkles className="text-primary-500" size={32} style={{ display: 'inline' }} /></h1>
          <p style={{ color: 'var(--text-secondary)' }}>Find your perfect green companion in 3 simple steps.</p>
        </div>
      )}

      {/* Quiz Area */}
      {currentStep < QUESTIONS.length ? (
        <div className="card" style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', border: '2px solid var(--primary-100)', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
            <div style={{ padding: '20px', background: 'var(--primary-50)', borderRadius: '50%' }}>
              {QUESTIONS[currentStep].icon}
            </div>
          </div>
          
          <h2 style={{ fontSize: '1.8rem', marginBottom: 'var(--space-8)' }}>
            {QUESTIONS[currentStep].title}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {QUESTIONS[currentStep].options.map((opt) => (
              <button 
                key={opt.value}
                className="btn btn-outline btn-lg"
                style={{ 
                  justifyContent: 'space-between', 
                  padding: '20px', 
                  fontSize: '1.2rem',
                  borderColor: answers[QUESTIONS[currentStep].id] === opt.value ? 'var(--primary-600)' : 'var(--border-light)',
                  backgroundColor: answers[QUESTIONS[currentStep].id] === opt.value ? 'var(--primary-50)' : 'transparent'
                }}
                onClick={() => handleOptionSelect(QUESTIONS[currentStep].id, opt.value)}
              >
                {opt.label} <ArrowRight size={20} className={answers[QUESTIONS[currentStep].id] === opt.value ? 'text-primary-600' : 'text-muted'} />
              </button>
            ))}
          </div>

          <div style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {QUESTIONS.map((_, idx) => (
              <div 
                key={idx} 
                style={{ 
                  width: '40px', height: '6px', borderRadius: '3px',
                  backgroundColor: idx <= currentStep ? 'var(--primary-500)' : 'var(--border-light)',
                  transition: 'background-color 0.3s ease'
                }} 
              />
            ))}
          </div>
        </div>
      ) : isMatching ? (
        <div style={{ padding: 'var(--space-12) 0' }}>
          <Sparkles size={48} className="text-primary-500 animate-pulse" style={{ margin: '0 auto', marginBottom: 'var(--space-4)' }} />
          <h2>Finding your perfect match...</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Analyzing your home conditions...</p>
        </div>
      ) : (
        /* Results Area */
        <div className="animate-slide-up">
          <div style={{ marginBottom: 'var(--space-10)' }}>
            <div className="badge badge-success" style={{ marginBottom: 'var(--space-4)', fontSize: '1.2rem', padding: '8px 16px' }}>Match Complete! 🎉</div>
            <h1 style={{ fontSize: '2.5rem' }}>We Found Your Perfect Plants</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Based on your answers, these plants will thrive in your home.</p>
          </div>

          <div className="grid grid-3" style={{ gap: 'var(--space-6)', textAlign: 'left' }}>
            {matchedPlants.map(product => (
              <div key={product.id} className="card product-card">
                <div className="product-image" style={{ height: '200px' }}>
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info" style={{ padding: 'var(--space-4)' }}>
                  <h3 style={{ fontSize: '1.2rem' }}>{product.name}</h3>
                  <p className="category">{product.category}</p>
                  <Link to={`/product/${product.id}`} className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: 'var(--space-4)' }}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
            {matchedPlants.length === 0 && (
              <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: 'var(--space-8)' }}>
                <h3>No exact matches found</h3>
                <p>Try loosening your requirements.</p>
              </div>
            )}
          </div>

          <button onClick={resetQuiz} className="btn btn-outline" style={{ marginTop: 'var(--space-10)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCcw size={18} /> Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
}
