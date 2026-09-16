import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, ShoppingCart, Info, Droplets, Sun, Ruler, Package } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatters';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Add multiple quantities
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: 'var(--space-12) 0', textAlign: 'center' }}>
        <h2>Loading plant details... 🌿</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: 'var(--space-12) 0', textAlign: 'center' }}>
        <h2>Plant not found</h2>
        <p>Sorry, the plant you are looking for does not exist.</p>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>Back to Shop</Link>
      </div>
    );
  }

  // Dynamic placeholders for height and pot size based on category
  let expectedHeight = "12 - 18 inches";
  let potSize = "6 inch standard nursery pot";
  if (product.category === 'Fruit') {
    expectedHeight = "2 - 3 feet (Grafted)";
    potSize = "8 inch grow bag / pot";
  } else if (product.category === 'Indoor') {
    expectedHeight = "15 - 24 inches";
    potSize = "7 inch premium pot";
  } else if (product.category === 'Succulent') {
    expectedHeight = "4 - 8 inches";
    potSize = "4 inch ceramic / plastic pot";
  }

  // Dynamic Care Instructions based on carelevel
  let watering = "Water once a week or when topsoil feels dry.";
  if (product.carelevel === 'Beginner' || product.category === 'Succulent') {
    watering = "Water sparingly (every 2-3 weeks). Let soil dry out completely before watering again.";
  } else if (product.carelevel === 'Advanced') {
    watering = "Requires consistent moisture. Do not let soil dry out entirely, but avoid waterlogging.";
  }

  return (
    <div className="container page-enter" style={{ padding: 'var(--space-8) 0' }}>
      <button 
        className="btn btn-ghost" 
        onClick={() => navigate('/shop')} 
        style={{ marginBottom: 'var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
      >
        <ArrowLeft size={20} /> Back to Shop
      </button>

      <div className="grid grid-2" style={{ gap: 'var(--space-10)', alignItems: 'start' }}>
        
        {/* Product Image Gallery */}
        <div className="product-gallery animate-slide-right" style={{ position: 'relative', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
          <img 
            src={product.image || 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800'} 
            alt={product.name} 
            style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block' }}
          />
          {product.stock < 10 && (
             <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
               <span className="badge badge-solid-warning" style={{ padding: '8px 12px', fontSize: '1rem' }}>Low Stock</span>
             </div>
          )}
        </div>

        {/* Product Info & Cart */}
        <div className="product-details animate-slide-left">
          <div className="badge" style={{ marginBottom: 'var(--space-2)' }}>{product.category}</div>
          <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-2)', lineHeight: '1.2' }}>{product.name}</h1>
          
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-700)', marginBottom: 'var(--space-6)' }}>
            {formatCurrency(product.price)}
          </div>
          
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: 'var(--space-8)' }}>
            {product.description}
          </p>

          <div style={{ background: 'var(--bg-secondary)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', marginBottom: 'var(--space-8)' }}>
            <h3 style={{ marginBottom: 'var(--space-4)', fontSize: '1.2rem' }}>Purchase Options</h3>
            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'white', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ padding: '10px 15px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>-</button>
                <span style={{ padding: '10px 20px', fontWeight: 'bold', borderLeft: '1px solid var(--border-light)', borderRight: '1px solid var(--border-light)' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ padding: '10px 15px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>+</button>
              </div>
              
              <button 
                className={`btn btn-lg ${added ? 'btn-success' : 'btn-primary'}`} 
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart size={20} />
                {added ? 'Added to Cart!' : (product.stock > 0 ? 'Add to Cart' : 'Out of Stock')}
              </button>
            </div>
          </div>

          {/* Key Specifications */}
          <div style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Ruler className="text-primary-600" />
              <div>
                <div style={{ fontWeight: 'bold' }}>Expected Delivery Height</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{expectedHeight} (including pot)</div>
              </div>
            </div>
            <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Package className="text-primary-600" />
              <div>
                <div style={{ fontWeight: 'bold' }}>Pot Information</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{potSize}</div>
              </div>
            </div>
            <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Sun className="text-primary-600" />
              <div>
                <div style={{ fontWeight: 'bold' }}>Sunlight Needs</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{product.lightreq || product.lightReq || 'Moderate Light'}</div>
              </div>
            </div>
            <div style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Droplets className="text-primary-600" />
              <div>
                <div style={{ fontWeight: 'bold' }}>Water & Care</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{watering}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Detailed Plant Care Instructions */}
      <div style={{ marginTop: 'var(--space-12)', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-12)' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: 'var(--space-8)', textAlign: 'center' }}>Detailed Plant Care Instructions 🌿</h2>
        
        <div className="grid grid-3" style={{ gap: 'var(--space-6)' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'inline-flex', padding: '12px', background: 'white', borderRadius: '50%', color: 'var(--primary-600)', marginBottom: 'var(--space-4)' }}>
              <Sun size={24} />
            </div>
            <h3 style={{ marginBottom: 'var(--space-2)' }}>Light Requirements</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              For optimal growth, {product.name} prefers {product.lightreq || product.lightReq}. Place it in a spot where it receives adequate natural light without harsh afternoon sun burning the leaves.
            </p>
          </div>
          
          <div style={{ background: 'var(--bg-secondary)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'inline-flex', padding: '12px', background: 'white', borderRadius: '50%', color: 'var(--primary-600)', marginBottom: 'var(--space-4)' }}>
              <Droplets size={24} />
            </div>
            <h3 style={{ marginBottom: 'var(--space-2)' }}>Watering Routine</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {watering} Overwatering is the most common cause of plant issues. Ensure the pot has drainage holes to prevent root rot.
            </p>
          </div>
          
          <div style={{ background: 'var(--bg-secondary)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'inline-flex', padding: '12px', background: 'white', borderRadius: '50%', color: 'var(--primary-600)', marginBottom: 'var(--space-4)' }}>
              <Info size={24} />
            </div>
            <h3 style={{ marginBottom: 'var(--space-2)' }}>General Care</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              This plant has a care level of <strong>{product.carelevel || product.careLevel}</strong>. Wipe the leaves periodically to remove dust. Feed with a balanced liquid fertilizer once a month during the growing season.
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
