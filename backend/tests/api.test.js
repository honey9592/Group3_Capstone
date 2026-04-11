const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const productRoutes = require('../routes/productRoutes');
const Product = require('../models/Product');

const app = express();
app.use(express.json());
app.use('/api/products', productRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/groceryhub_test');
});

afterAll(async () => {
  await Product.deleteMany({});
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Product.deleteMany({});
});

// Test 1: GET all products
test('GET /api/products should return products array', async () => {
  const res = await request(app).get('/api/products');
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

// Test 2: POST create a product
test('POST /api/products should create a new product', async () => {
  const res = await request(app).post('/api/products').send({
    name: 'Basmati Rice', price: 18.99, category: 'Pantry', stock: 45
  });
  expect(res.statusCode).toBe(201);
  expect(res.body.product.name).toBe('Basmati Rice');
});

// Test 3: PUT update a product
test('PUT /api/products/:id should update product', async () => {
  const product = await Product.create({ name: 'Old Name', price: 5, category: 'Dairy', stock: 10 });
  const res = await request(app).put(`/api/products/${product._id}`).send({
    name: 'New Name', price: 7.99, category: 'Dairy', stock: 20
  });
  expect(res.statusCode).toBe(200);
  expect(res.body.product.name).toBe('New Name');
});

// Test 4: DELETE a product
test('DELETE /api/products/:id should remove product', async () => {
  const product = await Product.create({ name: 'To Delete', price: 1, category: 'Snacks', stock: 5 });
  const res = await request(app).delete(`/api/products/${product._id}`);
  expect(res.statusCode).toBe(200);
  const found = await Product.findById(product._id);
  expect(found).toBeNull();
});

// Test 5: GET non-existent product returns 404
test('GET /api/products/:id with bad ID should return 404', async () => {
  const fakeId = new mongoose.Types.ObjectId();
  const res = await request(app).get(`/api/products/${fakeId}`);
  expect(res.statusCode).toBe(404);
});
