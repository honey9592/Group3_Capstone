const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
  { name: 'Fresh Apples', price: 3.99, category: 'Fruits', stock: 50, description: 'Crisp and juicy red apples from local farms' },
  { name: 'Organic Bananas', price: 2.49, category: 'Fruits', stock: 75, description: 'Naturally grown organic bananas' },
  { name: 'Strawberries', price: 5.99, category: 'Fruits', stock: 30, description: 'Fresh sweet strawberries, perfect for snacking' },
  { name: 'Whole Milk', price: 4.99, category: 'Dairy', stock: 30, description: 'Farm-fresh whole milk, 1 gallon' },
  { name: 'Cheddar Cheese', price: 5.99, category: 'Dairy', stock: 25, description: 'Aged cheddar cheese block' },
  { name: 'Greek Yogurt', price: 3.49, category: 'Dairy', stock: 40, description: 'Creamy plain Greek yogurt' },
  { name: 'Fresh Bread', price: 2.99, category: 'Bakery', stock: 20, description: 'Freshly baked artisan white bread' },
  { name: 'Croissants', price: 4.49, category: 'Bakery', stock: 15, description: 'Buttery French croissants, pack of 4' },
  { name: 'Chicken Breast', price: 8.99, category: 'Meat', stock: 15, description: 'Boneless skinless chicken breast, 1 lb' },
  { name: 'Ground Beef', price: 7.99, category: 'Meat', stock: 20, description: 'Lean ground beef, 1 lb' },
  { name: 'Tomatoes', price: 3.49, category: 'Vegetables', stock: 40, description: 'Vine-ripened tomatoes' },
  { name: 'Baby Spinach', price: 3.99, category: 'Vegetables', stock: 35, description: 'Organic baby spinach, 5 oz bag' },
  { name: 'Bell Peppers', price: 2.99, category: 'Vegetables', stock: 45, description: 'Mixed color bell peppers, 3 count' },
  { name: 'Orange Juice', price: 4.49, category: 'Beverages', stock: 35, description: 'Fresh squeezed orange juice, 64 oz' },
  { name: 'Spring Water', price: 1.99, category: 'Beverages', stock: 100, description: 'Natural spring water, 1 liter' },
  { name: 'Green Tea', price: 3.99, category: 'Beverages', stock: 50, description: 'Organic green tea bags, 20 count' },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Seed products
    await Product.deleteMany({});
    const created = await Product.insertMany(products);
    console.log(`${created.length} products added to database`);

    // Create admin user
    const existingAdmin = await User.findOne({ email: 'admin@groceryhub.com' });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await User.create({
        name: 'Admin',
        email: 'admin@groceryhub.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created (admin@groceryhub.com / admin123)');
    } else {
      console.log('Admin user already exists');
    }

    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
