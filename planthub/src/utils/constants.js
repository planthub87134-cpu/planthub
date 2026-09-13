// PlantHub — Constants & Data

export const PRODUCTS = [
  { id: 1, name: 'Monstera Deliciosa', price: 45, description: 'Large, beautiful Swiss cheese plant with stunning split leaves. Perfect for adding tropical vibes to any room.', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80', stock: 12, category: 'Indoor', careLevel: 'Easy', lightReq: 'Bright Indirect' },
  { id: 2, name: 'Pothos Golden', price: 28, description: 'Trailing vine with golden variegated leaves. One of the easiest houseplants to grow.', image: 'https://images.unsplash.com/photo-1596547609652-9cb5b89fa5a9?auto=format&fit=crop&w=800&q=80', stock: 18, category: 'Indoor', careLevel: 'Beginner', lightReq: 'Low to Medium' },
  { id: 3, name: 'Snake Plant', price: 25, description: 'Low maintenance succulent that purifies air. Thrives even in low light conditions.', image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1b7e?auto=format&fit=crop&w=800&q=80', stock: 25, category: 'Succulent', careLevel: 'Beginner', lightReq: 'Low to Bright' },
  { id: 4, name: 'Rubber Tree', price: 55, description: 'Tall decorative plant with glossy dark green leaves. A stunning statement piece.', image: 'https://images.unsplash.com/photo-1604762512401-443fc08a8e10?auto=format&fit=crop&w=800&q=80', stock: 8, category: 'Indoor', careLevel: 'Moderate', lightReq: 'Bright Indirect' },
  { id: 5, name: 'Spider Plant', price: 20, description: 'Produces adorable baby plants easily. Great for hanging baskets and shelves.', image: 'https://images.unsplash.com/photo-1612365287413-5a0256ea0b6c?auto=format&fit=crop&w=800&q=80', stock: 30, category: 'Indoor', careLevel: 'Easy', lightReq: 'Bright Indirect' },
  { id: 6, name: 'Fiddle Leaf Fig', price: 65, description: 'Statement piece plant with large violin-shaped leaves. The ultimate Instagram plant.', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80', stock: 5, category: 'Indoor', careLevel: 'Advanced', lightReq: 'Bright Indirect' },
  { id: 7, name: 'Aloe Vera', price: 18, description: 'Medicinal succulent with soothing gel. Easy care and incredibly useful.', image: 'https://images.unsplash.com/photo-1596547610582-7d885fa221be?auto=format&fit=crop&w=800&q=80', stock: 35, category: 'Succulent', careLevel: 'Easy', lightReq: 'Bright Direct' },
  { id: 8, name: 'Peace Lily', price: 32, description: 'Elegant white blooms and air-purifying qualities. Thrives in low to medium light.', image: 'https://images.unsplash.com/photo-1593691544605-e35b77e8a931?auto=format&fit=crop&w=800&q=80', stock: 15, category: 'Indoor', careLevel: 'Moderate', lightReq: 'Low to Medium' },
  { id: 9, name: 'Basil Plant', price: 12, description: 'Fresh aromatic herb for cooking. Nothing beats homegrown basil for your pasta.', image: 'https://images.unsplash.com/photo-1596547565985-3b999c0d280b?auto=format&fit=crop&w=800&q=80', stock: 40, category: 'Herb', careLevel: 'Moderate', lightReq: 'Bright Direct' },
  { id: 10, name: 'Mint Plant', price: 10, description: 'Fragrant herb perfect for teas and cocktails. Grows fast and smells amazing.', image: 'https://images.unsplash.com/photo-1596547610582-7d885fa221be?auto=format&fit=crop&w=800&q=80', stock: 38, category: 'Herb', careLevel: 'Easy', lightReq: 'Bright Direct' },
  { id: 11, name: 'Jade Plant', price: 22, description: 'Symbol of good luck and prosperity. A beautiful compact succulent.', image: 'https://images.unsplash.com/photo-1593482892695-17482838423f?auto=format&fit=crop&w=800&q=80', stock: 20, category: 'Succulent', careLevel: 'Easy', lightReq: 'Bright Indirect' },
  { id: 12, name: 'Boston Fern', price: 30, description: 'Lush, feathery fronds that cascade beautifully. Perfect for humid spaces.', image: 'https://images.unsplash.com/photo-1596547609652-9cb5b89fa5a9?auto=format&fit=crop&w=800&q=80', stock: 14, category: 'Indoor', careLevel: 'Moderate', lightReq: 'Medium Indirect' },
];

export const CATEGORIES = ['All', 'Indoor', 'Succulent', 'Herb'];

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
    items: [{ id: 1, name: 'Monstera Deliciosa', qty: 1, price: 45, image: '🍃' }],
    total: 45,
    status: 'delivered',
    date: '2024-08-20',
    trackingNumber: 'TRK-PH-001',
  },
  {
    id: 'ORD002',
    items: [{ id: 3, name: 'Snake Plant', qty: 2, price: 25, image: '🎋' }],
    total: 50,
    status: 'shipped',
    date: '2024-09-01',
    trackingNumber: 'TRK-PH-002',
  },
  {
    id: 'ORD003',
    items: [
      { id: 6, name: 'Fiddle Leaf Fig', qty: 1, price: 65, image: '🍂' },
      { id: 2, name: 'Pothos Golden', qty: 1, price: 28, image: '🌿' },
    ],
    total: 93,
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
