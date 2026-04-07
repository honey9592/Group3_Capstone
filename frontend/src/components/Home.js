import React from 'react';
import { getEmoji, getBg, hasImage } from '../utils/productImage';

const categories = [
  {
    name: 'Fresh Produce',
    filterCategory: 'Vegetables',
    image: 'https://i.ibb.co/Y4NMx4hF/produce.png',
    color: '#dcfce7'
  },
  {
    name: 'Dairy',
    filterCategory: 'Dairy',
    image: 'https://i.ibb.co/d4ZMKMvn/dairy.png',
    color: '#fef9c3'
  },
  {
    name: 'Punjabi Specials',
    filterCategory: 'Pantry',
    image: 'https://i.ibb.co/GvK1ZMSX/punjabi.png',
    color: '#fef3c7'
  },
  {
    name: 'Snacks',
    filterCategory: 'Snacks',
    image: 'https://i.ibb.co/5g5DThBf/snacks.png',
    color: '#fed7aa'
  },
  {
    name: 'Household',
    filterCategory: 'Household',
    image: 'https://i.ibb.co/nNH5hcDj/household.png',
    color: '#e0f2fe'
  },
];

const features = [
  { icon: '🚚', title: 'Free Delivery', desc: 'On orders over $50' },
  { icon: '🌿', title: 'Fresh & Organic', desc: 'Farm to table quality' },
  { icon: '💰', title: 'Best Prices', desc: 'Competitive pricing always' },
  { icon: '⏰', title: 'Fast Delivery', desc: 'Same day delivery available' },
];

function Home({ setCurrentPage, products, addToCart, navigateToProduct }) {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">🌟 Fresh Picks Daily</span>
          <h1>Fresh Groceries<br />Delivered to Your <span className="text-highlight">Doorstep</span></h1>
          <p>Shop from hundreds of fresh products with fast delivery and unbeatable prices.</p>
          <div className="hero-actions">
            <button className="cta-button" onClick={() => setCurrentPage('products')}>Shop Now →</button>
            <button className="cta-button-outline" onClick={() => setCurrentPage('register')}>Create Account</button>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p className="section-subtitle">Browse our wide selection of fresh products</p>
        </div>
        <div className="categories">
          {categories.map(cat => (
            <div key={cat.name} className="category-card" style={{ '--cat-bg': cat.color }} onClick={() => setCurrentPage('products')}>
              <div className="category-emoji">{cat.emoji}</div>
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="container section">
          <div className="section-header">
            <span className="section-badge">⭐ Handpicked for you</span>
            <h2>Featured Products</h2>
            <p className="section-subtitle">Our most popular items this week</p>
          </div>
          <div className="featured-grid">
            {featuredProducts.map(product => (
              <div key={product._id} className="featured-card" onClick={() => navigateToProduct(product._id)}>
                <div className="featured-image" style={{ background: hasImage(product) ? '#fff' : getBg(product.category) }}>
                  {hasImage(product) ? (
                    <img src={product.image} alt={product.name} className="featured-img" />
                  ) : (
                    <span className="featured-emoji">{getEmoji(product.category)}</span>
                  )}
                  {product.stock < 10 && <span className="featured-badge-low">Low Stock</span>}
                </div>
                <div className="featured-info">
                  <span className="featured-cat">{product.category}</span>
                  <h3>{product.name}</h3>
                  <div className="featured-price-row">
                    <span className="featured-price">${product.price.toFixed(2)}</span>
                    <button className="featured-add-btn" onClick={(e) => { e.stopPropagation(); addToCart(product); }} title="Add to cart">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <button className="btn-outline" onClick={() => setCurrentPage('products')}>View All Products →</button>
          </div>
        </section>
      )}

      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map(f => (
              <div key={f.title} className="feature-card">
                <span className="feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <div className="cta-banner-text">
            <h2>Ready to get started?</h2>
            <p>Join thousands of happy customers who shop with GroceryHub every week.</p>
          </div>
          <button className="cta-button" onClick={() => setCurrentPage('register')}>Sign Up Free →</button>
        </div>
      </section>
    </div>
  );
}

export default Home;
