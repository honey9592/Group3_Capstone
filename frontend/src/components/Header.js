import React from 'react';

function Header({ currentPage, setCurrentPage, cartCount, user, setUser }) {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo" onClick={() => setCurrentPage('home')}>
          GroceryHub
        </h1>
        
        <nav className="nav">
          <button onClick={() => setCurrentPage('home')}>Home</button>
          <button onClick={() => setCurrentPage('products')}>Products</button>
          
          {user ? (
            <>
              <span className="user-name">Hello, {user.name}</span>
              <button onClick={() => setUser(null)}>Logout</button>
            </>
          ) : (
            <button onClick={() => setCurrentPage('login')}>Login</button>
          )}
          
          <button 
            className="cart-btn" 
            onClick={() => setCurrentPage('cart')}
          >
            Cart {cartCount > 0 && `(${cartCount})`}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
