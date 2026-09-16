import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import AdminLayout from '../../../components/admin/AdminLayout';
import '../../../styles/admin/orders/AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/orders');
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.error('Failed to fetch orders', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getProductsSummary = (items) => {
    if (!items || items.length === 0) return 'No items';
    if (items.length === 1) return items[0].name;
    return `${items[0].name} +${items.length - 1} more`;
  };

  return (
    <AdminLayout 
      headerTitle="Orders" 
      headerSubtitle="Manage and track all customer orders."
    >
      <div className="admin-orders-page">
        <div className="page-search-header" style={{ marginBottom: '20px' }}>
          <div className="search-input-wrapper" style={{maxWidth: '400px', position: 'relative', display: 'flex', alignItems: 'center'}}>
            <Search size={16} className="search-icon" style={{position: 'absolute', left: '12px', color: '#94a3b8'}} />
            <input type="text" placeholder="Search orders, products, customers..." style={{width: '100%', padding: '10px 12px 10px 36px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none'}} />
          </div>
        </div>

        <div className="orders-header">
          <div className="orders-filters">
            <select className="filter-select">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>This Year</option>
            </select>
            <select className="filter-select">
              <option>All Statuses</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
            <select className="filter-select">
              <option>All Payments</option>
              <option>Paid</option>
              <option>Failed</option>
            </select>
          </div>
        </div>

        <div className="orders-table-panel">
          <div className="orders-table-wrapper">
            <table className="full-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Products</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>Loading orders...</td></tr>
                ) : orders.length === 0 ? (
                  <tr><td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>No orders found.</td></tr>
                ) : (
                  orders.map((order) => (
                  <tr key={order._id}>
                    <td className="order-id">
                      <Link to={`/admin/orders/${order.orderId.replace('#', '')}`} style={{ color: '#0f172a', textDecoration: 'none' }}>
                        {order.orderId}
                      </Link>
                    </td>
                    <td>
                      <div className="customer-cell">
                        <div className="customer-avatar">{getInitials(order.customerName)}</div>
                        <div className="customer-name">{order.customerName}</div>
                      </div>
                    </td>
                    <td className="products-cell" title={getProductsSummary(order.items)}>{getProductsSummary(order.items)}</td>
                    <td className="total-cell">₹{order.totalAmount?.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                    <td>
                      <span className="payment-badge payment-paid">
                        Paid
                      </span>
                    </td>
                    <td>
                      <span className={`status-label status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ color: '#475569', fontSize: '0.85rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="pagination-footer">
            <div className="pagination-info">Showing {orders.length} orders</div>
            <div className="pagination-controls">
              <button className="page-btn">&lt;</button>
              <button className="page-btn active">1</button>
              <button className="page-btn">&gt;</button>
            </div>
          </div>
        </div>

        <div className="admin-footer-text">
          <span>&copy; 2026 AgriMart v2.4.0. All rights reserved. Technical Support: ext 404.</span>
          <div className="admin-footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms</a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
