import React, { useState } from 'react';

function Header({ currentPage, setCurrentPage, cartCount, user, handleLogout, isAdmin }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <h1 className="logo" onClick={() => navigate('home')}>
          <img src="/logo-icon.svg" alt="GroceryHub" className="logo-svg" />
          <span>Grocery<span className="logo-hub">Hub</span></span>
        </h1>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
        </button>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <button className={currentPage === 'home' ? 'nav-active' : ''} onClick={() => navigate('home')}>Home</button>
          <button className={currentPage === 'products' ? 'nav-active' : ''} onClick={() => navigate('products')}>Products</button>

          {user ? (
            <>
              {!isAdmin && (
                <button className={currentPage === 'myorders' ? 'nav-active' : ''} onClick={() => navigate('myorders')}>My Orders</button>
              )}
              {isAdmin && (
                <button className={`admin-nav-btn ${['admin','admin-products','admin-orders'].includes(currentPage) ? 'nav-active' : ''}`} onClick={() => navigate('admin')}>
                  ⚙ Admin
                </button>
              )}
              <span className="user-greeting">Hi, {user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button className={currentPage === 'login' ? 'nav-active' : ''} onClick={() => navigate('login')}>Login</button>
          )}

          <button
            className="cart-btn"
            onClick={() => navigate('cart')}
          >
            🛒 Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
