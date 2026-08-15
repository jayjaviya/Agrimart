import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Truck, Download, CreditCard } from 'lucide-react';
import '../../styles/shop/OrderSuccess.css';

import valveImg from '../../assets/images/pivot-irrigation.png';
import wheatImg from '../../assets/images/premium-seeds.png';

const OrderSuccess = () => {
  return (
    <main className="order-success-page">
      <div className="order-success-container">
        
        {/* Top Header Section */}
        <div className="success-header-section">
          <div className="success-icon-wrap">
            <CheckCircle size={32} strokeWidth={3} />
          </div>
          <h1 className="success-title">Order Placed Successfully!</h1>
          <p className="success-subtitle">
            Thank you for choosing AgriMart. Your professional-grade agricultural equipment is on its way.
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="success-layout">
          
          {/* Left Column */}
          <div className="success-left-col">
            
            {/* Order Meta Box */}
            <div className="order-meta-box">
              <div className="meta-item">
                <span className="meta-label">ORDER ID</span>
                <strong className="meta-value">#AM-82934-2024</strong>
              </div>
              <div className="meta-item">
                <span className="meta-label">ESTIMATED DELIVERY</span>
                <strong className="meta-value">Friday, Oct 25th, 2024</strong>
              </div>
              <div className="meta-item">
                <span className="meta-label">PAYMENT STATUS</span>
                <strong className="meta-value payment-status-paid">
                  <CreditCard size={14} /> Paid
                </strong>
              </div>
            </div>

            {/* Order Summary Box */}
            <div className="success-summary-box">
              <h2 className="summary-box-title">Order Summary</h2>
              
              <div className="success-items-list">
                
                <div className="success-item">
                  <div className="success-item-img">
                    <img src={valveImg} alt="Pro-Flow Irrigation Valve V2" />
                  </div>
                  <div className="success-item-details">
                    <h4>Pro-Flow Irrigation Valve V2</h4>
                    <span className="item-qty">Qty: 2</span>
                  </div>
                  <div className="success-item-price">
                    $245.00
                  </div>
                </div>

                <div className="success-item">
                  <div className="success-item-img">
                    <img src={wheatImg} alt="Drought-Resistant Wheat Seed" />
                  </div>
                  <div className="success-item-details">
                    <h4>Drought-Resistant Wheat Seed (50lb)</h4>
                    <span className="item-qty">Qty: 1</span>
                  </div>
                  <div className="success-item-price">
                    $335.50
                  </div>
                </div>

              </div>

              <div className="success-total-row">
                <span className="total-label">Total Amount</span>
                <span className="total-value">$825.50</span>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="success-right-col">
            
            {/* Delivery Address Box */}
            <div className="delivery-address-card">
              <div className="delivery-card-header">
                <Truck size={18} /> Delivery Address
              </div>
              <div className="delivery-card-body">
                <strong>John Doe Farms</strong>
                <p>
                  123 Agricultural Way<br />
                  Silo District<br />
                  Lincoln, NE 68502
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="success-actions">
              <Link to="/order-track" className="btn-track-order" style={{ textDecoration: 'none', textAlign: 'center', display: 'block' }}>Track Order</Link>
              <Link to="/products" className="btn-continue-shopping">Continue Shopping</Link>
              <button className="btn-download-invoice">
                <Download size={14} /> Download Invoice
              </button>
            </div>

            {/* Support Box */}
            <div className="support-box">
              <p>Need assistance with your order?</p>
              <Link to="/contact" className="link-support">Contact Support</Link>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
};

export default OrderSuccess;
