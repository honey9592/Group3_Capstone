import React, { useState, useEffect } from 'react';
import './App.css';
import { getProducts } from './api';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import MyOrders from './components/MyOrders';
import AdminDashboard from './components/AdminDashboard';
import AdminProducts from './components/AdminProducts';
import AdminOrders from './components/AdminOrders';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('groceryhub_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('groceryhub_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('groceryhub_user');
    }
  }, [user]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product, qty = 1) => {
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + qty }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: qty }]);
    }
    showToast(`${product.name} × ${qty} added to cart`);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item._id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const refreshProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to refresh products:', error.message);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    setCurrentPage('home');
  };

  const navigateToProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
  };

  const isAdmin = user && user.role === 'admin';

  return (
    <div className="App">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cartCount}
        user={user}
        handleLogout={handleLogout}
        isAdmin={isAdmin}
      />

      <main>
        {currentPage === 'home' && (
          <Home
            setCurrentPage={setCurrentPage}
            products={products}
            addToCart={addToCart}
            navigateToProduct={navigateToProduct}
          />
        )}

        {currentPage === 'products' && (
          loading
            ? <div className="container"><div className="loading-spinner"><div className="spinner"></div><p>Loading products...</p></div></div>
            : <Products products={products} addToCart={addToCart} navigateToProduct={navigateToProduct} />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetail
            products={products}
            productId={selectedProductId}
            addToCart={addToCart}
            setCurrentPage={setCurrentPage}
            navigateToProduct={navigateToProduct}
          />
        )}

        {currentPage === 'cart' && (
          <Cart
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            getCartTotal={getCartTotal}
            setCurrentPage={setCurrentPage}
            user={user}
          />
        )}

        {currentPage === 'checkout' && (
          <Checkout
            cart={cart}
            getCartTotal={getCartTotal}
            user={user}
            clearCart={clearCart}
            setCurrentPage={setCurrentPage}
            showToast={showToast}
          />
        )}

        {currentPage === 'login' && (
          <Login setUser={setUser} setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'register' && (
          <Register setUser={setUser} setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'myorders' && user && (
          <MyOrders user={user} />
        )}

        {currentPage === 'admin' && isAdmin && (
          <AdminDashboard setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'admin-products' && isAdmin && (
          <AdminProducts refreshProducts={refreshProducts} showToast={showToast} />
        )}

        {currentPage === 'admin-orders' && isAdmin && (
          <AdminOrders showToast={showToast} />
        )}
      </main>

      <Footer setCurrentPage={setCurrentPage} />

      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message}
        </div>
      )}
    </div>
  );
}

export default App;
