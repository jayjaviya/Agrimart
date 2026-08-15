import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import { 
  Search, 
  Download, 
  Plus, 
  Inbox, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle,
  FilterX,
  Eye
} from 'lucide-react';
import '../../../styles/admin/support/AdminSupport.css';

const AdminSupport = () => {
  const tickets = [
    {
      id: '#TKT-8842',
      customerInitials: 'VO',
      customerName: 'Valley Orchards',
      issueType: 'Order Issue',
      orderId: '#AGM-9082',
      date: 'Oct 12, 2023',
      priority: 'High',
      status: 'Open'
    },
    {
      id: '#TKT-8841',
      customerInitials: 'SF',
      customerName: 'Skyline Farms LLC',
      issueType: 'Delivery Issue',
      orderId: '#AGM-8912',
      date: 'Oct 11, 2023',
      priority: 'Medium',
      status: 'In Progress'
    },
    {
      id: '#TKT-8840',
      customerInitials: 'GG',
      customerName: 'Golden Grain Mills',
      issueType: 'Product Question',
      orderId: '#AGM-8850',
      date: 'Oct 10, 2023',
      priority: 'Low',
      status: 'Resolved'
    }
  ];

  return (
    <AdminLayout 
      headerTitle="Support Tickets"
      headerSubtitle="Manage and track customer support requests across the agricultural network."
    >
      <div className="admin-support-page">
        {/* Established Format: Search Bar at the top of content */}
        <div className="page-search-header" style={{ marginBottom: '24px' }}>
          <div className="search-input-wrapper" style={{maxWidth: '400px', position: 'relative', display: 'flex', alignItems: 'center'}}>
            <Search size={16} className="search-icon" style={{position: 'absolute', left: '12px', color: '#94a3b8'}} />
            <input type="text" placeholder="Search orders, products, customers..." style={{width: '100%', padding: '10px 12px 10px 36px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none'}} />
          </div>
        </div>

        {/* Page Actions - Top Right equivalent */}
        <div className="support-page-actions">
          <button className="btn-export">
            <Download size={16} /> Export
          </button>
          <button className="btn-new-ticket">
            <Plus size={16} /> New Ticket
          </button>
        </div>

        {/* KPI Cards */}
        <div className="support-kpi-row">
          <div className="kpi-card border-green">
            <div className="kpi-header">
              <span>OPEN REQUESTS</span>
              <Inbox size={18} className="kpi-icon" />
            </div>
            <div className="kpi-value-row">
              <span className="kpi-value">24</span>
              <span className="kpi-trend trend-up">↑ 12%</span>
            </div>
          </div>
          
          <div className="kpi-card border-darkgreen">
            <div className="kpi-header">
              <span>IN PROGRESS</span>
              <RefreshCw size={18} className="kpi-icon" />
            </div>
            <div className="kpi-value-row">
              <span className="kpi-value">12</span>
              <span className="kpi-trend trend-neutral">Active</span>
            </div>
          </div>

          <div className="kpi-card border-gray">
            <div className="kpi-header">
              <span>RESOLVED</span>
              <CheckCircle size={18} className="kpi-icon" />
            </div>
            <div className="kpi-value-row">
              <span className="kpi-value">156</span>
              <span className="kpi-trend trend-neutral">↑ 4%</span>
            </div>
          </div>

          <div className="kpi-card border-red">
            <div className="kpi-header">
              <span>HIGH PRIORITY</span>
              <AlertTriangle size={18} className="kpi-icon-danger" />
            </div>
            <div className="kpi-value-row">
              <span className="kpi-value value-danger">5</span>
              <span className="kpi-trend trend-danger">Requires Attention</span>
            </div>
          </div>
        </div>

        {/* Tickets Table Panel */}
        <div className="support-table-panel">
          
          {/* Table Filters Header */}
          <div className="support-table-header">
            <div className="search-input-wrapper" style={{width: '320px'}}>
              <Search size={16} className="search-icon" />
              <input type="text" placeholder="Search ticket ID, customer, or order..." />
            </div>
            
            <div className="table-filters-right">
              <select className="filter-select">
                <option>Issue Type: All</option>
                <option>Order Issue</option>
                <option>Delivery Issue</option>
                <option>Product Question</option>
              </select>
              <select className="filter-select">
                <option>Status: All</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
              <select className="filter-select">
                <option>Priority: All</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <button className="btn-clear-filters">
                <FilterX size={16} /> Clear
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="support-table-wrapper">
            <table className="support-table">
              <thead>
                <tr>
                  <th>TICKET ID</th>
                  <th>CUSTOMER</th>
                  <th>ISSUE TYPE</th>
                  <th>ORDER ID</th>
                  <th>CREATED DATE</th>
                  <th>PRIORITY</th>
                  <th>STATUS</th>
                  <th style={{textAlign: 'center'}}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, idx) => (
                  <tr key={idx}>
                    <td className="ticket-id-cell">
                      <Link to={`/admin/support/${ticket.id.replace('#', '')}`} style={{color: 'inherit', textDecoration: 'none'}}>
                        {ticket.id}
                      </Link>
                    </td>
                    <td>
                      <div className="customer-info-cell">
                        <div className="customer-avatar-box">
                          {ticket.customerInitials}
                        </div>
                        <div className="customer-details">
                          <span className="customer-name">{ticket.customerName}</span>
                        </div>
                      </div>
                    </td>
                    <td className="issue-type-cell">{ticket.issueType}</td>
                    <td>
                      <Link to={`/admin/orders/${ticket.orderId.replace('#', '')}`} className="order-id-link">
                        {ticket.orderId}
                      </Link>
                    </td>
                    <td className="date-cell">{ticket.date}</td>
                    <td>
                      <span className={`priority-badge priority-${ticket.priority.toLowerCase()}`}>
                        <span className="priority-dot"></span>
                        {ticket.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`status-pill status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <Link to={`/admin/support/${ticket.id.replace('#', '')}`} className="btn-icon-action">
                        <Eye size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="support-pagination">
            <div className="pagination-text">
              Showing 1 to 3 of 192 entries
            </div>
            <div className="pagination-controls">
              <button className="btn-page" disabled>Prev</button>
              <button className="btn-page active">1</button>
              <button className="btn-page">2</button>
              <button className="btn-page">3</button>
              <span className="page-dots">...</span>
              <button className="btn-page">Next</button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="admin-footer-text">
          <span>&copy; 2024 AgriMart Executive Portal. All rights reserved.</span>
          <div className="admin-footer-links">
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#support">Technical Support</a>
            <a href="#status">System Status</a>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminSupport;
