import { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PRODUCTS } from '../utils/constants';
import { formatCurrency } from '../utils/formatters';

const ShopPage = () => {
  const [products, setProducts] = useState(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', 'Indoor', 'Outdoor', 'Succulents', 'Rare'];

  useEffect(() => {
    let result = [...PRODUCTS];

    if (searchTerm) {
      result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name));

    setProducts(result);
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="shop-page container">
      <div className="shop-header">
        <h1>Shop Plants</h1>
        <p>Find the perfect green companion for your space.</p>
      </div>

      <div className="shop-controls">
        <div className="search-bar">
          <Search className="icon" />
          <input 
            type="text" 
            placeholder="Search plants..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
          />
        </div>

        <div className="filters">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="input"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="card product-card card-hover">
            <div className="product-image">
              <img src={product.image || 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800'} alt={product.name} />
              {product.isNew && <span className="badge badge-success new-badge">New</span>}
              <div className="product-actions">
                <button className="btn btn-primary btn-icon"><ShoppingCart size={18} /></button>
                <button className="btn btn-secondary btn-icon"><Eye size={18} /></button>
              </div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <div className="price-row">
                <span className="price">{formatCurrency(product.price)}</span>
                <span className="stock">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="no-results">
            <p>No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
