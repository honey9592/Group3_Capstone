const API_URL = 'http://localhost:5000/api';

// ─── Products ───
export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const createProduct = async (productData) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const updateProduct = async (id, productData) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

// ─── Auth ───
export const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

// ─── Orders ───
export const placeOrder = async (orderData) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const getUserOrders = async (email) => {
  const response = await fetch(`${API_URL}/orders/${email}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const getAllOrders = async () => {
  const response = await fetch(`${API_URL}/orders/all`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/orders/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};

export const getRevenueStats = async () => {
  const response = await fetch(`${API_URL}/orders/stats/revenue`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
};
