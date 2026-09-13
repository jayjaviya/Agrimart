const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  // Seeds (5)
  {
    name: 'Premium Hybrid Tomato Seeds',
    category: 'Seeds',
    price: 450,
    image: 'https://via.placeholder.com/400x400?text=Tomato+Seeds',
    sku: 'SEED-TOM-001',
    description: 'High-yield hybrid tomato seeds suitable for greenhouse and open field cultivation.',
    meta: 'High Yield, Disease Resistant',
    rating: 4.5,
    reviews: 120,
    stockQuantity: 500
  },
  {
    name: 'Golden Wheat Seeds (10kg)',
    category: 'Seeds',
    price: 1200,
    image: 'https://via.placeholder.com/400x400?text=Wheat+Seeds',
    sku: 'SEED-WHT-002',
    description: 'Premium quality wheat seeds ensuring a bountiful harvest with superior grain quality.',
    meta: 'Drought Tolerant',
    rating: 4.8,
    reviews: 85,
    stockQuantity: 200
  },
  {
    name: 'Sweet Corn Seeds (1kg)',
    category: 'Seeds',
    price: 800,
    image: 'https://via.placeholder.com/400x400?text=Corn+Seeds',
    sku: 'SEED-CRN-003',
    description: 'Fast-growing sweet corn seeds, perfect for commercial farming.',
    meta: 'Fast Growth, Sweet Taste',
    rating: 4.2,
    reviews: 45,
    stockQuantity: 150
  },
  {
    name: 'Organic Cotton Seeds (5kg)',
    category: 'Seeds',
    price: 2500,
    image: 'https://via.placeholder.com/400x400?text=Cotton+Seeds',
    sku: 'SEED-CTN-004',
    description: 'High-quality organic cotton seeds with excellent fiber strength.',
    meta: 'Organic, High Yield',
    rating: 4.6,
    reviews: 210,
    stockQuantity: 100
  },
  {
    name: 'Green Pea Seeds (500g)',
    category: 'Seeds',
    price: 300,
    image: 'https://via.placeholder.com/400x400?text=Pea+Seeds',
    sku: 'SEED-PEA-005',
    description: 'Fresh and healthy green pea seeds for optimal germination.',
    meta: 'Quick Germination',
    rating: 4.1,
    reviews: 32,
    stockQuantity: 300
  },

  // Fertilizers (5)
  {
    name: 'Urea Fertilizer 46% N (50kg)',
    category: 'Fertilizers',
    price: 1500,
    image: 'https://via.placeholder.com/400x400?text=Urea+Fertilizer',
    sku: 'FERT-URE-001',
    description: 'High nitrogen urea fertilizer for robust plant growth and green foliage.',
    meta: 'High Nitrogen, Fast Acting',
    rating: 4.9,
    reviews: 500,
    stockQuantity: 1000
  },
  {
    name: 'Organic Compost Maker (5L)',
    category: 'Fertilizers',
    price: 850,
    image: 'https://via.placeholder.com/400x400?text=Compost+Maker',
    sku: 'FERT-CMP-002',
    description: 'Liquid solution to accelerate composting of agricultural waste.',
    meta: 'Organic, Eco-friendly',
    rating: 4.4,
    reviews: 78,
    stockQuantity: 150
  },
  {
    name: 'NPK 19:19:19 Water Soluble (1kg)',
    category: 'Fertilizers',
    price: 350,
    image: 'https://via.placeholder.com/400x400?text=NPK+Fertilizer',
    sku: 'FERT-NPK-003',
    description: 'Balanced NPK fertilizer suitable for all crops during vegetative growth.',
    meta: 'Balanced Nutrition, 100% Soluble',
    rating: 4.7,
    reviews: 340,
    stockQuantity: 600
  },
  {
    name: 'Zinc Sulphate Agriculture Grade (5kg)',
    category: 'Fertilizers',
    price: 600,
    image: 'https://via.placeholder.com/400x400?text=Zinc+Sulphate',
    sku: 'FERT-ZNC-004',
    description: 'Corrects zinc deficiency in soil, essential for crop health.',
    meta: 'Micronutrient',
    rating: 4.3,
    reviews: 56,
    stockQuantity: 400
  },
  {
    name: 'Seaweed Extract Bio-Stimulant (1L)',
    category: 'Fertilizers',
    price: 950,
    image: 'https://via.placeholder.com/400x400?text=Seaweed+Extract',
    sku: 'FERT-SEA-005',
    description: 'Natural plant growth promoter derived from seaweed.',
    meta: 'Bio-Stimulant, Organic',
    rating: 4.8,
    reviews: 112,
    stockQuantity: 250
  },

  // Machinery & Tools (5)
  {
    name: 'Heavy Duty Tractor Plough',
    category: 'Machinery',
    price: 45000,
    image: 'https://via.placeholder.com/400x400?text=Tractor+Plough',
    sku: 'MACH-PLG-001',
    description: 'Durable steel plough designed for deep tilling and tough soil conditions.',
    meta: 'Heavy Duty, Stainless Steel',
    rating: 4.6,
    reviews: 45,
    stockQuantity: 20
  },
  {
    name: 'Manual Seed Drill Machine',
    category: 'Machinery',
    price: 3500,
    image: 'https://via.placeholder.com/400x400?text=Seed+Drill',
    sku: 'MACH-SDR-002',
    description: 'Easy-to-use manual seed drill for precise sowing of small seeds.',
    meta: 'Lightweight, Precision Sowing',
    rating: 4.2,
    reviews: 89,
    stockQuantity: 75
  },
  {
    name: 'Battery Operated Knapsack Sprayer (16L)',
    category: 'Machinery',
    price: 2800,
    image: 'https://via.placeholder.com/400x400?text=Knapsack+Sprayer',
    sku: 'MACH-SPR-003',
    description: 'Efficient battery-operated sprayer for pesticides and fertilizers.',
    meta: '16L Capacity, Rechargeable',
    rating: 4.7,
    reviews: 230,
    stockQuantity: 120
  },
  {
    name: 'Electric Chaff Cutter',
    category: 'Machinery',
    price: 18500,
    image: 'https://via.placeholder.com/400x400?text=Chaff+Cutter',
    sku: 'MACH-CFC-004',
    description: 'High-speed electric chaff cutter for preparing animal feed efficiently.',
    meta: 'High Speed, 2HP Motor',
    rating: 4.5,
    reviews: 34,
    stockQuantity: 15
  },
  {
    name: 'Professional Pruning Shears',
    category: 'Machinery',
    price: 850,
    image: 'https://via.placeholder.com/400x400?text=Pruning+Shears',
    sku: 'MACH-SHR-005',
    description: 'Sharp, durable pruning shears for cutting branches and stems.',
    meta: 'Ergonomic, Sharp Blades',
    rating: 4.9,
    reviews: 410,
    stockQuantity: 300
  }
];

mongoose.connect('mongodb://localhost:27017/agrimart')
  .then(async () => {
    console.log('MongoDB Connected.');

    // Clear existing products
    await Product.deleteMany();
    console.log('Cleared existing products.');

    // Insert new products
    await Product.insertMany(products);
    console.log('Successfully added 15 products.');

    process.exit();
  })
  .catch(err => {
    console.error('MongoDB Error:', err);
    process.exit(1);
  });
