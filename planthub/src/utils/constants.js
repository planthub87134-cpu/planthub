// PlantHub — Constants & Data

export const PRODUCTS = [
  { id: 1, name: 'Monstera Deliciosa', price: 45, description: 'Large, beautiful Swiss cheese plant with stunning split leaves. Perfect for adding tropical vibes to any room.', image: '🍃', stock: 12, category: 'Indoor' },
  { id: 2, name: 'Pothos Golden', price: 28, description: 'Trailing vine with golden variegated leaves. One of the easiest houseplants to grow.', image: '🌿', stock: 18, category: 'Indoor' },
  { id: 3, name: 'Snake Plant', price: 25, description: 'Low maintenance succulent that purifies air. Thrives even in low light conditions.', image: '🎋', stock: 25, category: 'Succulent' },
  { id: 4, name: 'Rubber Tree', price: 55, description: 'Tall decorative plant with glossy dark green leaves. A stunning statement piece.', image: '🌳', stock: 8, category: 'Indoor' },
  { id: 5, name: 'Spider Plant', price: 20, description: 'Produces adorable baby plants easily. Great for hanging baskets and shelves.', image: '🌱', stock: 30, category: 'Indoor' },
  { id: 6, name: 'Fiddle Leaf Fig', price: 65, description: 'Statement piece plant with large violin-shaped leaves. The ultimate Instagram plant.', image: '🍂', stock: 5, category: 'Indoor' },
  { id: 7, name: 'Aloe Vera', price: 18, description: 'Medicinal succulent with soothing gel. Easy care and incredibly useful.', image: '🌵', stock: 35, category: 'Succulent' },
  { id: 8, name: 'Peace Lily', price: 32, description: 'Elegant white blooms and air-purifying qualities. Thrives in low to medium light.', image: '🌸', stock: 15, category: 'Indoor' },
  { id: 9, name: 'Basil Plant', price: 12, description: 'Fresh aromatic herb for cooking. Nothing beats homegrown basil for your pasta.', image: '🌿', stock: 40, category: 'Herb' },
  { id: 10, name: 'Mint Plant', price: 10, description: 'Fragrant herb perfect for teas and cocktails. Grows fast and smells amazing.', image: '🍃', stock: 38, category: 'Herb' },
  { id: 11, name: 'Jade Plant', price: 22, description: 'Symbol of good luck and prosperity. A beautiful compact succulent.', image: '🪴', stock: 20, category: 'Succulent' },
  { id: 12, name: 'Boston Fern', price: 30, description: 'Lush, feathery fronds that cascade beautifully. Perfect for humid spaces.', image: '🌿', stock: 14, category: 'Indoor' },
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
