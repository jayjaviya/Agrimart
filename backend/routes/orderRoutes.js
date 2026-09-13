const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching orders' });
  }
});

// POST a new order
router.post('/', async (req, res) => {
  try {
    const { 
      customerName, 
      customerPhone, 
      shippingAddress, 
      items, 
      totalAmount, 
      paymentMethod 
    } = req.body;
    
    // Generate a mock order ID
    const orderId = '#AGM-' + Math.floor(1000 + Math.random() * 9000);

    const order = new Order({
      orderId,
      customerName,
      customerPhone,
      shippingAddress,
      items,
      totalAmount,
      paymentMethod
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create order' });
  }
});

// UPDATE order status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error updating order' });
  }
});

module.exports = router;
