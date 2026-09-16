const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  name: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  issueType: {
    type: String,
    required: true,
    enum: ['order', 'product', 'delivery', 'return', 'other']
  },
  orderId: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Open',
    enum: ['Open', 'In Progress', 'Resolved']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);
