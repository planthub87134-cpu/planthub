// PlantHub — Constants & Data

export const PRODUCTS = [
  { id: 1, name: 'Alphonso Mango Tree', price: 899, description: 'Premium grafted Alphonso mango tree. Produces sweet, rich, and flavorful fruits.', image: 'https://loremflickr.com/800/800/pottedplant,tree?lock=1', stock: 10, category: 'Fruit', careLevel: 'Moderate', lightReq: 'Full Sun' },
  { id: 2, name: 'Hybrid Dwarf Mango', price: 699, description: 'Perfect for container gardening. This hybrid variety yields fruits quickly even in small spaces.', image: 'https://loremflickr.com/800/800/pottedplant,tree?lock=2', stock: 15, category: 'Fruit', careLevel: 'Moderate', lightReq: 'Full Sun' },
  { id: 3, name: 'Allahabadi Safeda Guava', price: 499, description: 'Famous Indian guava variety known for its soft, sweet, and white flesh.', image: 'https://loremflickr.com/800/800/pottedplant,tree?lock=3', stock: 20, category: 'Fruit', careLevel: 'Easy', lightReq: 'Full Sun' },
  { id: 4, name: 'Thai Hybrid Guava', price: 599, description: 'Fast-growing hybrid guava that produces large, seedless fruits year-round.', image: 'https://loremflickr.com/800/800/pottedplant,tree?lock=4', stock: 12, category: 'Fruit', careLevel: 'Moderate', lightReq: 'Full Sun' },
  { id: 5, name: 'Shahi Litchi Tree', price: 999, description: 'Highly sought after Litchi variety with large, juicy, and extremely sweet fruits.', image: 'https://loremflickr.com/800/800/pottedplant,tree?lock=5', stock: 8, category: 'Fruit', careLevel: 'Advanced', lightReq: 'Full Sun' },
  { id: 6, name: 'Holy Basil (Rama Tulsi)', price: 149, description: 'Sacred Indian herb known for its medicinal and spiritual properties. Perfect for daily tea.', image: 'https://loremflickr.com/800/800/pottedplant,herb?lock=6', stock: 45, category: 'Herb', careLevel: 'Easy', lightReq: 'Bright Direct' },
  { id: 7, name: 'Shyama Tulsi (Krishna Tulsi)', price: 199, description: 'Dark-leaved Tulsi variant with a sharper, peppery flavor and high medicinal value.', image: 'https://loremflickr.com/800/800/pottedplant,herb?lock=7', stock: 30, category: 'Herb', careLevel: 'Easy', lightReq: 'Bright Direct' },
  { id: 8, name: 'Monstera Deliciosa', price: 599, description: 'Large, beautiful Swiss cheese plant with stunning split leaves. Perfect for adding tropical vibes.', image: 'https://loremflickr.com/800/800/pottedplant,indoor?lock=8', stock: 12, category: 'Indoor', careLevel: 'Easy', lightReq: 'Bright Indirect', isNew: true },
  { id: 9, name: 'Snake Plant (Sansevieria)', price: 299, description: 'Low maintenance succulent that purifies air. Thrives even in low light conditions.', image: 'https://loremflickr.com/800/800/pottedplant,succulent?lock=9', stock: 25, category: 'Succulent', careLevel: 'Beginner', lightReq: 'Low to Bright' },
  { id: 10, name: 'Aloe Vera', price: 199, description: 'Medicinal succulent with soothing gel. Easy care and incredibly useful.', image: 'https://loremflickr.com/800/800/pottedplant,succulent?lock=10', stock: 35, category: 'Succulent', careLevel: 'Easy', lightReq: 'Bright Direct' },
  { id: 11, name: 'Kagzi Lemon Tree', price: 399, description: 'A highly productive Indian lemon variety perfect for home gardens.', image: 'https://loremflickr.com/800/800/pottedplant,tree?lock=11', stock: 20, category: 'Fruit', careLevel: 'Moderate', lightReq: 'Full Sun' },
  { id: 12, name: 'Hybrid Papaya (Red Lady)', price: 299, description: 'Dwarf hybrid papaya that fruits early and heavily. Sweet red flesh.', image: 'https://loremflickr.com/800/800/pottedplant,tree?lock=12', stock: 15, category: 'Fruit', careLevel: 'Easy', lightReq: 'Full Sun' },
  { id: 13, name: 'Ficus Lyrata (Fiddle Leaf Fig)', price: 799, description: 'Popular indoor tree with large, heavily veined, violin-shaped leaves.', image: 'https://loremflickr.com/800/800/pottedplant,indoor?lock=13', stock: 5, category: 'Indoor', careLevel: 'Moderate', lightReq: 'Bright Indirect', isNew: true },
  { id: 14, name: 'ZZ Plant (Zamioculcas)', price: 349, description: 'Nearly indestructible plant with glossy, dark green leaves. Perfect for offices.', image: 'https://loremflickr.com/800/800/pottedplant,indoor?lock=14', stock: 40, category: 'Indoor', careLevel: 'Beginner', lightReq: 'Low to Bright' },
  { id: 15, name: 'Peace Lily (Spathiphyllum)', price: 249, description: 'Elegant white flowers and dark green foliage. Excellent air purifier.', image: 'https://loremflickr.com/800/800/pottedplant,indoor?lock=15', stock: 18, category: 'Indoor', careLevel: 'Moderate', lightReq: 'Low to Bright' },
  { id: 16, name: 'Rubber Plant (Ficus Elastica)', price: 399, description: 'Striking indoor tree with thick, glossy, burgundy/green leaves.', image: 'https://loremflickr.com/800/800/pottedplant,indoor?lock=16', stock: 14, category: 'Indoor', careLevel: 'Easy', lightReq: 'Bright Indirect' },
  { id: 17, name: 'Pothos (Money Plant)', price: 149, description: 'Trailing vine that is extremely easy to grow. Believed to bring good luck.', image: 'https://loremflickr.com/800/800/pottedplant,indoor?lock=17', stock: 50, category: 'Indoor', careLevel: 'Beginner', lightReq: 'Low to Bright' },
  { id: 18, name: 'Philodendron Birkin', price: 449, description: 'Stunning compact plant with dark green leaves and striking white pinstripes.', image: 'https://loremflickr.com/800/800/pottedplant,rare?lock=18', stock: 8, category: 'Rare', careLevel: 'Easy', lightReq: 'Bright Indirect', isNew: true },
  { id: 19, name: 'String of Pearls', price: 299, description: 'Fascinating trailing succulent with pearl-like spherical leaves.', image: 'https://loremflickr.com/800/800/pottedplant,succulent?lock=19', stock: 12, category: 'Succulent', careLevel: 'Moderate', lightReq: 'Bright Direct' },
  { id: 20, name: 'Rosemary', price: 179, description: 'Fragrant evergreen herb perfect for culinary use and aromatic gardens.', image: 'https://loremflickr.com/800/800/pottedplant,herb?lock=20', stock: 22, category: 'Herb', careLevel: 'Moderate', lightReq: 'Full Sun' },
  { id: 21, name: 'Mint (Pudina)', price: 99, description: 'Fast-growing herb essential for refreshing drinks and chutneys.', image: 'https://loremflickr.com/800/800/pottedplant,herb?lock=21', stock: 60, category: 'Herb', careLevel: 'Beginner', lightReq: 'Full Sun' },
  { id: 22, name: 'Curry Leaf Plant (Kadi Patta)', price: 199, description: 'Essential Indian culinary herb tree. Highly aromatic leaves.', image: 'https://loremflickr.com/800/800/pottedplant,herb?lock=22', stock: 25, category: 'Herb', careLevel: 'Easy', lightReq: 'Full Sun' },
  { id: 23, name: 'Pink Princess Philodendron', price: 1499, description: 'Highly sought-after rare plant featuring stunning dark leaves with hot pink variegation.', image: 'https://loremflickr.com/800/800/pottedplant,rare?lock=23', stock: 3, category: 'Rare', careLevel: 'Advanced', lightReq: 'Bright Indirect', isNew: true },
  { id: 24, name: 'Areca Palm', price: 699, description: 'Lush tropical palm that adds an airy, resort-like feel to any room. Great air purifier.', image: 'https://loremflickr.com/800/800/pottedplant,indoor?lock=24', stock: 15, category: 'Indoor', careLevel: 'Moderate', lightReq: 'Bright Indirect' },
  { id: 25, name: 'Jade Plant (Crassula)', price: 249, description: 'Classic succulent tree known as the money plant in some cultures. Extremely long-lived.', image: 'https://loremflickr.com/800/800/pottedplant,succulent?lock=25', stock: 30, category: 'Succulent', careLevel: 'Easy', lightReq: 'Bright Direct' },
  { id: 26, name: 'Bougainvillea (Pink)', price: 399, description: 'Vibrant, sun-loving outdoor vine that produces masses of papery pink bracts.', image: 'https://loremflickr.com/800/800/pottedplant,outdoor?lock=26', stock: 10, category: 'Outdoor', careLevel: 'Easy', lightReq: 'Full Sun' },
  { id: 27, name: 'Jasmine (Mogra)', price: 299, description: 'Beloved Indian flowering plant with intensely fragrant white blooms.', image: 'https://loremflickr.com/800/800/pottedplant,outdoor?lock=27', stock: 18, category: 'Outdoor', careLevel: 'Moderate', lightReq: 'Full Sun' },
  { id: 28, name: 'Bird of Paradise', price: 899, description: 'Dramatic tropical plant with massive banana-like leaves. Adds instant jungle vibes.', image: 'https://loremflickr.com/800/800/pottedplant,indoor?lock=28', stock: 6, category: 'Indoor', careLevel: 'Advanced', lightReq: 'Bright Direct', isNew: true },
  { id: 29, name: 'Boston Fern', price: 249, description: 'Lush, feathery fronds perfect for hanging baskets or pedestals. Loves humidity.', image: 'https://loremflickr.com/800/800/pottedplant,indoor?lock=29', stock: 20, category: 'Indoor', careLevel: 'Moderate', lightReq: 'Bright Indirect' },
  { id: 30, name: 'Spider Plant', price: 199, description: 'Fun, easy-to-grow plant that produces cascading "babies". Highly adaptable.', image: 'https://loremflickr.com/800/800/pottedplant,indoor?lock=30', stock: 28, category: 'Indoor', careLevel: 'Beginner', lightReq: 'Low to Bright' }
];

export const CATEGORIES = ['All', 'Indoor', 'Succulent', 'Herb', 'Fruit'];

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
