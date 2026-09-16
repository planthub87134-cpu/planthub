import { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../hooks/useCart';
import { supabase } from '../lib/supabase';
import { formatCurrency } from '../utils/formatters';
import '../styles/shop.css';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightFilter, setLightFilter] = useState('All');
  const [careFilter, setCareFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState(null);

  const categories = ['All', 'Indoor', 'Outdoor', 'Succulents', 'Rare'];

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      let query = supabase.from('products').select('*');
      
      const { data, error } = await query;
      if (error) {
        console.error('Error fetching products:', error);
        return;
      }
      
      let result = [...(data || [])];

      if (searchTerm) {
        result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
      }

      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Indoor') {
          result = result.filter(p => ['Indoor', 'Succulent'].includes(p.category));
        } else if (selectedCategory === 'Outdoor') {
          result = result.filter(p => ['Fruit', 'Herb'].includes(p.category));
        } else {
          result = result.filter(p => p.category === selectedCategory);
        }
      }

      if (lightFilter !== 'All') {
        result = result.filter(p => p.lightReq === lightFilter || p.light_req === lightFilter);
      }

      if (careFilter !== 'All') {
        result = result.filter(p => p.careLevel === careFilter || p.care_level === careFilter);
      }

      if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
      else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
      else if (sortBy === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name));

      setProducts(result);
    };

    fetchProducts();
  }, [searchTerm, selectedCategory, lightFilter, careFilter, sortBy]);

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

        <div className="filters" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input"
            title="Indoor/Outdoor"
          >
            <option value="All">Placement (All)</option>
            <option value="Indoor">Indoor Plants</option>
            <option value="Outdoor">Outdoor Plants</option>
            <option value="Succulent">Succulents</option>
            <option value="Herb">Herbs</option>
            <option value="Fruit">Fruit Plants</option>
          </select>

          <select 
            value={lightFilter} 
            onChange={(e) => setLightFilter(e.target.value)}
            className="input"
            title="Sunlight Needs"
          >
            <option value="All">Sunlight (All)</option>
            <option value="Full Sun">Full Sun (तेज धूप)</option>
            <option value="Bright Direct">Bright Direct (सीधी धूप)</option>
            <option value="Bright Indirect">Bright Indirect (हल्की धूप)</option>
            <option value="Low to Bright">Low Light (कम रोशनी)</option>
          </select>

          <select 
            value={careFilter} 
            onChange={(e) => setCareFilter(e.target.value)}
            className="input"
            title="Care & Water Needs"
          >
            <option value="All">Water / Care (All)</option>
            <option value="Easy">Easy (कम पानी)</option>
            <option value="Beginner">Beginner (बहुत कम पानी)</option>
            <option value="Moderate">Moderate (नियमित पानी)</option>
            <option value="Advanced">Advanced (खास देखभाल)</option>
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
                <button 
                  className={`btn ${addedItem === product.id ? 'btn-success' : 'btn-primary'} btn-icon`}
                  onClick={() => handleAddToCart(product)}
                  title="Add to Cart"
                >
                  <ShoppingCart size={18} />
                </button>
                <button className="btn btn-secondary btn-icon" title="View Details"><Eye size={18} /></button>
              </div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="category">{product.category}</p>
              <div className="price-row">
                <span className="price">{formatCurrency(product.price)}</span>
                <span className={`stock ${product.stock > 0 ? '' : 'out'}`}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
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
