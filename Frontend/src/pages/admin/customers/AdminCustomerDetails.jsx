import React from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import { 
  Search, 
  Store, 
  Mail, 
  Phone, 
  Calendar, 
  CreditCard,
  ShoppingBag,
  DollarSign,
  ReceiptText,
  Edit2,
  Users,
  Ban,
  Plus,
  ArrowRight,
  Clock
} from 'lucide-react';
import '../../../styles/admin/customers/AdminCustomerDetails.css';

const AdminCustomerDetails = () => {
  const { id } = useParams();

  const recentOrders = [
    { id: '#ORD-8892', date: 'Nov 12, 2023', amount: '$4,250.00', status: 'DELIVERED' },
    { id: '#ORD-8841', date: 'Oct 28, 2023', amount: '$1,120.50', status: 'DELIVERED' },
    { id: '#ORD-8710', date: 'Sep 15, 2023', amount: '$8,900.00', status: 'PROCESSING' }
  ];

  const recentActivity = [
    { text: 'Placed Order #ORD-8892', date: 'Today, 10:42 AM' },
    { text: 'Updated Shipping Address', date: 'Yesterday, 3:15 PM' },
    { text: 'Opened Support Ticket #TKT-992', date: 'Nov 10, 2023' },
    { text: 'Logged in from new device (iOS)', date: 'Nov 01, 2023' }
  ];

  return (
    <AdminLayout 
      headerTitle={<><span style={{color: '#64748b'}}>Customers &gt; </span>John Doe Farms</>}
      headerSubtitle="Detailed customer profile, history, and account settings."
    >
      <div className="admin-customer-details-page">
        
        {/* Established Format: Search Bar at the top of content */}
        <div className="page-search-header" style={{ marginBottom: '24px' }}>
          <div className="search-input-wrapper" style={{maxWidth: '400px', position: 'relative', display: 'flex', alignItems: 'center'}}>
            <Search size={16} className="search-icon" style={{position: 'absolute', left: '12px', color: '#94a3b8'}} />
            <input type="text" placeholder="Search orders, products, customers..." style={{width: '100%', padding: '10px 12px 10px 36px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none'}} />
          </div>
        </div>

        <div className="customer-details-grid">
          
          {/* Main Left Column */}
          <div className="customer-main-col">
            
            {/* Header Profile Card */}
            <div className="customer-profile-card">
              <div className="profile-top-row">
                <div className="profile-icon-large">
                  <Store size={32} color="#0f201d" />
                </div>
                <div className="profile-title-block">
                  <div className="profile-name-row">
                    <h2>John Doe Farms</h2>
                    <span className="status-badge status-active">ACTIVE</span>
                  </div>
                  <div className="profile-meta-grid">
                    <div className="meta-item">
                      <Mail size={16} />
                      <span>j.doe@johndoefarms.ag</span>
                    </div>
                    <div className="meta-item">
                      <Phone size={16} />
                      <span>+1 (555) 019-8472</span>
                    </div>
                    <div className="meta-item">
                      <Calendar size={16} />
                      <span>Joined: Oct 12, 2021</span>
                    </div>
                    <div className="meta-item">
                      <CreditCard size={16} />
                      <span>Net 30 Terms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* KPI Row */}
            <div className="customer-kpi-row">
              <div className="kpi-card border-black">
                <div className="kpi-header">
                  <span>Total Orders</span>
                  <ShoppingBag size={18} className="kpi-icon" />
                </div>
                <div className="kpi-value">142</div>
                <div className="kpi-trend trend-up">
                  <ArrowRight size={14} style={{transform: 'rotate(-45deg)'}} />
                  +12% YoY
                </div>
              </div>
              <div className="kpi-card border-black">
                <div className="kpi-header">
                  <span>Lifetime Value</span>
                  <DollarSign size={18} className="kpi-icon" />
                </div>
                <div className="kpi-value">$284,500</div>
                <div className="kpi-trend trend-neutral">
                  <ArrowRight size={14} style={{transform: 'rotate(-45deg)'}} />
                  Top 5% Tier
                </div>
              </div>
              <div className="kpi-card border-gray">
                <div className="kpi-header">
                  <span>Open Balance</span>
                  <ReceiptText size={18} className="kpi-icon" />
                </div>
                <div className="kpi-value">$12,450</div>
                <div className="kpi-trend trend-neutral">
                  Due in 14 days
                </div>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="customer-panel">
              <div className="panel-header">
                <h3>Recent Orders</h3>
                <Link to="/admin/orders" className="panel-link">View All</Link>
              </div>
              <div className="panel-table-wrapper">
                <table className="customer-orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, idx) => (
                      <tr key={idx}>
                        <td className="order-id-cell">{order.id}</td>
                        <td className="order-date-cell">{order.date}</td>
                        <td className="order-amount-cell">{order.amount}</td>
                        <td>
                          <span className={`status-badge status-${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Sidebar Right Column */}
          <div className="customer-side-col">
            
            {/* Admin Actions */}
            <div className="customer-side-panel">
              <div className="side-panel-header">
                <h3>Admin Actions</h3>
              </div>
              <div className="side-panel-actions">
                <button className="btn-action btn-dark">
                  <Edit2 size={16} /> Edit Profile
                </button>
                <button className="btn-action btn-outline">
                  <Users size={16} /> Manage Roles
                </button>
                <button className="btn-action btn-danger">
                  <Ban size={16} /> Suspend Account
                </button>
              </div>
            </div>

            {/* Saved Addresses */}
            <div className="customer-side-panel">
              <div className="side-panel-header">
                <h3>Saved Addresses</h3>
                <button className="btn-icon">
                  <Plus size={18} />
                </button>
              </div>
              <div className="address-list">
                <div className="address-card">
                  <div className="address-card-header">
                    <h4>Main Facility (Shipping)</h4>
                    <span className="badge-primary">PRIMARY</span>
                  </div>
                  <p>1234 Harvest Lane<br/>Building B, Loading Dock 2<br/>Springfield, IL 62701</p>
                </div>
                <div className="address-card">
                  <div className="address-card-header">
                    <h4>Corporate Office (Billing)</h4>
                  </div>
                  <p>400 Financial Plaza<br/>Suite 1200<br/>Chicago, IL 60601</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="customer-side-panel">
              <div className="side-panel-header">
                <h3>Recent Activity</h3>
              </div>
              <div className="activity-timeline">
                {recentActivity.map((act, idx) => (
                  <div className="timeline-item" key={idx}>
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <span className="timeline-date">{act.date}</span>
                      <p className="timeline-text">{act.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="panel-footer">
                <Link to="#" className="panel-link">View Full Log</Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomerDetails;
