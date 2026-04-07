import React, { useState, useEffect } from 'react';
import { getRevenueStats } from '../api';

function AdminDashboard({ setCurrentPage }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getRevenueStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load stats:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="container"><div className="loading-spinner"><div className="spinner"></div><p>Loading dashboard...</p></div></div>;
  }

  const maxRevenue = stats ? Math.max(...stats.monthlyRevenue.map(m => m.revenue), 1) : 1;

  return (
    <div className="container">
      <div className="admin-header">
        <h1 className="page-title">⚙ Admin Dashboard</h1>
        <div className="admin-nav-links">
          <button className="btn-primary" onClick={() => setCurrentPage('admin-products')}>📦 Manage Products</button>
          <button className="btn-primary" onClick={() => setCurrentPage('admin-orders')}>📋 Manage Orders</button>
        </div>
      </div>

      {stats && (
        <>
          {/* KPI Cards */}
          <div className="stats-grid">
            <div className="stat-card stat-revenue">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <span className="stat-label">Total Revenue</span>
                <span className="stat-value">${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div className="stat-card stat-orders">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <span className="stat-label">Total Orders</span>
                <span className="stat-value">{stats.totalOrders}</span>
              </div>
            </div>
            <div className="stat-card stat-avg">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <span className="stat-label">Avg Order Value</span>
                <span className="stat-value">${stats.avgOrderValue.toFixed(2)}</span>
              </div>
            </div>
            <div className="stat-card stat-pending">
              <div className="stat-icon">⏳</div>
              <div className="stat-content">
                <span className="stat-label">Pending Orders</span>
                <span className="stat-value">{stats.statusCounts['Pending'] || 0}</span>
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="dashboard-row">
            <div className="chart-card">
              <h3>Monthly Revenue</h3>
              <div className="bar-chart">
                {stats.monthlyRevenue.map((m, i) => (
                  <div key={i} className="bar-column">
                    <div className="bar-value">${m.revenue > 0 ? m.revenue.toFixed(0) : ''}</div>
                    <div
                      className="bar"
                      style={{ height: `${Math.max((m.revenue / maxRevenue) * 100, 2)}%` }}
                    ></div>
                    <div className="bar-label">{m.month.split(' ')[0]}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-card">
              <h3>Order Status</h3>
              <div className="status-list">
                {Object.entries(stats.statusCounts).map(([status, count]) => (
                  <div key={status} className="status-row">
                    <span className="status-dot" style={{ background: statusColor(status) }}></span>
                    <span className="status-name">{status}</span>
                    <span className="status-count">{count}</span>
                    <div className="status-bar-bg">
                      <div className="status-bar-fill" style={{
                        width: `${(count / stats.totalOrders) * 100}%`,
                        background: statusColor(status)
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 style={{ marginTop: '30px' }}>Top Products</h3>
              <div className="top-products-list">
                {stats.topProducts.map((p, i) => (
                  <div key={i} className="top-product-row">
                    <span className="top-rank">#{i + 1}</span>
                    <span className="top-name">{p.name}</span>
                    <span className="top-qty">{p.quantity} sold</span>
                    <span className="top-rev">${p.revenue.toFixed(2)}</span>
                  </div>
                ))}
                {stats.topProducts.length === 0 && <p className="text-muted">No sales data yet</p>}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function statusColor(status) {
  const colors = {
    'Pending': '#f59e0b',
    'Processing': '#3b82f6',
    'Shipped': '#8b5cf6',
    'Delivered': '#22c55e',
    'Cancelled': '#ef4444',
  };
  return colors[status] || '#999';
}

export default AdminDashboard;
