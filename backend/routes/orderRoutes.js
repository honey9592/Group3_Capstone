const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// POST /api/orders - Create a new order
router.post('/', async (req, res) => {
  try {
    const { userEmail, userName, items, subtotal, tax, shipping, total } = req.body;

    const order = await Order.create({
      userEmail,
      userName,
      items,
      subtotal,
      tax,
      shipping,
      total,
      status: 'Pending'
    });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/orders/all - Get ALL orders (admin)
router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/orders/stats/revenue - Get revenue statistics (admin)
router.get('/stats/revenue', async (req, res) => {
  try {
    const orders = await Order.find({});

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Monthly revenue (last 12 months)
    const now = new Date();
    const monthlyRevenue = [];
    for (let i = 11; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      const monthOrders = orders.filter(o => {
        const d = new Date(o.createdAt);
        return d >= start && d <= end;
      });
      const revenue = monthOrders.reduce((sum, o) => sum + o.total, 0);
      const monthName = start.toLocaleString('default', { month: 'short', year: 'numeric' });
      monthlyRevenue.push({ month: monthName, revenue: parseFloat(revenue.toFixed(2)), orders: monthOrders.length });
    }

    // Status breakdown
    const statusCounts = {};
    orders.forEach(o => {
      statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;
    });

    // Top selling products
    const productSales = {};
    orders.forEach(o => {
      o.items.forEach(item => {
        if (!productSales[item.name]) {
          productSales[item.name] = { name: item.name, quantity: 0, revenue: 0 };
        }
        productSales[item.name].quantity += item.quantity;
        productSales[item.name].revenue += item.price * item.quantity;
      });
    });
    const topProducts = Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    res.json({
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      totalOrders,
      avgOrderValue: parseFloat(avgOrderValue.toFixed(2)),
      monthlyRevenue,
      statusCounts,
      topProducts
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/orders/:id/status - Update order status (admin)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/orders/:email - Get orders by user email
router.get('/:email', async (req, res) => {
  try {
    const orders = await Order.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
