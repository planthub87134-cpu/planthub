import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { 
  ArrowLeft, ShoppingCart, Info, Droplets, Sun, Ruler, Package, MapPin, 
  ShieldCheck, Truck, Star, Heart, Zap, Check, ZoomIn, ZoomOut, Maximize2, 
  X, ChevronLeft, ChevronRight, Wind, Sparkles, Smile, ShieldAlert, Layers, RefreshCw
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { formatCurrency } from '../utils/formatters';
import { MOCK_REVIEWS } from '../utils/reviewsData';
import { PRODUCTS } from '../utils/constants';

const SIZE_OPTIONS = {
  Small: { 
    id: 'Small',
    label: 'Small', 
    pot: '6" Nursery Pot', 
    height: '8 - 12 inches', 
    multiplier: 0.85, 
    desc: 'Compact size, perfect for desks & window sills' 
  },
  Medium: { 
    id: 'Medium',
    label: 'Medium', 
    pot: '8"-10" Standard Pot', 
    height: '14 - 20 inches', 
    multiplier: 1.0, 
    desc: 'Standard healthy plant size for tables & stands' 
  },
  Large: { 
    id: 'Large',
    label: 'Large', 
    pot: '12"-14" Premium Pot', 
    height: '24 - 32 inches', 
    multiplier: 1.45, 
    desc: 'Lush statement plant for floor corners & entryways' 
  }
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  
  // Reviews & Feedback
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, text: '', name: '', title: '' });

  // Zoom Lens & Lightbox State
  const [hoverZoom, setHoverZoom] = useState({ active: false, x: 0, y: 0 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxScale, setLightboxScale] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        let foundProduct = null;
        if (id) {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

          if (!error && data) {
            foundProduct = data;
          }
        }

        // Fallback to local products array if not found in Supabase
        if (!foundProduct) {
          const numericId = Number(id);
          foundProduct = PRODUCTS.find(p => p.id === numericId || String(p.id) === String(id));
        }

        setProduct(foundProduct || null);
      } catch (err) {
        console.error('Error fetching product:', err);
        const numericId = Number(id);
        const foundProduct = PRODUCTS.find(p => p.id === numericId || String(p.id) === String(id));
        setProduct(foundProduct || null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: 'var(--space-16) 0', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', animation: 'spin 1.2s linear infinite', fontSize: '2.5rem', marginBottom: '1rem' }}>
          🌿
        </div>
        <h2 style={{ color: 'var(--primary-700)', fontFamily: 'Outfit, sans-serif' }}>Loading plant details...</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Gathering care instructions & fresh photos</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: 'var(--space-16) 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: 'var(--space-4)' }}>Plant Not Found 🌵</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
          Sorry, the plant you are looking for is unavailable or has been moved.
        </p>
        <Link to="/shop" className="btn btn-primary">
          <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Explore All Plants
        </Link>
      </div>
    );
  }

  // Gallery Photos
  const galleryImages = product.images && Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [
        product.image || 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800'
      ];

  const currentSizeObj = SIZE_OPTIONS[selectedSize] || SIZE_OPTIONS.Medium;
  const activePrice = Math.round(product.price * currentSizeObj.multiplier);
  const mrpPrice = Math.round(activePrice * 1.32);
  const discountPercent = Math.round(((mrpPrice - activePrice) / mrpPrice) * 100);

  // Dynamic Care Info
  const lightRequirement = product.lightreq || product.lightReq || 'Bright Indirect Sunlight';
  const careLevel = product.carelevel || product.careLevel || 'Easy Care';
  const wateringGuide = careLevel === 'Beginner' || product.category === 'Succulent'
    ? 'Water sparingly once every 2-3 weeks. Allow soil to dry out fully before re-watering.'
    : careLevel === 'Advanced'
    ? 'Keep soil consistently moist (not waterlogged). Mist leaves daily for humidity.'
    : 'Water once a week or when top 1-2 inches of soil feels dry to touch.';

  const soilGuide = product.category === 'Succulent'
    ? 'Porous succulent mix with 60% perlite, sand & pumice for rapid drainage.'
    : 'Rich organic potting mix blended with coco-peat, vermicompost & perlite.';

  // Related plants
  const relatedPlants = PRODUCTS
    .filter(p => p.id !== product.id && (p.category === product.category || p.careLevel === careLevel))
    .slice(0, 4);

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      price: activePrice,
      selectedSize: selectedSize,
      selectedPot: currentSizeObj.pot,
      image: galleryImages[activeImageIndex] || product.image
    };
    addToCart(cartItem, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    const cartItem = {
      ...product,
      price: activePrice,
      selectedSize: selectedSize,
      selectedPot: currentSizeObj.pot,
      image: galleryImages[activeImageIndex] || product.image
    };
    addToCart(cartItem, qty);
    navigate('/checkout');
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (!newReview.text.trim()) return;
    const review = {
      id: Date.now(),
      name: newReview.name || "Happy Planter",
      avatar: (newReview.name || "HP").substring(0, 2).toUpperCase(),
      rating: newReview.rating,
      date: "Just Now",
      title: newReview.title || "Wonderful addition to home!",
      text: newReview.text,
      image: null
    };
    setReviews([review, ...reviews]);
    setShowReviewForm(false);
    setNewReview({ rating: 5, text: '', name: '', title: '' });
  };

  const checkPincode = () => {
    if (pincode.length !== 6) {
      setDeliveryStatus({ type: 'error', msg: 'Please enter a valid 6-digit Pincode.' });
      return;
    }
    if (pincode.startsWith('9')) {
      setDeliveryStatus({ type: 'error', msg: 'Delivery is currently delayed in this region.' });
    } else {
      setDeliveryStatus({ type: 'success', msg: 'Free Express Delivery Available! Delivered in 2-4 business days 🚚' });
    }
  };

  // Zoom Lens Event
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setHoverZoom({ active: true, x, y });
  };

  const handleMouseLeave = () => {
    setHoverZoom({ active: false, x: 0, y: 0 });
  };

  return (
    <div className="container page-enter" style={{ padding: 'var(--space-6) 0 var(--space-16) 0' }}>
      
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
        <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
        <span>/</span>
        <Link to="/shop" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Shop</Link>
        <span>/</span>
        <span style={{ color: 'var(--primary-700)', fontWeight: '600' }}>{product.name}</span>
      </div>

      <button 
        className="btn btn-ghost" 
        onClick={() => navigate('/shop')} 
        style={{ marginBottom: 'var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
      >
        <ArrowLeft size={18} /> Back to Shop
      </button>

      {/* Main Grid: Gallery & Main Info */}
      <div className="grid grid-2" style={{ gap: 'var(--space-10)', alignItems: 'start' }}>
        
        {/* Left Column: Photo Gallery with Hover Zoom */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div 
            className="product-main-image-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => { setLightboxScale(1.5); setLightboxOpen(true); }}
            style={{ 
              position: 'relative', 
              borderRadius: 'var(--radius-2xl)', 
              overflow: 'hidden', 
              boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.12)',
              cursor: 'zoom-in',
              background: '#f1f5f9',
              height: '480px'
            }}
          >
            <img 
              src={galleryImages[activeImageIndex]} 
              alt={product.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />

            {/* Hover Magnifier Zoom Lens */}
            {hoverZoom.active && (
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  backgroundImage: `url(${galleryImages[activeImageIndex]})`,
                  backgroundPosition: `${hoverZoom.x}% ${hoverZoom.y}%`,
                  backgroundSize: '250%',
                  backgroundRepeat: 'no-repeat',
                  borderRadius: 'var(--radius-2xl)',
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
                }}
              />
            )}

            {/* Zoom Badge Indicator */}
            <div style={{ 
              position: 'absolute', 
              bottom: '16px', 
              right: '16px', 
              background: 'rgba(0, 0, 0, 0.65)', 
              color: 'white', 
              padding: '6px 12px', 
              borderRadius: '20px', 
              fontSize: '0.8rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              backdropFilter: 'blur(4px)'
            }}>
              <ZoomIn size={14} /> Hover / Click to Zoom
            </div>

            {/* Stock Badge Overlay */}
            <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
              <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
                {product.category}
              </span>
              {product.stock <= 5 && product.stock > 0 && (
                <span className="badge badge-solid-warning" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
                  Only {product.stock} Left!
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails Strip */}
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: activeImageIndex === idx ? '3px solid var(--primary-600)' : '2px solid transparent',
                  padding: 0,
                  cursor: 'pointer',
                  opacity: activeImageIndex === idx ? 1 : 0.7,
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Plant Info, Size Options & Action Buttons */}
        <div className="product-details animate-slide-left">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className="badge badge-outline" style={{ marginBottom: 'var(--space-2)' }}>{careLevel} • {product.category}</span>
              <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-1)', lineHeight: '1.2', color: 'var(--text-primary)' }}>
                {product.name}
              </h1>
              <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 'var(--space-3)' }}>
                Botanical Specimen: {product.scientificName || `${product.name} (L.)`}
              </p>
            </div>
            
            <button 
              className={`btn ${isInWishlist(product.id) ? 'btn-secondary' : 'btn-ghost'}`}
              onClick={() => toggleWishlist(product)}
              style={{ borderRadius: '50%', width: '44px', height: '44px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Add to Wishlist"
            >
              <Heart size={22} fill={isInWishlist(product.id) ? 'var(--danger-500)' : 'none'} color={isInWishlist(product.id) ? 'var(--danger-500)' : 'currentColor'} />
            </button>
          </div>

          {/* Rating Summary */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'flex', color: 'var(--warning-500)' }}>
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>4.9</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>• {reviews.length} Customer Reviews</span>
          </div>

          {/* Pricing Row */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'var(--primary-700)' }}>
              {formatCurrency(activePrice)}
            </span>
            <span style={{ fontSize: '1.25rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
              {formatCurrency(mrpPrice)}
            </span>
            <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.9rem' }}>
              {discountPercent}% OFF
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', width: '100%', marginTop: '-6px' }}>
              Inclusive of all taxes. Free safe packaging included.
            </span>
          </div>

          {/* Plant Description */}
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: 'var(--space-6)' }}>
            {product.description || `Bring fresh energy and natural beauty into your living space with this premium ${product.name}. Carefully grown and nurtured for healthy root growth.`}
          </p>

          {/* Size Options (Small, Medium, Large) */}
          <div style={{ background: 'var(--bg-secondary)', padding: 'var(--space-5)', borderRadius: 'var(--radius-xl)', marginBottom: 'var(--space-6)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
              <label style={{ fontWeight: 'bold', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Ruler size={18} className="text-primary-600" /> Choose Plant Size:
              </label>
              <span style={{ fontSize: '0.85rem', color: 'var(--primary-700)', fontWeight: '600' }}>
                Height: {currentSizeObj.height}
              </span>
            </div>

            <div className="grid grid-3" style={{ gap: '10px' }}>
              {Object.keys(SIZE_OPTIONS).map((sizeKey) => {
                const opt = SIZE_OPTIONS[sizeKey];
                const isSelected = selectedSize === sizeKey;
                const optPrice = Math.round(product.price * opt.multiplier);

                return (
                  <button
                    key={sizeKey}
                    type="button"
                    onClick={() => setSelectedSize(sizeKey)}
                    style={{
                      background: isSelected ? 'white' : 'transparent',
                      border: isSelected ? '2px solid var(--primary-600)' : '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '12px 10px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 4px 12px rgba(22, 101, 52, 0.12)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: isSelected ? 'var(--primary-700)' : 'var(--text-primary)' }}>
                        {opt.label}
                      </span>
                      {isSelected && <Check size={16} className="text-primary-600" />}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      {opt.pot}
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--primary-600)' }}>
                      {formatCurrency(optPrice)}
                    </div>
                  </button>
                );
              })}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 'var(--space-3)', margin: '8px 0 0 0' }}>
              💡 <em>{currentSizeObj.desc}</em>
            </p>
          </div>

          {/* Stock Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-6)' }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: product.stock > 0 ? '#22c55e' : '#ef4444',
              display: 'inline-block'
            }} />
            <span style={{ fontWeight: '600', fontSize: '0.95rem', color: product.stock > 0 ? '#15803d' : '#b91c1c' }}>
              {product.stock > 10 ? 'In Stock — Ready to Ship' : product.stock > 0 ? `In Stock (Only ${product.stock} items left!)` : 'Currently Out of Stock'}
            </span>
          </div>

          {/* Add to Cart / Buy Now Action Buttons */}
          <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-8)', flexWrap: 'wrap' }}>
            
            {/* Quantity Selector */}
            <div style={{ display: 'flex', alignItems: 'center', background: 'white', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', height: '52px' }}>
              <button 
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))} 
                style={{ width: '40px', height: '100%', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold' }}
              >
                -
              </button>
              <span style={{ padding: '0 16px', fontWeight: 'bold', fontSize: '1.1rem', borderLeft: '1px solid var(--border-light)', borderRight: '1px solid var(--border-light)' }}>
                {qty}
              </span>
              <button 
                type="button"
                onClick={() => setQty(qty + 1)} 
                style={{ width: '40px', height: '100%', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold' }}
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button 
              className={`btn btn-lg ${added ? 'btn-success' : 'btn-primary'}`} 
              style={{ flex: 1, height: '52px', minWidth: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1.05rem' }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {added ? <Check size={22} /> : <ShoppingCart size={22} />}
              {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>

            {/* Buy Now Button */}
            <button 
              className="btn btn-lg btn-secondary" 
              style={{ flex: 1, height: '52px', minWidth: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1.05rem', background: '#eab308', color: '#1e293b', border: 'none' }}
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              <Zap size={22} fill="currentColor" />
              Buy Now
            </button>
          </div>

          {/* Delivery Availability Checker */}
          <div style={{ border: '1px solid var(--border-light)', padding: 'var(--space-5)', borderRadius: 'var(--radius-xl)', marginBottom: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-3)' }}>
              <MapPin className="text-primary-600" size={18} />
              <h4 style={{ fontSize: '1rem', margin: 0, fontWeight: 'bold' }}>Check Delivery Availability</h4>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                placeholder="Enter 6-digit Pincode" 
                className="input" 
                maxLength="6"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                style={{ flex: 1 }}
              />
              <button className="btn btn-secondary" onClick={checkPincode}>Check</button>
            </div>
            {deliveryStatus && (
              <div style={{ marginTop: 'var(--space-3)', fontSize: '0.9rem', color: deliveryStatus.type === 'success' ? 'var(--success-600)' : 'var(--error-600)', fontWeight: 'bold' }}>
                {deliveryStatus.msg}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Benefits & Care Highlights Grid */}
      <div style={{ marginTop: 'var(--space-12)', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-10)' }}>
        <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: 'var(--space-2)', fontFamily: 'Outfit, sans-serif' }}>
          Plant Benefits & Highlights 🌿
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>
          Why {product.name} is an extraordinary addition to your indoor garden
        </p>

        <div className="grid grid-4" style={{ gap: 'var(--space-6)' }}>
          <div className="card card-hover" style={{ padding: 'var(--space-5)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#dcfce7', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4) auto' }}>
              <Wind size={28} />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Air Purifying</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
              Filters harmful airborne toxins like Benzene, Formaldehyde & VOCs for cleaner air.
            </p>
          </div>

          <div className="card card-hover" style={{ padding: 'var(--space-5)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fef9c3', color: '#854d0e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4) auto' }}>
              <Sparkles size={28} />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Low Maintenance</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
              Forgiving & highly resilient. Perfect for beginners and busy lifestyle households.
            </p>
          </div>

          <div className="card card-hover" style={{ padding: 'var(--space-5)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#e0f2fe', color: '#075985', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4) auto' }}>
              <Smile size={28} />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Stress Reducer</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
              Promotes mindfulness, reduces mental fatigue, and boosts focus at work.
            </p>
          </div>

          <div className="card card-hover" style={{ padding: 'var(--space-5)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fce7f3', color: '#9d174d', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4) auto' }}>
              <ShieldCheck size={28} />
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Safe Transit</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
              Shipped in ventilated, crush-resistant eco-packaging with guaranteed live arrival.
            </p>
          </div>
        </div>
      </div>

      {/* Comprehensive Plant Care Guide (Water, Light, Soil) */}
      <div style={{ marginTop: 'var(--space-12)', background: 'var(--bg-secondary)', padding: 'var(--space-10)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-light)' }}>
        <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: 'var(--space-2)', fontFamily: 'Outfit, sans-serif' }}>
          Complete Care Guide 💧☀️🪴
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>
          Simple tips to keep your {product.name} thriving for years
        </p>

        <div className="grid grid-3" style={{ gap: 'var(--space-6)' }}>
          
          {/* Water */}
          <div style={{ background: 'white', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'inline-flex', padding: '12px', background: '#e0f2fe', borderRadius: '50%', color: '#0284c7', marginBottom: 'var(--space-4)' }}>
              <Droplets size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-2)' }}>Watering Needs</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              {wateringGuide}
            </p>
            <div style={{ marginTop: '12px', fontSize: '0.85rem', color: '#0284c7', fontWeight: 'bold' }}>
              💧 Frequency: 1-2 times per week
            </div>
          </div>

          {/* Sunlight */}
          <div style={{ background: 'white', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'inline-flex', padding: '12px', background: '#fef3c7', borderRadius: '50%', color: '#d97706', marginBottom: 'var(--space-4)' }}>
              <Sun size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-2)' }}>Sunlight Requirement</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              Requires <strong>{lightRequirement}</strong>. Place near an east or west-facing window for optimal growth. Avoid direct harsh sun.
            </p>
            <div style={{ marginTop: '12px', fontSize: '0.85rem', color: '#d97706', fontWeight: 'bold' }}>
              ☀️ Light: {lightRequirement}
            </div>
          </div>

          {/* Soil & Potting */}
          <div style={{ background: 'white', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'inline-flex', padding: '12px', background: '#dcfce7', borderRadius: '50%', color: '#15803d', marginBottom: 'var(--space-4)' }}>
              <Layers size={26} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-2)' }}>Soil & Repotting</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              {soilGuide} Repot into a 2-inch larger container every 12-18 months.
            </p>
            <div style={{ marginTop: '12px', fontSize: '0.85rem', color: '#15803d', fontWeight: 'bold' }}>
              🪴 Soil: Well-draining organic mix
            </div>
          </div>

        </div>
      </div>

      {/* Customer Reviews & Rating Section */}
      <div style={{ marginTop: 'var(--space-14)', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-10)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: 'var(--space-2)', fontFamily: 'Outfit, sans-serif' }}>Customer Reviews & Ratings ⭐</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', color: 'var(--warning-500)' }}>
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={22} fill="currentColor" />)}
              </div>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>4.9 out of 5</span>
              <span style={{ color: 'var(--text-muted)' }}>({reviews.length} Verified Buyer Reviews)</span>
            </div>
          </div>

          <button className="btn btn-outline" onClick={() => setShowReviewForm(!showReviewForm)}>
            Write a Review
          </button>
        </div>

        {/* Interactive Review Form */}
        {showReviewForm && (
          <form onSubmit={submitReview} className="card animate-slide-up" style={{ marginBottom: 'var(--space-8)', padding: 'var(--space-6)', border: '1px solid var(--primary-200)', background: 'var(--primary-50)' }}>
            <h3 style={{ marginBottom: 'var(--space-4)', fontSize: '1.2rem' }}>Write Your Plant Review</h3>
            
            <div style={{ display: 'flex', gap: '16px', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="input" 
                style={{ flex: 1, minWidth: '200px' }}
                value={newReview.name} 
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                required
              />
              <input 
                type="text" 
                placeholder="Review Title (e.g. Beautiful & Healthy!)" 
                className="input" 
                style={{ flex: 2, minWidth: '240px' }}
                value={newReview.title} 
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-4)' }}>
              <span style={{ fontWeight: 'bold' }}>Rating:</span>
              <div style={{ display: 'flex', gap: '6px', color: 'var(--warning-500)', cursor: 'pointer' }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <Star 
                    key={i} 
                    size={26} 
                    fill={i <= newReview.rating ? "currentColor" : "none"} 
                    onClick={() => setNewReview({ ...newReview, rating: i })}
                  />
                ))}
              </div>
            </div>

            <textarea 
              className="input" 
              placeholder="Tell us about your experience with this plant..." 
              style={{ width: '100%', minHeight: '100px', marginBottom: 'var(--space-4)' }}
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
              required
            />

            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <button type="submit" className="btn btn-primary">Submit Review</button>
              <button type="button" className="btn btn-ghost" onClick={() => setShowReviewForm(false)}>Cancel</button>
            </div>
          </form>
        )}

        {/* Customer Reviews List Grid */}
        <div className="grid grid-3" style={{ gap: 'var(--space-6)' }}>
          {reviews.map((review) => (
            <div key={review.id} className="card animate-slide-up" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 'var(--space-6)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-3)' }}>
                <div className="avatar" style={{ background: 'var(--primary-600)', color: 'white', fontWeight: 'bold' }}>
                  {review.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {review.name}
                    <span className="badge badge-success" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>Verified Buyer</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{review.date}</div>
                </div>
              </div>

              <div style={{ display: 'flex', color: 'var(--warning-500)', marginBottom: 'var(--space-2)' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} stroke={i < review.rating ? "currentColor" : "var(--gray-300)"} />
                ))}
              </div>

              {review.title && <h4 style={{ fontSize: '1rem', margin: '0 0 6px 0', fontWeight: 'bold' }}>{review.title}</h4>}

              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', flex: 1, marginBottom: 'var(--space-4)', fontSize: '0.95rem' }}>
                "{review.text}"
              </p>

              {review.image && (
                <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '140px', marginTop: 'auto' }}>
                  <img src={review.image} alt="Customer photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Related / Similar Plants Section */}
      {relatedPlants.length > 0 && (
        <div style={{ marginTop: 'var(--space-14)', borderTop: '1px solid var(--border-light)', paddingTop: 'var(--space-10)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '4px', fontFamily: 'Outfit, sans-serif' }}>You Might Also Like 🌿</h2>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Similar plants that complement this green companion</p>
            </div>
            <Link to="/shop" className="btn btn-ghost">View All Plants &rarr;</Link>
          </div>

          <div className="grid grid-4" style={{ gap: 'var(--space-6)' }}>
            {relatedPlants.map((item) => (
              <div key={item.id} className="card product-card card-hover" style={{ border: '1px solid var(--border-light)' }}>
                <div style={{ position: 'relative', height: '220px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: '#f1f5f9' }}>
                  <img 
                    src={item.image || 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800'} 
                    alt={item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>{item.category}</span>
                  </div>
                </div>

                <div style={{ padding: 'var(--space-4) 0 0 0' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {item.name}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-2)' }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary-700)', fontSize: '1.1rem' }}>
                      {formatCurrency(item.price)}
                    </span>
                    <Link to={`/product/${item.id}`} className="btn btn-secondary btn-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal for Full Screen Image Zoom */}
      {lightboxOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.92)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justify: 'center',
          padding: '20px'
        }}>
          {/* Close & Controls Header */}
          <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', color: 'white' }}>
            <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              {product.name} — Photo {activeImageIndex + 1} of {galleryImages.length}
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button 
                className="btn btn-ghost" 
                style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                onClick={() => setLightboxScale(prev => Math.min(prev + 0.5, 3))}
              >
                <ZoomIn size={20} /> Zoom In
              </button>
              <button 
                className="btn btn-ghost" 
                style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                onClick={() => setLightboxScale(prev => Math.max(prev - 0.5, 1))}
              >
                <ZoomOut size={20} /> Zoom Out
              </button>
              <button 
                className="btn btn-ghost" 
                style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                onClick={() => setLightboxScale(1)}
              >
                <RefreshCw size={18} /> Reset
              </button>
              <button 
                onClick={() => setLightboxOpen(false)}
                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Lightbox Main Canvas */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', width: '100%' }}>
            <img 
              src={galleryImages[activeImageIndex]} 
              alt="Zoomed view" 
              style={{ 
                maxHeight: '80vh', 
                maxWidth: '90vw', 
                transform: `scale(${lightboxScale})`,
                transition: 'transform 0.25s ease-out',
                borderRadius: '8px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            />
          </div>

          {/* Lightbox Footer Navigation */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <button 
              className="btn btn-outline"
              style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}
              onClick={() => setActiveImageIndex((activeImageIndex - 1 + galleryImages.length) % galleryImages.length)}
            >
              <ChevronLeft size={20} /> Previous Photo
            </button>
            <button 
              className="btn btn-outline"
              style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}
              onClick={() => setActiveImageIndex((activeImageIndex + 1) % galleryImages.length)}
            >
              Next Photo <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
