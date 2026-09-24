import React from 'react';
import { Link } from 'react-router';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { ShoppingCart, Trash2, HeartCrack } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="container" style={{ padding: 'var(--space-12) 0', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <HeartCrack size={64} style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-6)' }} />
        <h1 style={{ marginBottom: 'var(--space-4)' }}>Your Wishlist is Empty</h1>
        <p className="text-muted" style={{ marginBottom: 'var(--space-8)' }}>
          Looks like you haven't added any plants to your wishlist yet.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: 'var(--space-8) 0', minHeight: '70vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
        <h1>My Wishlist ❤️</h1>
        <button className="btn btn-ghost" style={{ color: 'var(--danger-500)' }} onClick={clearWishlist}>
          Clear Wishlist
        </button>
      </div>

      <div className="products-grid">
        {wishlist.map(item => (
          <div key={item.id} className="product-card card card-hover">
            <Link to={`/product/${item.id}`} className="product-image-link">
              <img src={item.image_url} alt={item.name} className="product-image" />
            </Link>
            <div className="product-info">
              <h3><Link to={`/product/${item.id}`}>{item.name}</Link></h3>
              <p className="text-muted text-sm">{item.category}</p>
              <div className="product-price">{formatCurrency(item.price)}</div>
              
              <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
                <button 
                  className="btn btn-primary flex-1" 
                  onClick={() => handleMoveToCart(item)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)' }}
                >
                  <ShoppingCart size={16} /> Move to Cart
                </button>
                <button 
                  className="btn btn-outline btn-icon"
                  onClick={() => removeFromWishlist(item.id)}
                  title="Remove from wishlist"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
