import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const userObj = JSON.parse(localStorage.getItem('agrimart_user') || '{}');
      const token = userObj.token;
      const res = await fetch(`${API_URL}/api/tickets/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setTicket(data);
      } else {
        navigate('/admin/support');
      }
    } catch (error) {
      console.error('Error fetching ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const userObj = JSON.parse(localStorage.getItem('agrimart_user') || '{}');
      const token = userObj.token;
      const res = await fetch(`${API_URL}/api/tickets/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const updatedTicket = await res.json();
        setTicket(updatedTicket);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) return <AdminLayout><div style={{padding: '2rem'}}>Loading...</div></AdminLayout>;
  if (!ticket) return <AdminLayout><div style={{padding: '2rem'}}>Ticket not found.</div></AdminLayout>;

  return (
    <AdminLayout 
      headerTitle={<><span style={{color: '#64748b'}}>Support &gt; </span>Ticket #{ticket.ticketId}</>}
      headerSubtitle={`Created: ${formatDate(ticket.createdAt)} • ID: #${ticket.ticketId}`}
    >
      <div className="admin-ticket-details-page">
        
        {/* Established Format: Search Bar at the top of content */}
        <div className="page-search-header" style={{ marginBottom: '24px' }}>
          <div className="search-input-wrapper" style={{maxWidth: '400px', position: 'relative', display: 'flex', alignItems: 'center'}}>
            <Search size={16} className="search-icon" style={{position: 'absolute', left: '12px', color: '#94a3b8'}} />
            <input type="text" placeholder="Search orders, tickets, products..." style={{width: '100%', padding: '10px 12px 10px 36px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none'}} />
          </div>
          <div className="ticket-page-actions">
            <select className="action-select status-select" value={ticket.status} onChange={handleStatusChange}>
              <option value="Open">Status: Open</option>
              <option value="In Progress">Status: In Progress</option>
              <option value="Resolved">Status: Resolved</option>
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
                  {ticket.description}
                </p>
              </div>
            </div>

            {/* Related Order */}
            {ticket.orderId && (
              <div className="ticket-panel">
                <div className="panel-header">
                  <h3>Related Order</h3>
                  <Link to={`/admin/orders/${ticket.orderId}`} className="panel-link">View Order <ArrowRight size={14} /></Link>
                </div>
                <div className="panel-content">
                  <div className="related-order-card">
                    <div className="order-icon-box">
                      <Truck size={24} />
                    </div>
                    <div className="order-info">
                      <h4>#{ticket.orderId}</h4>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                  <div className="mini-avatar">{getInitials(ticket.name)}</div>
                  <div className="mini-info">
                    <h4>{ticket.name}</h4>
                  </div>
                </div>
                <div className="profile-contact">
                  <h5>Contact</h5>
                  <div className="contact-item">
                    <Phone size={14} />
                    <span>{ticket.contactNumber}</span>
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
                  <span className="category-pill" style={{textTransform: 'capitalize'}}>{ticket.issueType}</span>
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
