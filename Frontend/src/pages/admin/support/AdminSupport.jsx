import React, { useState, useEffect } from 'react';
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
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const userObj = JSON.parse(localStorage.getItem('agrimart_user') || '{}');
      const token = userObj.token;
      const res = await fetch(`${API_URL}/api/tickets`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setTickets(data);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const openTickets = tickets.filter(t => t.status === 'Open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'In Progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'Resolved').length;
  // We don't have a priority field yet, so setting high priority to 0 for now
  const highPriorityTickets = 0;

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

        <div className="support-kpi-row">
          <div className="kpi-card border-green">
            <div className="kpi-header">
              <span>OPEN REQUESTS</span>
              <Inbox size={18} className="kpi-icon" />
            </div>
            <div className="kpi-value-row">
              <span className="kpi-value">{openTickets}</span>
              <span className="kpi-trend trend-neutral">Total</span>
            </div>
          </div>
          
          <div className="kpi-card border-darkgreen">
            <div className="kpi-header">
              <span>IN PROGRESS</span>
              <RefreshCw size={18} className="kpi-icon" />
            </div>
            <div className="kpi-value-row">
              <span className="kpi-value">{inProgressTickets}</span>
              <span className="kpi-trend trend-neutral">Active</span>
            </div>
          </div>

          <div className="kpi-card border-gray">
            <div className="kpi-header">
              <span>RESOLVED</span>
              <CheckCircle size={18} className="kpi-icon" />
            </div>
            <div className="kpi-value-row">
              <span className="kpi-value">{resolvedTickets}</span>
              <span className="kpi-trend trend-neutral">Total</span>
            </div>
          </div>

          <div className="kpi-card border-red">
            <div className="kpi-header">
              <span>HIGH PRIORITY</span>
              <AlertTriangle size={18} className="kpi-icon-danger" />
            </div>
            <div className="kpi-value-row">
              <span className="kpi-value value-danger">{highPriorityTickets}</span>
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
                {loading ? (
                  <tr>
                    <td colSpan="8" style={{textAlign: 'center', padding: '2rem'}}>Loading tickets...</td>
                  </tr>
                ) : tickets.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{textAlign: 'center', padding: '2rem'}}>No support tickets found.</td>
                  </tr>
                ) : tickets.map((ticket, idx) => (
                  <tr key={idx}>
                    <td className="ticket-id-cell">
                      <Link to={`/admin/support/${ticket._id}`} style={{color: 'inherit', textDecoration: 'none'}}>
                        #{ticket.ticketId}
                      </Link>
                    </td>
                    <td>
                      <div className="customer-info-cell">
                        <div className="customer-avatar-box">
                          {getInitials(ticket.name)}
                        </div>
                        <div className="customer-details">
                          <span className="customer-name">{ticket.name}</span>
                        </div>
                      </div>
                    </td>
                    <td className="issue-type-cell" style={{textTransform: 'capitalize'}}>{ticket.issueType}</td>
                    <td>
                      {ticket.orderId ? (
                        <Link to={`/admin/orders/${ticket.orderId}`} className="order-id-link">
                          {ticket.orderId}
                        </Link>
                      ) : (
                        <span style={{color: '#94a3b8'}}>N/A</span>
                      )}
                    </td>
                    <td className="date-cell">{formatDate(ticket.createdAt)}</td>
                    <td>
                      <span className={`priority-badge priority-medium`}>
                        <span className="priority-dot"></span>
                        Medium
                      </span>
                    </td>
                    <td>
                      <span className={`status-pill status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <Link to={`/admin/support/${ticket._id}`} className="btn-icon-action">
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
