<<<<<<< HEAD
import React, { useState } from 'react';
import { placeOrder } from '../api';

function Cart({ cart, updateQuantity, removeFromCart, getCartTotal, setCurrentPage, user, clearCart }) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (orderPlaced) {
    return (
      <div className="container">
        <div className="empty-cart">
          <h2>✅ Order Placed Successfully!</h2>
          <p style={{ margin: '15px 0', color: '#666' }}>Thank you for your order.</p>
          <button onClick={() => setCurrentPage('products')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

=======
import React from 'react';

function Cart({ cart, updateQuantity, removeFromCart, getCartTotal, setCurrentPage }) {
>>>>>>> b4a8c264d86c1742d142285c94bcb5332e0fe3f5
  if (cart.length === 0) {
    return (
      <div className="container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <button onClick={() => setCurrentPage('products')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.13;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

<<<<<<< HEAD
  const handleCheckout = async () => {
    if (!user) {
      setCurrentPage('login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderData = {
        userEmail: user.email,
        userName: user.name,
        items: cart.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        subtotal: parseFloat(subtotal.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        shipping: parseFloat(shipping.toFixed(2)),
        total: parseFloat(total.toFixed(2))
      };

      await placeOrder(orderData);
      clearCart();
      setOrderPlaced(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

=======
>>>>>>> b4a8c264d86c1742d142285c94bcb5332e0fe3f5
  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      
<<<<<<< HEAD
      {error && <p style={{ color: 'red', textAlign: 'center', margin: '10px 0' }}>{error}</p>}

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item._id} className="cart-item">
=======
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
>>>>>>> b4a8c264d86c1742d142285c94bcb5332e0fe3f5
              <div className="item-image">
                <img src={`https://via.placeholder.com/60x60?text=${item.name}`} alt={item.name} />
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="item-quantity">
<<<<<<< HEAD
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
=======
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
>>>>>>> b4a8c264d86c1742d142285c94bcb5332e0fe3f5
              </div>
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button 
                className="remove-btn"
<<<<<<< HEAD
                onClick={() => removeFromCart(item._id)}
=======
                onClick={() => removeFromCart(item.id)}
>>>>>>> b4a8c264d86c1742d142285c94bcb5332e0fe3f5
              >
                X
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (13%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </div>
          {shipping > 0 && (
            <p className="shipping-note">
              Add ${(50 - subtotal).toFixed(2)} more for free shipping!
            </p>
          )}
          <div className="summary-row total">
            <strong>Total:</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
<<<<<<< HEAD
          <button className="checkout-btn" onClick={handleCheckout} disabled={loading}>
            {loading ? 'Placing Order...' : (user ? 'Place Order' : 'Login to Checkout')}
=======
          <button className="checkout-btn">
            Proceed to Checkout
>>>>>>> b4a8c264d86c1742d142285c94bcb5332e0fe3f5
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
