const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get Admin Dashboard Statistics
// @route   GET /api/admin/dashboard
// @access  Public (for now, usually should be protected)
router.get('/dashboard', async (req, res) => {
  try {
    // 1. Total Revenue (sum of all orders)
    const orders = await Order.find({});
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // 2. Active Orders
    const activeOrders = orders.filter(order => 
      order.status === 'Processing' || order.status === 'Pending'
    ).length;

    // 3. Active Customers
    const activeCustomers = await User.countDocuments({});

    // 4. Low Stock Alerts (Stock <= 10)
    const lowStockItems = await Product.find({ stockQuantity: { $lte: 10 } }).limit(5);
    const inventoryAlertsCount = await Product.countDocuments({ stockQuantity: { $lte: 10 } });

    // 5. Recent Orders
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalRevenue,
      activeOrders,
      activeCustomers,
      inventoryAlertsCount,
      lowStockItems: lowStockItems.map(item => ({
        name: item.name,
        sku: item.sku || 'N/A',
        stock: item.stockQuantity,
        unit: 'left' // default unit
      })),
      recentOrders: recentOrders.map(order => ({
        id: order.orderId || `#ORD-${order._id.toString().substring(18, 24).toUpperCase()}`,
        customer: order.customerName || 'Unknown Customer',
        product: order.items && order.items.length > 0 ? order.items[0].name + (order.items.length > 1 ? ` +${order.items.length - 1} more` : '') : 'N/A',
        amount: `₹${(order.totalAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
        status: order.status || 'Pending'
      }))
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error fetching dashboard stats' });
  }
});

module.exports = router;
