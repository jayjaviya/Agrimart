const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  sku: { type: String },
  description: { type: String },
  meta: { type: String }, 
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  stockQuantity: { type: Number, default: 0 },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
