import React, { useState } from 'react';
import { getEmoji, getBg, hasImage } from '../utils/productImage';

function Products({ products, addToCart, navigateToProduct }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [addedId, setAddedId] = useState(null);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAdd = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 800);
  };

  return (
    <div className="container">
      <div className="products-header">
        <h1>Our Products</h1>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="category-filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={selectedCategory === cat ? 'active' : ''}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat !== 'All' && <span>{getEmoji(cat)}</span>} {cat}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <span className="no-results-icon">🔍</span>
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div
              key={product._id}
              className="product-card product-card-clickable"
              onClick={() => navigateToProduct(product._id)}
            >
              <div className="product-image" style={{ background: hasImage(product) ? '#fff' : getBg(product.category) }}>
                {hasImage(product) ? (
                  <img src={product.image} alt={product.name} className="product-img" />
                ) : (
                  <span className="product-emoji">{getEmoji(product.category)}</span>
                )}
              </div>
              <div className="product-info">
                <span className="product-category-tag">{product.category}</span>
                <h3>{product.name}</h3>
                {product.description && <p className="product-desc">{product.description}</p>}
                <div className="product-bottom">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <span className={`stock ${product.stock < 10 ? 'low-stock' : ''}`}>
                    {product.stock < 10 ? `Only ${product.stock} left` : `In Stock`}
                  </span>
                </div>
                <button
                  className={`add-to-cart-btn ${addedId === product._id ? 'added' : ''}`}
                  onClick={(e) => handleAdd(e, product)}
                >
                  {addedId === product._id ? '✓ Added!' : '+ Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
