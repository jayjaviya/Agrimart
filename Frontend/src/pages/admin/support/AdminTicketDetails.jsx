import React from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import { 
  Search, 
  Clock, 
  Image as ImageIcon,
  Truck,
  ArrowRight,
  User,
  Mail,
  Phone,
  GitMerge,
  Trash2,
  Bold,
  Italic,
  List,
  Paperclip,
  Send
} from 'lucide-react';
import '../../../styles/admin/support/AdminTicketDetails.css';

const AdminTicketDetails = () => {
  const { id } = useParams();
  const ticketId = id ? `#${id}` : '#TKT-8842';

  return (
    <AdminLayout 
      headerTitle={<><span style={{color: '#64748b'}}>Support &gt; </span>Ticket {ticketId}</>}
      headerSubtitle={`Created: Oct 24, 2023 10:45 AM • ID: ${ticketId}`}
    >
      <div className="admin-ticket-details-page">
        
        {/* Established Format: Search Bar at the top of content */}
        <div className="page-search-header" style={{ marginBottom: '24px' }}>
          <div className="search-input-wrapper" style={{maxWidth: '400px', position: 'relative', display: 'flex', alignItems: 'center'}}>
            <Search size={16} className="search-icon" style={{position: 'absolute', left: '12px', color: '#94a3b8'}} />
            <input type="text" placeholder="Search orders, tickets, products..." style={{width: '100%', padding: '10px 12px 10px 36px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none'}} />
          </div>
          <div className="ticket-page-actions">
            <select className="action-select status-select">
              <option>Status: Open</option>
              <option>Status: In Progress</option>
              <option>Status: Resolved</option>
            </select>
            <select className="action-select priority-select">
              <option>Priority: High</option>
              <option>Priority: Medium</option>
              <option>Priority: Low</option>
            </select>
          </div>
        </div>

        <div className="ticket-details-grid">
          
          {/* Main Left Column */}
          <div className="ticket-main-col">
            
            {/* Issue Description */}
            <div className="ticket-panel">
              <div className="panel-header">
                <h3>Issue Description</h3>
              </div>
              <div className="panel-content">
                <p className="issue-text">
                  "We received the recent shipment of premium soil amendments (Order #AGM-9082), but three of the pallets were damaged during transit. The packaging is torn and the contents are spilling. We need an expedited replacement for the damaged units as this is holding up our planting schedule. Please advise on the return process and when we can expect the replacements."
                </p>
              </div>
            </div>

            {/* Related Order */}
            <div className="ticket-panel">
              <div className="panel-header">
                <h3>Related Order</h3>
                <Link to="/admin/orders/AGM-9082" className="panel-link">View Full Order <ArrowRight size={14} /></Link>
              </div>
              <div className="panel-content">
                <div className="related-order-card">
                  <div className="order-icon-box">
                    <Truck size={24} />
                  </div>
                  <div className="order-info">
                    <h4>#AGM-9082</h4>
                    <p>Premium Soil Amendments (x12 Pallets)</p>
                  </div>
                  <div className="order-meta">
                    <div className="order-price">$4,250.00</div>
                    <span className="status-badge status-delivered-issues">DELIVERED (WITH ISSUES)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversation History */}
            <div className="ticket-panel">
              <div className="panel-header">
                <h3>Conversation History</h3>
              </div>
              <div className="panel-content conversation-content">
                
                <div className="message-bubble customer-message">
                  <div className="message-avatar">V</div>
                  <div className="message-body">
                    <div className="message-header">
                      <span className="message-author">Valley Orchards</span>
                      <span className="message-time">Oct 24, 10:45 AM</span>
                    </div>
                    <p className="message-text">
                      Initial complaint submitted via portal regarding Order #AGM-9082. Photos of damaged pallets attached.
                    </p>
                    <div className="message-attachments">
                      <div className="attachment-pill">
                        <ImageIcon size={14} /> damaged_pallet_1.jpg
                      </div>
                      <div className="attachment-pill">
                        <ImageIcon size={14} /> damaged_pallet_2.jpg
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Reply Editor */}
            <div className="ticket-panel reply-panel">
              <div className="reply-tabs">
                <button className="reply-tab active">Reply to Customer</button>
                <button className="reply-tab">Internal Note</button>
              </div>
              <div className="reply-editor">
                <div className="editor-toolbar">
                  <button><Bold size={16} /></button>
                  <button><Italic size={16} /></button>
                  <button><List size={16} /></button>
                  <div className="toolbar-divider"></div>
                  <button><Paperclip size={16} /></button>
                </div>
                <textarea 
                  className="editor-textarea" 
                  placeholder="Type your response here..."
                  rows={6}
                ></textarea>
                <div className="editor-footer">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Mark as Resolved on send</span>
                  </label>
                  <button className="btn-send-reply">
                    Send Response <Send size={14} />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Right Column */}
          <div className="ticket-side-col">
            
            {/* Customer Profile */}
            <div className="ticket-side-panel">
              <div className="side-panel-header">
                <h3>CUSTOMER PROFILE</h3>
              </div>
              <div className="panel-content profile-content">
                <div className="mini-profile">
                  <div className="mini-avatar">VO</div>
                  <div className="mini-info">
                    <h4>Valley Orchards</h4>
                    <Link to="/admin/customers/CUS-8104" className="profile-link">View CRM Profile</Link>
                  </div>
                </div>
                <div className="profile-contact">
                  <h5>Contact</h5>
                  <div className="contact-item">
                    <Mail size={14} />
                    <span>j.smith@valleyorchards.co</span>
                  </div>
                  <div className="contact-item">
                    <Phone size={14} />
                    <span>+1 (555) 019-2834</span>
                  </div>
                </div>
                <div className="profile-stats">
                  <div className="stat-box">
                    <span className="stat-label">Lifetime Value</span>
                    <span className="stat-value">$142,500</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-label">Joined</span>
                    <span className="stat-value text-normal">Mar 2021</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="ticket-side-panel">
              <div className="side-panel-header">
                <h3>TICKET DETAILS</h3>
              </div>
              <div className="panel-content details-content">
                <div className="detail-group">
                  <h5>Assigned Agent</h5>
                  <div className="agent-box">
                    <div className="agent-avatar">
                      <User size={16} />
                    </div>
                    <span>Sarah Jenkins (Tier 2)</span>
                  </div>
                </div>
                <div className="detail-group">
                  <h5>Category</h5>
                  <span className="category-pill">Order Issue - Damage</span>
                </div>
                <div className="detail-group">
                  <h5>Resolution SLA</h5>
                  <div className="sla-alert">
                    <Clock size={16} />
                    <span>04h 15m remaining</span>
                  </div>
                  <div className="sla-progress-bar">
                    <div className="sla-progress-fill" style={{width: '85%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="ticket-actions-panel">
              <button className="btn-action btn-outline">
                <GitMerge size={16} /> Merge Ticket
              </button>
              <button className="btn-action btn-danger-outline">
                <Trash2 size={16} /> Delete Ticket
              </button>
            </div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminTicketDetails;
