# GroceryHub — Full-Stack E-Commerce Application
### Group 3 — Web Development Capstone

A complete grocery e-commerce platform built with **React** (frontend) and **Express + MongoDB** (backend), featuring a customer shopping experience and a full admin dashboard.

---

## Features

### Customer Side
- Home page with hero section, featured categories, and feature highlights
- Products page with search, category filtering, and add-to-cart
- Shopping Cart with quantity controls, tax/shipping calculations, and checkout
- User Registration and Login with password hashing (bcrypt)
- My Orders page with order history and status tracking
- Fully responsive design for desktop, tablet, and mobile

### Admin Dashboard
- Revenue Dashboard with total revenue, total orders, average order value, monthly revenue bar chart, order status breakdown, and top selling products
- Product Management to add, edit, and delete products with a modal form
- Order Management to view all orders, search/filter by status, and update order status

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (connection string already in .env)

### 1. Backend Setup
```bash
cd backend
npm install
npm run seed    # Seeds products + creates admin user
npm start       # Starts on port 5000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start       # Opens at http://localhost:3000
```

---

## Admin Login Credentials
- **Email:** admin@gmail.com
- **Password:** admin123

---

© 2026 GroceryHub — Group 3 Capstone Project
