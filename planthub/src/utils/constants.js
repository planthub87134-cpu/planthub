// PlantHub — Constants & Data

export const PRODUCTS = [
  { id: 1, name: 'Alphonso Mango Tree', price: 899, description: 'Premium grafted Alphonso mango tree. Produces sweet, rich, and flavorful fruits.', image: 'https://images.unsplash.com/photo-1628189689694-1a95e7c800bc?auto=format&fit=crop&w=800&q=80', stock: 10, category: 'Fruit', careLevel: 'Moderate', lightReq: 'Full Sun' },
  { id: 2, name: 'Hybrid Dwarf Mango', price: 699, description: 'Perfect for container gardening. This hybrid variety yields fruits quickly even in small spaces.', image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=800&q=80', stock: 15, category: 'Hybrid', careLevel: 'Moderate', lightReq: 'Full Sun' },
  { id: 3, name: 'Allahabadi Safeda Guava', price: 499, description: 'Famous Indian guava variety known for its soft, sweet, and white flesh.', image: 'https://images.unsplash.com/photo-1616037599023-eb922a946279?auto=format&fit=crop&w=800&q=80', stock: 20, category: 'Fruit', careLevel: 'Easy', lightReq: 'Full Sun' },
  { id: 4, name: 'Thai Hybrid Guava', price: 599, description: 'Fast-growing hybrid guava that produces large, seedless fruits year-round.', image: 'https://images.unsplash.com/photo-1550828520-4cb496926fc9?auto=format&fit=crop&w=800&q=80', stock: 12, category: 'Hybrid', careLevel: 'Moderate', lightReq: 'Full Sun' },
  { id: 5, name: 'Shahi Litchi Tree', price: 999, description: 'Highly sought after Litchi variety with large, juicy, and extremely sweet fruits.', image: 'https://images.unsplash.com/photo-1596700548174-8db9ba518ff4?auto=format&fit=crop&w=800&q=80', stock: 8, category: 'Fruit', careLevel: 'Advanced', lightReq: 'Full Sun' },
  { id: 6, name: 'Holy Basil (Rama Tulsi)', price: 149, description: 'Sacred Indian herb known for its medicinal and spiritual properties. Perfect for daily tea.', image: 'https://images.unsplash.com/photo-1632598379685-611ff6e77a1f?auto=format&fit=crop&w=800&q=80', stock: 45, category: 'Herb', careLevel: 'Easy', lightReq: 'Bright Direct' },
  { id: 7, name: 'Shyama Tulsi (Krishna Tulsi)', price: 199, description: 'Dark-leaved Tulsi variant with a sharper, peppery flavor and high medicinal value.', image: 'https://images.unsplash.com/photo-1596547565985-3b999c0d280b?auto=format&fit=crop&w=800&q=80', stock: 30, category: 'Herb', careLevel: 'Easy', lightReq: 'Bright Direct' },
  { id: 8, name: 'Monstera Deliciosa', price: 599, description: 'Large, beautiful Swiss cheese plant with stunning split leaves. Perfect for adding tropical vibes.', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80', stock: 12, category: 'Indoor', careLevel: 'Easy', lightReq: 'Bright Indirect' },
  { id: 9, name: 'Snake Plant', price: 299, description: 'Low maintenance succulent that purifies air. Thrives even in low light conditions.', image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1b7e?auto=format&fit=crop&w=800&q=80', stock: 25, category: 'Succulent', careLevel: 'Beginner', lightReq: 'Low to Bright' },
  { id: 10, name: 'Aloe Vera', price: 199, description: 'Medicinal succulent with soothing gel. Easy care and incredibly useful.', image: 'https://images.unsplash.com/photo-1596547610582-7d885fa221be?auto=format&fit=crop&w=800&q=80', stock: 35, category: 'Succulent', careLevel: 'Easy', lightReq: 'Bright Direct' },
  { id: 11, name: 'Kagzi Lemon Tree', price: 399, description: 'A highly productive Indian lemon variety perfect for home gardens.', image: 'https://images.unsplash.com/photo-1596547609652-9cb5b89fa5a9?auto=format&fit=crop&w=800&q=80', stock: 20, category: 'Fruit', careLevel: 'Moderate', lightReq: 'Full Sun' },
  { id: 12, name: 'Hybrid Papaya (Red Lady)', price: 299, description: 'Dwarf hybrid papaya that fruits early and heavily. Sweet red flesh.', image: 'https://images.unsplash.com/photo-1604762512401-443fc08a8e10?auto=format&fit=crop&w=800&q=80', stock: 15, category: 'Hybrid', careLevel: 'Easy', lightReq: 'Full Sun' },
];

export const CATEGORIES = ['All', 'Indoor', 'Succulent', 'Herb', 'Fruit', 'Hybrid'];

export const CHART_DATA = [
  { month: 'Jan', sales: 4000, orders: 240 },
  { month: 'Feb', sales: 3000, orders: 221 },
  { month: 'Mar', sales: 5200, orders: 329 },
  { month: 'Apr', sales: 2780, orders: 200 },
  { month: 'May', sales: 4890, orders: 329 },
  { month: 'Jun', sales: 6390, orders: 400 },
  { month: 'Jul', sales: 5490, orders: 350 },
  { month: 'Aug', sales: 7200, orders: 420 },
];

export const PIE_DATA = [
  { name: 'Indoor Plants', value: 45 },
  { name: 'Succulents', value: 30 },
  { name: 'Herbs', value: 25 },
];

export const PIE_COLORS = ['#10b981', '#06b6d4', '#f59e0b'];

export const DEMO_ORDERS = [
  {
    id: 'ORD001',
    items: [{ id: 8, name: 'Monstera Deliciosa', qty: 1, price: 599, image: '🍃' }],
    total: 599,
    status: 'delivered',
    date: '2024-08-20',
    trackingNumber: 'TRK-PH-001',
  },
  {
    id: 'ORD002',
    items: [{ id: 9, name: 'Snake Plant', qty: 2, price: 299, image: '🎋' }],
    total: 598,
    status: 'shipped',
    date: '2024-09-01',
    trackingNumber: 'TRK-PH-002',
  },
  {
    id: 'ORD003',
    items: [
      { id: 1, name: 'Alphonso Mango Tree', qty: 1, price: 899, image: '🍂' },
      { id: 10, name: 'Aloe Vera', qty: 1, price: 199, image: '🌿' },
    ],
    total: 1098,
    status: 'pending',
    date: '2024-09-10',
    trackingNumber: 'TRK-PH-003',
  },
];

export const TESTIMONIALS = [
  {
    quote: "PlantHub transformed my apartment into a green paradise. The plants arrived in perfect condition and the care guides were incredibly helpful!",
    name: 'Sarah Johnson',
    role: 'Happy Customer',
    avatar: 'SJ',
  },
  {
    quote: "Best online plant shop I've ever used. Fast delivery, healthy plants, and amazing customer service. Highly recommended!",
    name: 'Michael Chen',
    role: 'Plant Enthusiast',
    avatar: 'MC',
  },
  {
    quote: "I'm a beginner plant parent and PlantHub made it so easy to get started. The low-maintenance recommendations were spot on.",
    name: 'Emily Rodriguez',
    role: 'New Plant Mom',
    avatar: 'ER',
  },
];

export const FEATURES = [
  {
    icon: '🌿',
    title: 'Premium Quality',
    description: 'Every plant is hand-selected from trusted growers and inspected before shipping.',
  },
  {
    icon: '🚚',
    title: 'Fast Delivery',
    description: 'Ships within 48 hours with real-time tracking. Safely packaged for transit.',
  },
  {
    icon: '💬',
    title: 'Expert Support',
    description: 'Our plant care team is here to help with tips, troubleshooting, and recommendations.',
  },
  {
    icon: '🔄',
    title: '30-Day Guarantee',
    description: 'Not happy? Return within 30 days for a full refund. No questions asked.',
  },
  {
    icon: '📦',
    title: 'Eco Packaging',
    description: 'Sustainable, biodegradable packaging that protects your plants and the planet.',
  },
  {
    icon: '🏆',
    title: 'Loyalty Rewards',
    description: 'Earn points with every purchase. Redeem for discounts on future orders.',
  },
];

export const FEEDBACK_CATEGORIES = [
  'Product Quality',
  'Delivery Experience',
  'Customer Service',
  'Website Experience',
  'Packaging',
  'Other',
];
