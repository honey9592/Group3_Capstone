const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  { name: 'Fresh Apples', price: 3.99, category: 'Fruits', stock: 50 },
  { name: 'Organic Bananas', price: 2.49, category: 'Fruits', stock: 75 },
  { name: 'Whole Milk', price: 4.99, category: 'Dairy', stock: 30 },
  { name: 'Fresh Bread', price: 2.99, category: 'Bakery', stock: 20 },
  { name: 'Chicken Breast', price: 8.99, category: 'Meat', stock: 15 },
  { name: 'Tomatoes', price: 3.49, category: 'Vegetables', stock: 40 },
  { name: 'Cheddar Cheese', price: 5.99, category: 'Dairy', stock: 25 },
  { name: 'Orange Juice', price: 4.49, category: 'Beverages', stock: 35 },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Delete existing products
    await Product.deleteMany({});
    console.log('Old products removed');

    // Insert new products
    const created = await Product.insertMany(products);
    console.log(`${created.length} products added to database`);

    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seedProducts();
