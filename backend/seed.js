const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();



const products = [
  // ───── DAIRY ─────
  {
    name: 'Whole Milk',
    price: 4.99,
    category: 'Dairy',
    stock: 50,
    description: 'Fresh whole milk, 1 gallon. Rich and creamy, perfect for tea, coffee, or cooking.',
    image: ''
  },
  {
    name: 'Plain Yogurt (Dahi)',
    price: 3.99,
    category: 'Dairy',
    stock: 40,
    description: 'Thick and creamy traditional plain yogurt, 1 kg. Perfect for raita and lassi.',
    image: ''
  },
  {
    name: 'Paneer (Cottage Cheese)',
    price: 6.99,
    category: 'Dairy',
    stock: 30,
    description: 'Fresh homemade-style paneer, 400g. Soft and perfect for curries.',
    image: ''
  },
  {
    name: 'Pure Desi Ghee',
    price: 14.99,
    category: 'Dairy',
    stock: 25,
    description: 'Traditional pure cow ghee, 500g. Rich aroma and authentic taste.',
    image: ''
  },
  {
    name: 'Salted Butter',
    price: 5.99,
    category: 'Dairy',
    stock: 35,
    description: 'Creamy salted butter, 250g. Great for cooking and spreading.',
    image: ''
  },
  {
    name: 'Fresh Cream',
    price: 4.49,
    category: 'Dairy',
    stock: 30,
    description: 'Whipping cream, 250ml. Perfect for desserts and curries.',
    image: ''
  },
  {
    name: 'Cheese Block',
    price: 7.99,
    category: 'Dairy',
    stock: 25,
    description: 'Premium cheese block, 400g. Great for sandwiches and snacks.',
    image: ''
  },
  {
    name: 'Sweet Lassi',
    price: 3.49,
    category: 'Dairy',
    stock: 40,
    description: 'Traditional sweet lassi, 1 liter. Refreshing yogurt drink.',
    image: ''
  },

  // ───── VEGETABLES ─────
  {
    name: 'Fresh Tomatoes',
    price: 3.49,
    category: 'Vegetables',
    stock: 60,
    description: 'Vine-ripened red tomatoes, 1 kg. Perfect for curries and salads.',
    image: ''
  },
  {
    name: 'Yellow Onions',
    price: 2.99,
    category: 'Vegetables',
    stock: 80,
    description: 'Fresh yellow onions, 2 kg bag. Essential for every Indian kitchen.',
    image: ''
  },
  {
    name: 'Russet Potatoes',
    price: 4.99,
    category: 'Vegetables',
    stock: 70,
    description: 'Fresh russet potatoes, 5 lb bag. Versatile for all dishes.',
    image: ''
  },
  {
    name: 'Fresh Spinach (Palak)',
    price: 3.99,
    category: 'Vegetables',
    stock: 45,
    description: 'Tender baby spinach leaves, 500g. Perfect for palak paneer.',
    image: ''
  },
  {
    name: 'Fresh Ginger',
    price: 2.49,
    category: 'Vegetables',
    stock: 50,
    description: 'Fresh ginger root, 250g. Aromatic and spicy.',
    image: ''
  },
  {
    name: 'Green Chilies',
    price: 1.99,
    category: 'Vegetables',
    stock: 55,
    description: 'Fresh green chilies, 200g. Adds heat to any dish.',
    image: ''
  },
  {
    name: 'Fresh Cilantro (Dhania)',
    price: 1.49,
    category: 'Vegetables',
    stock: 60,
    description: 'Fresh cilantro/coriander leaves, 1 bunch. Essential garnish.',
    image: ''
  },
  {
    name: 'Mixed Vegetables (Frozen)',
    price: 4.49,
    category: 'Vegetables',
    stock: 40,
    description: 'Frozen mixed vegetables, 1 kg. Carrots, peas, beans, corn.',
    image: ''
  },

  // ───── PANTRY / GROCERY ─────
  {
    name: 'Whole Wheat Atta',
    price: 12.99,
    category: 'Pantry',
    stock: 50,
    description: 'Stone-ground whole wheat flour, 10 lb bag. For soft rotis and chapatis.',
    image: ''
  },
  {
    name: 'Basmati Rice',
    price: 18.99,
    category: 'Pantry',
    stock: 45,
    description: 'Premium aged basmati rice, 10 lb bag. Long grain and aromatic.',
    image: ''
  },
  {
    name: 'Toor Dal (Yellow Lentils)',
    price: 6.99,
    category: 'Pantry',
    stock: 40,
    description: 'Premium split toor dal, 2 kg. For dal tadka and sambar.',
    image: ''
  },
  {
    name: 'Garam Masala',
    price: 4.99,
    category: 'Pantry',
    stock: 60,
    description: 'Authentic Indian garam masala blend, 100g. Aromatic spice mix.',
    image: ''
  },
  {
    name: 'Turmeric Powder (Haldi)',
    price: 3.49,
    category: 'Pantry',
    stock: 65,
    description: 'Pure turmeric powder, 200g. Vibrant color and earthy flavor.',
    image: ''
  },
  {
    name: 'Red Chili Powder',
    price: 3.99,
    category: 'Pantry',
    stock: 60,
    description: 'Kashmiri red chili powder, 200g. Adds color and mild heat.',
    image: ''
  },
  {
    name: 'Mango Pickle (Achar)',
    price: 5.99,
    category: 'Pantry',
    stock: 35,
    description: 'Traditional mango pickle, 500g jar. Tangy and spicy.',
    image: ''
  },
  {
    name: 'Crispy Papad',
    price: 3.99,
    category: 'Pantry',
    stock: 50,
    description: 'Urad dal papad, pack of 12. Crispy lentil wafers.',
    image: ''
  },

  // ───── SNACKS ─────
  {
    name: 'Mixed Namkeen',
    price: 4.49,
    category: 'Snacks',
    stock: 50,
    description: 'Crunchy mixed namkeen, 400g. Perfect with tea.',
    image: ''
  },
  {
    name: 'Frozen Samosas',
    price: 6.99,
    category: 'Snacks',
    stock: 40,
    description: 'Frozen vegetable samosas, pack of 12. Just heat and serve.',
    image: ''
  },
  {
    name: 'Butter Cookies',
    price: 3.99,
    category: 'Snacks',
    stock: 55,
    description: 'Classic butter cookies, 300g. Tea-time favorite.',
    image: ''
  },

  // ───── BEVERAGES ─────
  {
    name: 'Premium Tea (Chai)',
    price: 8.99,
    category: 'Beverages',
    stock: 50,
    description: 'Premium loose leaf tea, 500g. Strong and aromatic for masala chai.',
    image: ''
  },
  {
    name: 'Soft Drink',
    price: 2.49,
    category: 'Beverages',
    stock: 80,
    description: 'Refreshing soft drink, 2 liter bottle.',
    image: ''
  },

  // ───── HOUSEHOLD ─────
  {
    name: 'Laundry Detergent',
    price: 11.99,
    category: 'Household',
    stock: 35,
    description: 'Powerful laundry detergent, 3 kg. Removes tough stains.',
    image: ''
  },
  {
    name: 'Paper Towels',
    price: 6.99,
    category: 'Household',
    stock: 45,
    description: 'Absorbent paper towels, 6 rolls. For everyday cleaning.',
    image: ''
  },
  {
    name: 'Toilet Paper',
    price: 8.99,
    category: 'Household',
    stock: 50,
    description: 'Soft toilet paper, 12 rolls. 2-ply premium quality.',
    image: ''
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ MongoDB Connected');

    // Seed products
    await Product.deleteMany({});
    console.log('✓ Old products removed');

    const created = await Product.insertMany(products);
    console.log(`✓ ${created.length} products added to database`);

    // Create admin user
    const existingAdmin = await User.findOne({ email: 'admin@groceryhub.com' });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await User.create({
        name: 'Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✓ Admin user created (admin@groceryhub.com / admin123)');
    } else {
      console.log('✓ Admin user already exists');
    }

    console.log('\n🎉 Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
};

seedDatabase();