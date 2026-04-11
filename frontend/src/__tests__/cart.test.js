// Test 1: Calculate cart subtotal
test('Cart subtotal should sum price x quantity', () => {
  const cart = [
    { _id: '1', price: 4.99, quantity: 2 },
    { _id: '2', price: 3.49, quantity: 1 }
  ];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  expect(total).toBeCloseTo(13.47);
});

// Test 2: Empty cart should be zero
test('Empty cart total should be 0', () => {
  const total = [].reduce((sum, item) => sum + item.price * item.quantity, 0);
  expect(total).toBe(0);
});

// Test 3: Tax should be 13%
test('Tax should be 13% of subtotal', () => {
  const subtotal = 100;
  const tax = subtotal * 0.13;
  expect(tax).toBe(13);
});

// Test 4: Free shipping over $50
test('Shipping should be free over $50', () => {
  expect(60 > 50 ? 0 : 5.99).toBe(0);
  expect(30 > 50 ? 0 : 5.99).toBe(5.99);
});

// Test 5: Add item to cart
test('Adding item to cart should increase length', () => {
  const cart = [];
  const product = { _id: '1', name: 'Milk', price: 4.99 };
  const newCart = [...cart, { ...product, quantity: 1 }];
  expect(newCart.length).toBe(1);
  expect(newCart[0].name).toBe('Milk');
});
