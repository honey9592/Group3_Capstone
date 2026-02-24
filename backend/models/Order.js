const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  shipping: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
