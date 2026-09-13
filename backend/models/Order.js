const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: 'Processing' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
