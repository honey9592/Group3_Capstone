import React from 'react';
import { getEmoji, hasImage } from '../utils/productImage';

function Cart({ cart, updateQuantity, removeFromCart, getCartTotal, setCurrentPage, user }) {

  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <button className="btn-primary" onClick={() => setCurrentPage('products')}>Browse Products</button>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.13;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    if (!user) { setCurrentPage('login'); return; }
    setCurrentPage('checkout');
  };

  return (
    <div className="container">
      <h1 className="page-title">Shopping Cart <span className="item-count">({cart.length} items)</span></h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-thumb">
                {hasImage(item) ? (
                  <img src={item.image} alt={item.name} className="cart-thumb-img" />
                ) : (
                  <span className="cart-thumb-emoji">{getEmoji(item.category)}</span>
                )}
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">${item.price.toFixed(2)} each</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              </div>
              <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
              <button className="remove-btn" onClick={() => removeFromCart(item._id)} title="Remove item">✕</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Tax (13% HST)</span><span>${tax.toFixed(2)}</span></div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className={shipping === 0 ? 'free-shipping' : ''}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </div>
          {shipping > 0 && <p className="shipping-note">🚚 Add ${(50 - subtotal).toFixed(2)} more for free shipping!</p>}
          <div className="summary-row total"><strong>Total</strong><strong>${total.toFixed(2)}</strong></div>
          <button className="checkout-btn" onClick={handleCheckout}>
            {user ? 'Proceed to Checkout →' : 'Login to Checkout'}
          </button>
          <button className="btn-outline full-width" onClick={() => setCurrentPage('products')} style={{ marginTop: '10px' }}>← Continue Shopping</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
