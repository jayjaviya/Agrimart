import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Truck, ExternalLink, CreditCard, Headset } from 'lucide-react';
import '../../styles/shop/OrderTrack.css';

import pumpImg from '../../assets/images/tools-equipment.png'; 
import hoseImg from '../../assets/images/pivot-irrigation.png'; 

const OrderTrack = () => {
  return (
    <main className="order-track-page">
      <div className="order-track-container">
        
        {/* Breadcrumb & Header Area */}
        <div className="track-header-area">
          <div className="track-header-left">
            <div className="track-breadcrumb">
              Account / Orders / <span>Order #AM-82934-2024</span>
            </div>
            <h1 className="track-title">Order #AM-82934-2024</h1>
            <p className="track-date">Placed on October 12, 2024 at 10:45 AM PST</p>
          </div>
          
          <div className="track-header-right">
            <div className="status-badge-transit">
              <span className="dot-green"></span> In Transit
            </div>
            <button className="btn-outline">Download Invoice</button>
            <button className="btn-reorder">Reorder All</button>
          </div>
        </div>

        {/* Delivery Status Timeline Box */}
        <div className="track-status-box">
          <h2 className="box-title">Delivery Status</h2>
          
          <div className="timeline-container">
            <div className="timeline-line"></div>
            <div className="timeline-progress" style={{ width: '60%' }}></div>

            <div className="timeline-steps">
              
              {/* Step 1: Placed */}
              <div className="t-step completed">
                <div className="t-icon-wrap"><Check size={16} strokeWidth={3} /></div>
                <div className="t-label">Order Placed</div>
                <div className="t-date">Oct 12, 10:45 AM</div>
              </div>

              {/* Step 2: Confirmed */}
              <div className="t-step completed">
                <div className="t-icon-wrap"><Check size={16} strokeWidth={3} /></div>
                <div className="t-label">Confirmed</div>
                <div className="t-date">Oct 12, 1:20 PM</div>
              </div>

              {/* Step 3: Packed */}
              <div className="t-step completed">
                <div className="t-icon-wrap"><Check size={16} strokeWidth={3} /></div>
                <div className="t-label">Packed</div>
                <div className="t-date">Oct 13, 9:00 AM</div>
              </div>

              {/* Step 4: Shipped (Active) */}
              <div className="t-step active">
                <div className="t-icon-wrap active-icon"><Truck size={16} /></div>
                <div className="t-label">Shipped</div>
                <div className="t-date">Oct 13, 2:30 PM</div>
              </div>

              {/* Step 5: Out for Delivery */}
              <div className="t-step pending">
                <div className="t-icon-wrap empty"></div>
                <div className="t-label">Out for Delivery</div>
              </div>

              {/* Step 6: Delivered */}
              <div className="t-step pending">
                <div className="t-icon-wrap empty"></div>
                <div className="t-label">Delivered</div>
              </div>

            </div>
          </div>

          <div className="timeline-footer">
            <p><strong>Latest Update:</strong> Your package has left the regional facility and is en route to the destination sorting center.</p>
            <a href="#" className="link-carrier">Track via Carrier <ExternalLink size={14} /></a>
          </div>
        </div>

        {/* Split Column Layout */}
        <div className="track-split-layout">
          
          {/* Left Column */}
          <div className="track-left-col">
            
            {/* Items Box */}
            <div className="track-box">
              <h2 className="box-title border-bottom pb">Items in Order (2)</h2>
              
              <div className="track-items-list">
                
                <div className="track-item">
                  <div className="track-item-img">
                    <img src={pumpImg} alt="Pro-Grade Submersible Pump X-500" />
                  </div>
                  <div className="track-item-info">
                    <h4>Pro-Grade Submersible Pump X-500</h4>
                    <span className="item-sku">SKU: IR-PMP-500-X</span>
                    <div className="item-qty-price">
                      <span className="qty">Qty: 1</span>
                      <span className="price">$1,250.00</span>
                    </div>
                  </div>
                </div>

                <div className="track-item">
                  <div className="track-item-img">
                    <img src={hoseImg} alt="Reinforced Polyethylene Piping" />
                  </div>
                  <div className="track-item-info">
                    <h4>Reinforced Polyethylene Piping (100m)</h4>
                    <span className="item-sku">SKU: IR-PIP-100-RP</span>
                    <div className="item-qty-price">
                      <span className="qty">Qty: 2</span>
                      <span className="price">$480.00</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="track-right-col">
            
            {/* Order Summary */}
            <div className="track-box">
              <h2 className="box-title border-bottom pb">Order Summary</h2>
              
              <div className="track-summary-rows">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>$1,730.00</span>
                </div>
                <div className="summary-row">
                  <span>Shipping (Freight)</span>
                  <span>$125.00</span>
                </div>
                <div className="summary-row">
                  <span>Tax (Calculated)</span>
                  <span>$148.40</span>
                </div>
              </div>
              
              <div className="summary-total-row">
                <span>Total</span>
                <span>$2,003.40</span>
              </div>
            </div>

            {/* Delivery Details Box */}
            <div className="track-box">
              <h2 className="box-title border-bottom pb">Delivery Details</h2>
              
              <div className="details-section">
                <span className="details-label">SHIPPING ADDRESS</span>
                <div className="details-content">
                  <strong>Valley View Farms (Attn: Receiving)</strong>
                  <p>8472 County Road 14<br/>Bakersfield, CA 93307<br/>United States</p>
                </div>
              </div>

              <div className="details-section mt">
                <span className="details-label">PAYMENT METHOD</span>
                <div className="details-content payment-method">
                  <CreditCard size={16} /> Visa ending in <strong>4242</strong>
                </div>
              </div>
            </div>

            {/* Need Assistance Box */}
            <div className="track-support-box">
              <div className="support-icon-wrap">
                <Headset size={24} />
              </div>
              <h3>Need Assistance?</h3>
              <p>Our technical support team is available to help with installation or shipping queries.</p>
              <Link to="/contact" className="btn-contact-support">Contact Support</Link>
              <button className="btn-cancel-order">Cancel Order</button>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
};

export default OrderTrack;
