import React, { useState, useEffect } from 'react';
import { getUserOrders } from '../api';

const statusColors = {
  'Pending': '#f59e0b',
  'Processing': '#3b82f6',
  'Shipped': '#8b5cf6',
  'Delivered': '#22c55e',
  'Cancelled': '#ef4444',
};

function MyOrders({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders(user.email);
        setOrders(data);
      } catch (error) {
        console.error('Failed to load orders:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user.email]);

  if (loading) {
    return <div className="container"><div className="loading-spinner"><div className="spinner"></div><p>Loading orders...</p></div></div>;
  }

  return (
    <div className="container">
      <h1 className="page-title">My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">📦</div>
          <h2>No orders yet</h2>
          <p>Your order history will appear here.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-card-header" onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}>
                <div className="order-meta">
                  <span className="order-id">#{order._id.slice(-8).toUpperCase()}</span>
                  <span className="order-date">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="order-status-total">
                  <span className="status-badge" style={{ background: statusColors[order.status] || '#666' }}>
                    {order.status}
                  </span>
                  <span className="order-total">${order.total.toFixed(2)}</span>
                  <span className="expand-icon">{expandedOrder === order._id ? '▲' : '▼'}</span>
                </div>
              </div>
              {expandedOrder === order._id && (
                <div className="order-details">
                  <div className="order-items-list">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item-row">
                        <span>{item.name} × {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-breakdown">
                    <div className="summary-row"><span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
                    <div className="summary-row"><span>Tax</span><span>${order.tax.toFixed(2)}</span></div>
                    <div className="summary-row"><span>Shipping</span><span>{order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}</span></div>
                    <div className="summary-row total"><strong>Total</strong><strong>${order.total.toFixed(2)}</strong></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
