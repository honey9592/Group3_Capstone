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
      total
    });

    res.status(201).json({ message: 'Order placed successfully', order });
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
