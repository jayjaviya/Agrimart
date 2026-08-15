import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import AdminLayout from '../../../components/admin/AdminLayout';
import '../../../styles/admin/orders/AdminOrders.css';

const AdminOrders = () => {
  const orders = [
    {
      id: '#AGM-9082',
      customerInitials: 'MA',
      customerName: 'Midwest Agritech Co.',
      products: 'Irrigation Kit Pro, 50lb Hybrid Corn Seed, +2...',
      total: '$4,250.00',
      payment: 'Paid',
      status: 'Processing',
      date: 'Aug 14, 2026'
    },
    {
      id: '#AGM-9081',
      customerInitials: 'DF',
      customerName: 'Dakota Farms Ltd.',
      products: 'Industrial Tractor Tires (Set of 4)',
      total: '$2,800.00',
      payment: 'Paid',
      status: 'Shipped',
      date: 'Aug 13, 2026'
    },
    {
      id: '#AGM-9080',
      customerInitials: 'GV',
      customerName: 'Green Valley Orchards',
      products: 'Organic Fertilizer Bulk Pallet (100 bags)',
      total: '$1,450.00',
      payment: 'Failed',
      status: 'Pending',
      date: 'Aug 12, 2026'
    },
    {
      id: '#AGM-9079',
      customerInitials: 'TS',
      customerName: 'Tri-State Supply',
      products: 'Automated Feeder System v2',
      total: '$5,600.00',
      payment: 'Paid',
      status: 'Delivered',
      date: 'Aug 10, 2026'
    }
  ];

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
                {orders.map((order, idx) => (
                  <tr key={idx}>
                    <td className="order-id">
                      <Link to={`/admin/orders/${order.id.replace('#', '')}`} style={{ color: '#0f172a', textDecoration: 'none' }}>
                        {order.id}
                      </Link>
                    </td>
                    <td>
                      <div className="customer-cell">
                        <div className="customer-avatar">{order.customerInitials}</div>
                        <div className="customer-name">{order.customerName}</div>
                      </div>
                    </td>
                    <td className="products-cell" title={order.products}>{order.products}</td>
                    <td className="total-cell">{order.total}</td>
                    <td>
                      <span className={`payment-badge payment-${order.payment.toLowerCase()}`}>
                        {order.payment}
                      </span>
                    </td>
                    <td>
                      <span className={`status-label status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ color: '#475569', fontSize: '0.85rem' }}>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="pagination-footer">
            <div className="pagination-info">Showing 1 to 4 of 128 orders</div>
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
