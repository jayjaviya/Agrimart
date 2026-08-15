import React from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Download, 
  UserPlus, 
  MoreHorizontal
} from 'lucide-react';
import '../../../styles/admin/customers/AdminCustomers.css';

const AdminCustomers = () => {
  const customers = [
    {
      id: 'CUS-8892',
      name: 'Skyline Farms LLC',
      email: 'procurement@skylinefarms.com',
      phone: '+1 (555) 019-8372',
      orders: 142,
      spend: '$48,290.00',
      joined: 'Oct 12, 2022',
      status: 'Active',
      initials: 'SF'
    },
    {
      id: 'CUS-8104',
      name: 'Valley Orchards',
      email: 'j.smith@valleyorchards.co',
      phone: '+1 (555) 837-1120',
      orders: 87,
      spend: '$21,450.50',
      joined: 'Jan 05, 2023',
      status: 'Active',
      initials: 'VO'
    },
    {
      id: 'CUS-7742',
      name: 'Harvest Moon Co-op',
      email: 'supply@harvestmoon.org',
      phone: '+1 (555) 443-9001',
      orders: 12,
      spend: '$3,100.00',
      joined: 'Nov 28, 2023',
      status: 'Disabled',
      initials: 'HM'
    },
    {
      id: 'CUS-9011',
      name: 'Golden Grain Mills',
      email: 'purchasing@goldengrain.com',
      phone: '+1 (555) 221-5544',
      orders: 315,
      spend: '$112,840.00',
      joined: 'Mar 14, 2021',
      status: 'Active',
      initials: 'GG'
    }
  ];

  return (
    <AdminLayout 
      headerTitle={<><span style={{color: '#64748b'}}>Admin &gt; </span>Customers</>}
      headerSubtitle="Manage agricultural client accounts and history."
    >
      <div className="admin-customers-page">
        {/* Page Actions - Top Right equivalent */}
        <div className="customers-page-actions">
          <button className="btn-export">
            <Download size={16} /> Export CSV
          </button>
          <button className="btn-add-customer">
            <UserPlus size={16} /> Add Customer
          </button>
        </div>

        {/* Table Panel */}
        <div className="customers-table-panel">
          
          {/* Table Filters Header */}
          <div className="customers-table-header">
            <div className="search-input-wrapper" style={{maxWidth: '400px', flex: 1}}>
              <Search size={16} className="search-icon" />
              <input type="text" placeholder="Search by name, email, or farm..." />
            </div>
            
            <div className="table-filters-right">
              <div className="filter-group">
                <span className="filter-label">STATUS:</span>
                <select className="filter-select">
                  <option>All Accounts</option>
                  <option>Active</option>
                  <option>Disabled</option>
                </select>
              </div>
              <div className="filter-group">
                <span className="filter-label">SORT BY:</span>
                <select className="filter-select">
                  <option>Registration Date (Newest)</option>
                  <option>Lifetime Spend (Highest)</option>
                  <option>Orders (Highest)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="customers-table-wrapper">
            <table className="customers-table">
              <thead>
                <tr>
                  <th>CUSTOMER DETAILS</th>
                  <th>CONTACT</th>
                  <th style={{textAlign: 'center'}}>ORDERS</th>
                  <th style={{textAlign: 'right'}}>LIFETIME SPEND</th>
                  <th>JOINED</th>
                  <th>STATUS</th>
                  <th style={{textAlign: 'center'}}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>
                      <div className="customer-info-cell">
                        <div className="customer-avatar-box">
                          {customer.initials}
                        </div>
                        <div className="customer-details">
                          <Link to={`/admin/customers/${customer.id}`} style={{textDecoration: 'none'}}>
                            <span className="customer-name" style={{cursor: 'pointer'}}>{customer.name}</span>
                          </Link>
                          <span className="customer-id">ID: {customer.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-cell">
                        <span className="contact-email">{customer.email}</span>
                        <span className="contact-phone">{customer.phone}</span>
                      </div>
                    </td>
                    <td style={{textAlign: 'center', fontWeight: '500', color: '#1e293b'}}>
                      {customer.orders}
                    </td>
                    <td style={{textAlign: 'right', fontWeight: '700', color: '#0f172a'}}>
                      {customer.spend}
                    </td>
                    <td style={{color: '#475569', fontSize: '0.85rem'}}>
                      {customer.joined}
                    </td>
                    <td>
                      <span className={`status-badge status-${customer.status.toLowerCase()}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td style={{textAlign: 'center'}}>
                      <button className="btn-icon-action">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="customers-pagination">
            <div className="pagination-text">
              Showing <strong>1</strong> to <strong>4</strong> of <strong>248</strong> customers
            </div>
            <div className="pagination-controls">
              <button className="btn-page" disabled>Previous</button>
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
          <span>&copy; 2026 AgriMart Executive v2.4.0</span>
          <div className="admin-footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#api">API Documentation</a>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminCustomers;
