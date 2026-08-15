import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import { 
  ArrowLeft, 
  Printer, 
  User, 
  Mail, 
  Phone, 
  ArrowRight, 
  Info, 
  CreditCard, 
  Package, 
  Clock, 
  Truck,
  Search
} from 'lucide-react';
import '../../../styles/admin/orders/AdminOrderDetails.css';

// Placeholder images for line items and map
import seedsImg from '../../../assets/images/premium-seeds.png';
import toolsImg from '../../../assets/images/tools-equipment.png';
import mapPlaceholder from '../../../assets/images/hero-farm.png'; // Using hero-farm as a placeholder for map

const AdminOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <AdminLayout 
      headerTitle={<><span style={{color: '#64748b'}}>Orders &gt; </span>Order {id}</>}
      headerSubtitle="August 12, 2026 at 10:45 AM"
    >
      <div className="admin-order-details-page">
        <div className="page-search-header" style={{ marginBottom: '20px' }}>
          <div className="search-input-wrapper" style={{maxWidth: '400px', position: 'relative', display: 'flex', alignItems: 'center'}}>
            <Search size={16} className="search-icon" style={{position: 'absolute', left: '12px', color: '#94a3b8'}} />
            <input type="text" placeholder="Search orders, products, customers..." style={{width: '100%', padding: '10px 12px 10px 36px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none'}} />
          </div>
        </div>

        {/* Header Section */}
        <div className="order-details-header">
          <div className="order-actions">
            <select className="status-select">
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
            <button className="btn-print">
              <Printer size={18} />
              Print Invoice
            </button>
          </div>
        </div>

        {/* 3-Column Layout */}
        <div className="order-grid">
          
          {/* Left Column */}
          <div className="grid-col left-col">
            <div className="detail-card">
              <div className="card-header">
                <User size={20} className="card-icon" />
                <h2>Customer Information</h2>
              </div>
              <div className="customer-profile">
                <div className="customer-avatar-large">JD</div>
                <div className="customer-names">
                  <h3>John Doe Farms</h3>
                  <p>Customer since 2021</p>
                </div>
              </div>
              <div className="contact-info">
                <div className="contact-row">
                  <Mail size={16} className="contact-icon" />
                  <div>
                    <span className="contact-label">EMAIL</span>
                    <span className="contact-value">johndoe@example.com</span>
                  </div>
                </div>
                <div className="contact-row">
                  <Phone size={16} className="contact-icon" />
                  <div>
                    <span className="contact-label">PHONE</span>
                    <span className="contact-value">+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
              <a href="#history" className="view-history-link">
                View Order History <ArrowRight size={16} />
              </a>
            </div>

            <div className="detail-card">
              <div className="card-header">
                <Info size={20} className="card-icon" />
                <h2>Order Details</h2>
              </div>
              <div className="info-block">
                <span className="info-label">PAYMENT METHOD</span>
                <div className="payment-method">
                  <CreditCard size={18} />
                  <span>Visa ending in 4242</span>
                </div>
              </div>
              <div className="info-block">
                <span className="info-label">TRANSACTION ID</span>
                <span className="info-value">TXN-847291048</span>
              </div>
              <div className="info-block">
                <span className="info-label">SHIPPING METHOD</span>
                <span className="info-value">Standard Freight (3-5 days)</span>
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="grid-col mid-col">
            <div className="detail-card line-items-card">
              <div className="card-header">
                <Package size={20} className="card-icon" />
                <h2>Line Items</h2>
              </div>
              <div className="items-table-wrapper">
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>PRODUCT</th>
                      <th className="qty-col">QTY</th>
                      <th className="total-col">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="item-details">
                          <img src={seedsImg} alt="Fertilizer" className="item-img" />
                          <div>
                            <h4>Premium Organic Fertilizer</h4>
                            <p>SKU: FRT-ORG-50</p>
                            <p>$45.00 / bag</p>
                          </div>
                        </div>
                      </td>
                      <td className="qty-val">10</td>
                      <td className="total-val">$450.00</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="item-details">
                          <img src={toolsImg} alt="Valve" className="item-img" />
                          <div>
                            <h4>Heavy-Duty Irrigation Valve</h4>
                            <p>SKU: IRR-VLV-HD</p>
                            <p>$120.00 / unit</p>
                          </div>
                        </div>
                      </td>
                      <td className="qty-val">2</td>
                      <td className="total-val">$240.00</td>
                    </tr>
                    <tr>
                      <td>
                        <div className="item-details">
                          <img src={seedsImg} alt="Seeds" className="item-img" />
                          <div>
                            <h4>Hybrid Corn Seed - Grade A</h4>
                            <p>SKU: SD-CRN-HA</p>
                            <p>$85.00 / sack</p>
                          </div>
                        </div>
                      </td>
                      <td className="qty-val">5</td>
                      <td className="total-val">$425.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal (17 items)</span>
                  <span>$1,115.00</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>$150.00</span>
                </div>
                <div className="summary-row">
                  <span>Tax (8.25%)</span>
                  <span>$91.99</span>
                </div>
                <div className="summary-row grand-total">
                  <span>Total</span>
                  <span className="total-amount">$1,356.99</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="grid-col right-col">
            <div className="detail-card">
              <div className="card-header">
                <Clock size={20} className="card-icon" />
                <h2>Timeline</h2>
              </div>
              <div className="timeline-container">
                
                <div className="timeline-step completed">
                  <div className="step-indicator"></div>
                  <div className="step-content">
                    <h4>Order Placed</h4>
                    <p>Oct 24, 10:42 AM</p>
                  </div>
                </div>
                
                <div className="timeline-step completed">
                  <div className="step-indicator"></div>
                  <div className="step-content">
                    <h4>Payment Confirmed</h4>
                    <p>Oct 24, 10:45 AM</p>
                  </div>
                </div>
                
                <div className="timeline-step active">
                  <div className="step-indicator">
                    <div className="inner-dot"></div>
                  </div>
                  <div className="step-content">
                    <h4>Processing</h4>
                    <p>In warehouse</p>
                  </div>
                </div>
                
                <div className="timeline-step pending">
                  <div className="step-indicator"></div>
                  <div className="step-content">
                    <h4>Shipped</h4>
                    <p></p>
                  </div>
                </div>
                
                <div className="timeline-step pending">
                  <div className="step-indicator"></div>
                  <div className="step-content">
                    <h4>Delivered</h4>
                    <p></p>
                  </div>
                </div>

              </div>
            </div>

            <div className="detail-card address-card">
              <div className="map-placeholder" style={{ backgroundImage: `url(${mapPlaceholder})` }}>
                {/* Map image or iframe goes here */}
              </div>
              <div className="address-content">
                <div className="card-header">
                  <Truck size={20} className="card-icon" />
                  <h2>Delivery Address</h2>
                </div>
                <div className="address-details">
                  <h4>John Doe Farms</h4>
                  <p>1244 Agricultural Way<br/>Fresno, CA 93706<br/>United States</p>
                </div>
                <button className="btn-edit-address">Edit Address</button>
              </div>
            </div>
          </div>

        </div>
        
        <div className="admin-footer-text">
          <span>&copy; 2026 AgriMart v2.4.0. All rights reserved. Technical Support: ext 404.</span>
          <div className="admin-footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms</a>
            <a href="#api">API Documentation</a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrderDetails;
