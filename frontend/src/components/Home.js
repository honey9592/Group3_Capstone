import React from 'react';

function Home({ setCurrentPage }) {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to GroceryHub</h1>
        <p>Fresh groceries delivered to your doorstep</p>
        <button 
          className="cta-button" 
          onClick={() => setCurrentPage('products')}
        >
          Shop Now
        </button>
      </div>

      <div className="container">
        <h2>Featured Categories</h2>
        <div className="categories">
          <div className="category-card" onClick={() => setCurrentPage('products')}>
            <div className="category-icon">
              <img src="https://via.placeholder.com/80x80?text=Fruits" alt="Fruits" />
            </div>
            <h3>Fruits</h3>
          </div>
          <div className="category-card" onClick={() => setCurrentPage('products')}>
            <div className="category-icon">
              <img src="https://via.placeholder.com/80x80?text=Dairy" alt="Dairy" />
            </div>
            <h3>Dairy</h3>
          </div>
          <div className="category-card" onClick={() => setCurrentPage('products')}>
            <div className="category-icon">
              <img src="https://via.placeholder.com/80x80?text=Bakery" alt="Bakery" />
            </div>
            <h3>Bakery</h3>
          </div>
          <div className="category-card" onClick={() => setCurrentPage('products')}>
            <div className="category-icon">
              <img src="https://via.placeholder.com/80x80?text=Vegetables" alt="Vegetables" />
            </div>
            <h3>Vegetables</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
