import React, { useState } from 'react';

function Products({ products, addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="container">
      <h1>Our Products</h1>
      
      <div className="category-filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={selectedCategory === cat ? 'active' : ''}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img src={`https://via.placeholder.com/150x150?text=${product.name}`} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="stock">Stock: {product.stock}</p>
            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
