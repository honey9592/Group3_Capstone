import React, { useState } from 'react';
import { getEmoji, getBg, hasImage } from '../utils/productImage';

function ProductDetail({ products, productId, addToCart, setCurrentPage, navigateToProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find(p => p._id === productId);

  if (!product) {
    return (
      <div className="container">
        <div className="empty-cart">
          <div className="empty-icon">😕</div>
          <h2>Product not found</h2>
          <button className="btn-primary" onClick={() => setCurrentPage('products')}>Back to Products</button>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const incrementQty = () => { if (quantity < product.stock) setQuantity(quantity + 1); };
  const decrementQty = () => { if (quantity > 1) setQuantity(quantity - 1); };

  return (
    <div className="container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button onClick={() => setCurrentPage('home')}>Home</button>
        <span className="breadcrumb-sep">/</span>
        <button onClick={() => setCurrentPage('products')}>Products</button>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{product.name}</span>
      </div>

      {/* Product Detail Layout */}
      <div className="pd-layout">
        <div className="pd-image-section" style={{ background: hasImage(product) ? '#fff' : getBg(product.category) }}>
          {hasImage(product) ? (
            <img src={product.image} alt={product.name} className="pd-img" />
          ) : (
            <span className="pd-emoji">{getEmoji(product.category)}</span>
          )}
        </div>

        <div className="pd-info-section">
          <span className="product-category-tag">{product.category}</span>
          <h1 className="pd-title">{product.name}</h1>

          <div className="pd-price-row">
            <span className="pd-price">${product.price.toFixed(2)}</span>
            <span className={`pd-stock ${product.stock < 10 ? 'low-stock' : ''}`}>
              {product.stock < 10 ? `Only ${product.stock} left!` : `✓ In Stock (${product.stock} available)`}
            </span>
          </div>

          {product.description && (
            <div className="pd-description">
              <h3>About this product</h3>
              <p>{product.description}</p>
            </div>
          )}

          <div className="pd-details-grid">
            <div className="pd-detail-item"><span className="pd-detail-icon">📦</span><div><strong>Category</strong><span>{product.category}</span></div></div>
            <div className="pd-detail-item"><span className="pd-detail-icon">🚚</span><div><strong>Delivery</strong><span>Free over $50</span></div></div>
            <div className="pd-detail-item"><span className="pd-detail-icon">🔄</span><div><strong>Returns</strong><span>Easy returns</span></div></div>
            <div className="pd-detail-item"><span className="pd-detail-icon">🌿</span><div><strong>Quality</strong><span>Farm fresh</span></div></div>
          </div>

          <div className="pd-divider"></div>

          {/* Quantity & Add to Cart */}
          <div className="pd-actions">
            <div className="pd-quantity-selector">
              <label>Quantity</label>
              <div className="pd-qty-controls">
                <button className="pd-qty-btn" onClick={decrementQty} disabled={quantity <= 1}>−</button>
                <input type="number" className="pd-qty-input" value={quantity}
                  onChange={(e) => { const val = parseInt(e.target.value) || 1; setQuantity(Math.max(1, Math.min(val, product.stock))); }}
                  min={1} max={product.stock} />
                <button className="pd-qty-btn" onClick={incrementQty} disabled={quantity >= product.stock}>+</button>
              </div>
            </div>
            <div className="pd-subtotal">
              <span className="pd-subtotal-label">Subtotal</span>
              <span className="pd-subtotal-value">${(product.price * quantity).toFixed(2)}</span>
            </div>
          </div>

          <div className="pd-buttons">
            <button className={`btn-primary pd-add-btn ${added ? 'added' : ''}`} onClick={handleAddToCart}>
              {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
            </button>
            <button className="btn-outline pd-buy-btn" onClick={() => { addToCart(product, quantity); setCurrentPage('cart'); }}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pd-related">
          <h2>You might also like</h2>
          <div className="pd-related-grid">
            {relatedProducts.map(rp => (
              <div key={rp._id} className="product-card" onClick={() => { navigateToProduct(rp._id); setQuantity(1); setAdded(false); }}>
                <div className="product-image" style={{ background: hasImage(rp) ? '#fff' : getBg(rp.category) }}>
                  {hasImage(rp) ? (
                    <img src={rp.image} alt={rp.name} className="product-img" />
                  ) : (
                    <span className="product-emoji">{getEmoji(rp.category)}</span>
                  )}
                </div>
                <div className="product-info">
                  <span className="product-category-tag">{rp.category}</span>
                  <h3>{rp.name}</h3>
                  <div className="product-bottom">
                    <span className="price">${rp.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
