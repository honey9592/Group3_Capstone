import React, { useState } from 'react';
import { placeOrder } from '../api';
import { getEmoji, hasImage } from '../utils/productImage';

function Checkout({ cart, getCartTotal, user, clearCart, setCurrentPage, showToast }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: user ? user.name : '', address: '', city: '', province: '', postalCode: '', phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [step, setStep] = useState(1);

  const subtotal = getCartTotal();
  const tax = subtotal * 0.13;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  if (!user) {
    return (<div className="container"><div className="empty-cart"><div className="empty-icon">🔒</div><h2>Please login to checkout</h2><button className="btn-primary" onClick={() => setCurrentPage('login')}>Login</button></div></div>);
  }
  if (cart.length === 0 && !orderPlaced) {
    return (<div className="container"><div className="empty-cart"><div className="empty-icon">🛒</div><h2>Your cart is empty</h2><button className="btn-primary" onClick={() => setCurrentPage('products')}>Browse Products</button></div></div>);
  }
  if (orderPlaced) {
    return (<div className="container"><div className="order-success"><div className="success-icon">🎉</div><h2>Order Placed Successfully!</h2><p>Thank you for your purchase. {paymentMethod === 'cod' ? 'Please have cash ready at delivery.' : 'Your card has been charged.'}</p><div className="success-actions"><button className="btn-primary" onClick={() => setCurrentPage('products')}>Continue Shopping</button><button className="btn-outline" onClick={() => setCurrentPage('myorders')}>View My Orders</button></div></div></div>);
  }

  const handleCardChange = (e) => {
    let { name, value } = e.target;
    if (name === 'cardNumber') { value = value.replace(/\D/g, '').substring(0, 16); value = value.replace(/(.{4})/g, '$1 ').trim(); }
    if (name === 'expiry') { value = value.replace(/\D/g, '').substring(0, 4); if (value.length > 2) value = value.substring(0, 2) + '/' + value.substring(2); }
    if (name === 'cvv') { value = value.replace(/\D/g, '').substring(0, 4); }
    setCardDetails({ ...cardDetails, [name]: value });
  };
  const handleAddressChange = (e) => setDeliveryAddress({ ...deliveryAddress, [e.target.name]: e.target.value });
  const isDeliveryValid = () => deliveryAddress.fullName && deliveryAddress.address && deliveryAddress.city && deliveryAddress.province && deliveryAddress.postalCode && deliveryAddress.phone;
  const isPaymentValid = () => {
    if (paymentMethod === 'cod') return true;
    return cardDetails.cardName && cardDetails.cardNumber.replace(/\s/g, '').length === 16 && cardDetails.expiry.length === 5 && cardDetails.cvv.length >= 3;
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      await placeOrder({
        userEmail: user.email, userName: user.name,
        items: cart.map(item => ({ productId: item._id, name: item.name, price: item.price, quantity: item.quantity })),
        subtotal: parseFloat(subtotal.toFixed(2)), tax: parseFloat(tax.toFixed(2)),
        shipping: parseFloat(shipping.toFixed(2)), total: parseFloat(total.toFixed(2))
      });
      clearCart(); setOrderPlaced(true); showToast('Order placed successfully!');
    } catch (err) { showToast(err.message, 'error'); }
    finally { setLoading(false); }
  };

  return (
    <div className="container">
      <h1 className="page-title">Checkout</h1>

      {/* Stepper */}
      <div className="checkout-stepper">
        {[{ num: 1, label: 'Delivery' }, { num: 2, label: 'Payment' }, { num: 3, label: 'Review' }].map((s, i) => (
          <React.Fragment key={s.num}>
            <div className={`stepper-step ${step >= s.num ? 'active' : ''} ${step > s.num ? 'completed' : ''}`} onClick={() => { if (s.num < step) setStep(s.num); }}>
              <div className="stepper-circle">{step > s.num ? '✓' : s.num}</div>
              <span className="stepper-label">{s.label}</span>
            </div>
            {i < 2 && <div className={`stepper-line ${step > s.num ? 'active' : ''}`}></div>}
          </React.Fragment>
        ))}
      </div>

      <div className="checkout-layout">
        <div className="checkout-main">
          {/* Step 1 */}
          {step === 1 && (
            <div className="checkout-card">
              <div className="checkout-card-header"><span className="checkout-card-icon">📍</span><h2>Delivery Address</h2></div>
              <div className="checkout-card-body">
                <div className="form-group"><label>Full Name *</label><input name="fullName" value={deliveryAddress.fullName} onChange={handleAddressChange} placeholder="John Doe" /></div>
                <div className="form-group"><label>Street Address *</label><input name="address" value={deliveryAddress.address} onChange={handleAddressChange} placeholder="123 Main Street, Apt 4" /></div>
                <div className="form-row">
                  <div className="form-group"><label>City *</label><input name="city" value={deliveryAddress.city} onChange={handleAddressChange} placeholder="Toronto" /></div>
                  <div className="form-group"><label>Province *</label>
                    <select name="province" value={deliveryAddress.province} onChange={handleAddressChange}>
                      <option value="">Select</option><option value="ON">Ontario</option><option value="BC">British Columbia</option><option value="AB">Alberta</option><option value="QC">Quebec</option><option value="MB">Manitoba</option><option value="SK">Saskatchewan</option><option value="NS">Nova Scotia</option><option value="NB">New Brunswick</option><option value="NL">Newfoundland</option><option value="PE">PEI</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group"><label>Postal Code *</label><input name="postalCode" value={deliveryAddress.postalCode} onChange={handleAddressChange} placeholder="M5V 2T6" /></div>
                  <div className="form-group"><label>Phone *</label><input name="phone" type="tel" value={deliveryAddress.phone} onChange={handleAddressChange} placeholder="(416) 555-0123" /></div>
                </div>
                <div className="checkout-card-footer">
                  <button className="btn-outline" onClick={() => setCurrentPage('cart')}>← Back to Cart</button>
                  <button className="btn-primary" disabled={!isDeliveryValid()} onClick={() => setStep(2)}>Continue to Payment →</button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="checkout-card">
              <div className="checkout-card-header"><span className="checkout-card-icon">💳</span><h2>Payment Method</h2></div>
              <div className="checkout-card-body">
                <div className="payment-options">
                  <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                    <div className="payment-option-content">
                      <div className="payment-option-header"><span className="payment-option-icon">💳</span><div><strong>Credit / Debit Card</strong><small>Pay securely with your card</small></div></div>
                      <div className="card-brands"><span className="card-brand">VISA</span><span className="card-brand">MC</span><span className="card-brand">AMEX</span></div>
                    </div>
                  </label>
                  <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                    <div className="payment-option-content">
                      <div className="payment-option-header"><span className="payment-option-icon">💵</span><div><strong>Cash on Delivery</strong><small>Pay when your order arrives</small></div></div>
                    </div>
                  </label>
                </div>
                {paymentMethod === 'card' && (
                  <div className="card-form">
                    <div className="form-group"><label>Name on Card *</label><input name="cardName" value={cardDetails.cardName} onChange={handleCardChange} placeholder="John Doe" /></div>
                    <div className="form-group"><label>Card Number *</label><input name="cardNumber" value={cardDetails.cardNumber} onChange={handleCardChange} placeholder="1234 5678 9012 3456" /></div>
                    <div className="form-row">
                      <div className="form-group"><label>Expiry Date *</label><input name="expiry" value={cardDetails.expiry} onChange={handleCardChange} placeholder="MM/YY" /></div>
                      <div className="form-group"><label>CVV *</label><input name="cvv" type="password" value={cardDetails.cvv} onChange={handleCardChange} placeholder="•••" /></div>
                    </div>
                  </div>
                )}
                {paymentMethod === 'cod' && (
                  <div className="cod-info"><span className="cod-info-icon">ℹ️</span><p>Please have the exact amount of <strong>${total.toFixed(2)}</strong> ready when the delivery arrives.</p></div>
                )}
                <div className="checkout-card-footer">
                  <button className="btn-outline" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn-primary" disabled={!isPaymentValid()} onClick={() => setStep(3)}>Review Order →</button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="checkout-card">
              <div className="checkout-card-header"><span className="checkout-card-icon">📋</span><h2>Review Your Order</h2></div>
              <div className="checkout-card-body">
                <div className="review-section">
                  <div className="review-section-header"><h3>📍 Delivery Address</h3><button className="link-btn" onClick={() => setStep(1)}>Edit</button></div>
                  <p className="review-text">{deliveryAddress.fullName}<br />{deliveryAddress.address}<br />{deliveryAddress.city}, {deliveryAddress.province} {deliveryAddress.postalCode}<br />{deliveryAddress.phone}</p>
                </div>
                <div className="review-section">
                  <div className="review-section-header"><h3>💳 Payment</h3><button className="link-btn" onClick={() => setStep(2)}>Edit</button></div>
                  <p className="review-text">{paymentMethod === 'card' ? `Card ending in ${cardDetails.cardNumber.replace(/\s/g, '').slice(-4)}` : 'Cash on Delivery'}</p>
                </div>
                <div className="review-section">
                  <h3>🛒 Items ({cart.length})</h3>
                  <div className="review-items">
                    {cart.map(item => (
                      <div key={item._id} className="review-item">
                        <div className="review-item-thumb">
                          {hasImage(item) ? <img src={item.image} alt={item.name} /> : <span>{getEmoji(item.category)}</span>}
                        </div>
                        <div className="review-item-info"><strong>{item.name}</strong><span className="review-item-qty">× {item.quantity}</span></div>
                        <span className="review-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="checkout-card-footer">
                  <button className="btn-outline" onClick={() => setStep(2)}>← Back</button>
                  <button className="btn-primary checkout-place-btn" onClick={handlePlaceOrder} disabled={loading}>
                    {loading ? 'Processing...' : `🔒 Place Order — $${total.toFixed(2)}`}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="checkout-sidebar">
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="checkout-items-list">
              {cart.map(item => (
                <div key={item._id} className="checkout-item">
                  <span className="checkout-item-name">{item.name} <small>×{item.quantity}</small></span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="summary-row"><span>Tax (13% HST)</span><span>${tax.toFixed(2)}</span></div>
            <div className="summary-row"><span>Shipping</span><span className={shipping === 0 ? 'free-shipping' : ''}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="summary-row total"><strong>Total</strong><strong>${total.toFixed(2)}</strong></div>
            <div className="checkout-secure"><span>🔒</span><small>Your payment information is secure and encrypted</small></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
