import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../api';

const statusColors = {
  'Pending': '#f59e0b',
  'Processing': '#3b82f6',
  'Shipped': '#8b5cf6',
  'Delivered': '#22c55e',
  'Cancelled': '#ef4444',
};

const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

function AdminOrders({ showToast }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      showToast(`Order status updated to ${newStatus}`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const filtered = orders.filter(o => {
    const matchStatus = filterStatus === 'All' || o.status === filterStatus;
    const matchSearch = o.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o._id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  if (loading) {
    return <div className="container"><div className="loading-spinner"><div className="spinner"></div><p>Loading orders...</p></div></div>;
  }

  return (
    <div className="container">
      <h1 className="page-title">📋 Manage Orders</h1>

      {/* Filters */}
      <div className="orders-toolbar">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name, email, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="status-filter">
          {['All', ...statusOptions].map(s => (
            <button
              key={s}
              className={`filter-btn ${filterStatus === s ? 'active' : ''}`}
              onClick={() => setFilterStatus(s)}
              style={filterStatus === s && s !== 'All' ? { background: statusColors[s], borderColor: statusColors[s], color: '#fff' } : {}}
            >
              {s} {s !== 'All' && `(${orders.filter(o => o.status === s).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="orders-list">
        {filtered.length === 0 ? (
          <div className="no-results" style={{ padding: '40px' }}>
            <h3>No orders found</h3>
          </div>
        ) : (
          filtered.map(order => (
            <div key={order._id} className="order-card admin-order-card">
              <div className="order-card-header" onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}>
                <div className="order-meta">
                  <span className="order-id">#{order._id.slice(-8).toUpperCase()}</span>
                  <div className="order-customer">
                    <strong>{order.userName}</strong>
                    <small>{order.userEmail}</small>
                  </div>
                  <span className="order-date">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="order-status-total">
                  <select
                    className="status-select"
                    value={order.status}
                    onChange={(e) => { e.stopPropagation(); handleStatusChange(order._id, e.target.value); }}
                    onClick={(e) => e.stopPropagation()}
                    style={{ borderColor: statusColors[order.status], color: statusColors[order.status] }}
                  >
                    {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <span className="order-total">${order.total.toFixed(2)}</span>
                  <span className="expand-icon">{expandedOrder === order._id ? '▲' : '▼'}</span>
                </div>
              </div>

              {expandedOrder === order._id && (
                <div className="order-details">
                  <div className="order-items-list">
                    <div className="order-items-header">
                      <span>Product</span>
                      <span>Qty</span>
                      <span>Price</span>
                      <span>Total</span>
                    </div>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item-row">
                        <span>{item.name}</span>
                        <span>{item.quantity}</span>
                        <span>${item.price.toFixed(2)}</span>
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
          ))
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
