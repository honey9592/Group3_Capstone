import React, { useState, useEffect } from 'react';
import './App.css';
import { getProducts } from './api';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend on app load
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

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item => 
        item._id === product._id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
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

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="App">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        cartCount={cartCount}
        user={user}
        setUser={setUser}
      />
      
      <main>
        {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
        
        {currentPage === 'products' && (
          loading 
            ? <div className="container"><p>Loading products...</p></div>
            : <Products products={products} addToCart={addToCart} />
        )}
        
        {currentPage === 'cart' && (
          <Cart 
            cart={cart} 
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            getCartTotal={getCartTotal}
            setCurrentPage={setCurrentPage}
            user={user}
            clearCart={clearCart}
          />
        )}
        
        {currentPage === 'login' && (
          <Login setUser={setUser} setCurrentPage={setCurrentPage} />
        )}
        
        {currentPage === 'register' && (
          <Register setUser={setUser} setCurrentPage={setCurrentPage} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
