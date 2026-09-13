const mongoose = require('mongoose');
const Product = require('./models/Product');

const newProducts = [
  // Crop Protection
  {
    name: 'Organic Neem Oil Pesticide (1L)',
    category: 'Crop Protection',
    price: 450,
    image: 'https://via.placeholder.com/400x400?text=Neem+Oil',
    sku: 'CROP-NEO-001',
    description: 'Natural, organic neem oil to protect crops from harmful insects and pests.',
    meta: 'Organic, Eco-friendly',
    rating: 4.5,
    reviews: 120,
    stockQuantity: 300
  },
  {
    name: 'Broad Spectrum Fungicide (500g)',
    category: 'Crop Protection',
    price: 850,
    image: 'https://via.placeholder.com/400x400?text=Fungicide',
    sku: 'CROP-FUN-002',
    description: 'Highly effective fungicide for preventing and curing fungal diseases in plants.',
    meta: 'Fast Acting, Systemic',
    rating: 4.8,
    reviews: 210,
    stockQuantity: 150
  },
  {
    name: 'Weed Killer / Herbicide (1L)',
    category: 'Crop Protection',
    price: 600,
    image: 'https://via.placeholder.com/400x400?text=Herbicide',
    sku: 'CROP-HER-003',
    description: 'Selective herbicide for controlling broadleaf weeds in agricultural fields.',
    meta: 'Selective Herbicide',
    rating: 4.2,
    reviews: 85,
    stockQuantity: 400
  },

  // Irrigation
  {
    name: 'Drip Irrigation Kit (1 Acre)',
    category: 'Irrigation',
    price: 12000,
    image: 'https://via.placeholder.com/400x400?text=Drip+Irrigation',
    sku: 'IRR-DRP-001',
    description: 'Complete drip irrigation system including pipes, drippers, and fittings for 1 acre.',
    meta: 'Water Saving, High Efficiency',
    rating: 4.9,
    reviews: 350,
    stockQuantity: 50
  },
  {
    name: 'Sprinkler Head Set (Pack of 5)',
    category: 'Irrigation',
    price: 1500,
    image: 'https://via.placeholder.com/400x400?text=Sprinkler+Head',
    sku: 'IRR-SPR-002',
    description: 'Durable brass sprinkler heads for even water distribution over large areas.',
    meta: 'Brass, 360 Degree',
    rating: 4.6,
    reviews: 180,
    stockQuantity: 200
  },
  {
    name: 'Flexible PVC Water Pipe (30m)',
    category: 'Irrigation',
    price: 2200,
    image: 'https://via.placeholder.com/400x400?text=PVC+Pipe',
    sku: 'IRR-PIP-003',
    description: 'Heavy-duty, weather-resistant PVC pipe for agricultural water supply.',
    meta: 'Heavy Duty, Flexible',
    rating: 4.3,
    reviews: 95,
    stockQuantity: 120
  },

  // Sprayers
  {
    name: 'Manual Knapsack Sprayer (16L)',
    category: 'Sprayers',
    price: 1200,
    image: 'https://via.placeholder.com/400x400?text=Manual+Sprayer',
    sku: 'SPR-MAN-001',
    description: 'Traditional manual pump knapsack sprayer for small to medium farms.',
    meta: 'Lightweight, Durable',
    rating: 4.1,
    reviews: 320,
    stockQuantity: 500
  },
  {
    name: 'Petrol Engine Power Sprayer',
    category: 'Sprayers',
    price: 8500,
    image: 'https://via.placeholder.com/400x400?text=Power+Sprayer',
    sku: 'SPR-PWR-002',
    description: 'High-pressure petrol engine sprayer for large orchards and fields.',
    meta: 'High Pressure, 4-Stroke',
    rating: 4.7,
    reviews: 145,
    stockQuantity: 40
  },
  {
    name: 'Tractor Mounted Boom Sprayer',
    category: 'Sprayers',
    price: 45000,
    image: 'https://via.placeholder.com/400x400?text=Boom+Sprayer',
    sku: 'SPR-BOM-003',
    description: 'Wide coverage boom sprayer designed to be mounted on standard tractors.',
    meta: 'Commercial Grade, Wide Coverage',
    rating: 4.8,
    reviews: 25,
    stockQuantity: 10
  },

  // Tools & Equipment
  {
    name: 'Carbon Steel Shovel',
    category: 'Tools & Equipment',
    price: 450,
    image: 'https://via.placeholder.com/400x400?text=Steel+Shovel',
    sku: 'TOOL-SHV-001',
    description: 'Heavy-duty carbon steel shovel with a comfortable wooden handle.',
    meta: 'Rust Resistant, Strong',
    rating: 4.5,
    reviews: 410,
    stockQuantity: 600
  },
  {
    name: 'Agriculture Hand Sickle',
    category: 'Tools & Equipment',
    price: 250,
    image: 'https://via.placeholder.com/400x400?text=Hand+Sickle',
    sku: 'TOOL-SCK-002',
    description: 'Sharp curved blade sickle for harvesting crops and cutting grass.',
    meta: 'Traditional Tool, Sharp',
    rating: 4.3,
    reviews: 280,
    stockQuantity: 800
  },
  {
    name: 'Digital Soil Testing Meter',
    category: 'Tools & Equipment',
    price: 1800,
    image: 'https://via.placeholder.com/400x400?text=Soil+Meter',
    sku: 'TOOL-MTR-003',
    description: '3-in-1 digital meter to test soil moisture, pH, and sunlight levels.',
    meta: 'Digital, High Accuracy',
    rating: 4.6,
    reviews: 155,
    stockQuantity: 150
  }
];

mongoose.connect('mongodb://localhost:27017/agrimart')
  .then(async () => {
    console.log('MongoDB Connected.');

    // Insert new products (Appending to existing ones)
    await Product.insertMany(newProducts);
    console.log(`Successfully added ${newProducts.length} more products.`);

    process.exit();
  })
  .catch(err => {
    console.error('MongoDB Error:', err);
    process.exit(1);
  });
