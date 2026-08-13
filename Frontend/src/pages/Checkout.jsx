import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, Truck, ChevronDown, Edit2, ArrowRight, Check, CreditCard, QrCode, Building, Banknote } from 'lucide-react';
import '../styles/Checkout.css';

import valveImg from '../assets/images/pivot-irrigation.png';
import wheatImg from '../assets/images/premium-seeds.png';

const orderItems = [
  {
    id: 1,
    name: "Pro-Grade Submersible Pump 2HP",
    meta: "Industrial Grade Steel",
    sku: "SP-200X-IND",
    qty: 1,
    price: 845.00,
    image: valveImg,
    inStock: true
  },
  {
    id: 2,
    name: "Premium Hybrid Corn Seed",
    meta: "50 lb Bag / Treated",
    sku: "HC-500Y-TR",
    qty: 2,
    price: 120.00,
    image: wheatImg,
    inStock: true
  }
];

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const stepParam = searchParams.get('step');
  const activeStep = stepParam ? parseInt(stepParam) : 1;

  const setActiveStep = (step) => {
    navigate(`/checkout?step=${step}`);
  };

  const [selectedPayment, setSelectedPayment] = useState('card');

  // Hardcoded totals to match the different mockups
  const totalStep1 = 525.00; 
  const totalStep2 = 1327.63; 
  const totalStep3 = 4752.00;

  return (
    <div className="checkout-page">
      {/* We removed the custom minimalist header because the global Navbar is now active */}
      
      <main className="checkout-main">
        {/* Step 3 has a large title outside the layout */}
        {activeStep === 3 && (
          <div className="checkout-page-title-container">
            <h1 className="checkout-page-title">Secure Checkout</h1>
          </div>
        )}

        {/* Dynamic Stepper Bar (Horizontal with line) */}
        <div className={`checkout-stepper-container ${activeStep === 3 ? 'stepper-step3' : ''}`}>
          <div className="stepper-line"></div>
          <div className="checkout-stepper">
            <div className={`step ${activeStep > 1 ? 'completed' : ''} ${activeStep === 1 ? 'active' : ''}`}>
              <div className="step-circle">
                {activeStep > 1 ? <Check size={16} strokeWidth={3} /> : '1'}
              </div>
              <div className="step-label">ADDRESS</div>
            </div>
            <div className={`step ${activeStep > 2 ? 'completed' : ''} ${activeStep === 2 ? 'active' : ''}`}>
              <div className="step-circle">
                {activeStep > 2 ? <Check size={16} strokeWidth={3} /> : '2'}
              </div>
              <div className="step-label">REVIEW</div>
            </div>
            <div className={`step ${activeStep === 3 ? 'active' : ''}`}>
              <div className="step-circle">3</div>
              <div className="step-label">PAYMENT</div>
            </div>
          </div>
        </div>

        <div className="checkout-layout">
          
          {/* Left Column - Steps */}
          <div className="checkout-steps-column">

            {/* STEP 1 */}
            {activeStep === 1 ? (
              <div className="checkout-step-container expanded">
                <h2 className="step-title">Delivery Address</h2>
                
                <form className="address-form" onSubmit={e => { e.preventDefault(); setActiveStep(2); }}>
                  <div className="form-row form-row-2">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                      <label>Mobile Number</label>
                      <input type="tel" placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>House / Street Address</label>
                    <input type="text" placeholder="123 Farm Lane, Barn A" />
                  </div>

                  <div className="form-row form-row-3">
                    <div className="form-group">
                      <label>City / Region</label>
                      <input type="text" placeholder="Springfield" />
                    </div>
                    <div className="form-group">
                      <label>State / Province</label>
                      <select>
                        <option>Select State</option>
                        <option>CA</option>
                        <option>TX</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Pincode / ZIP</label>
                      <input type="text" placeholder="12345" />
                    </div>
                  </div>

                  <label className="checkbox-label save-address">
                    <input type="checkbox" defaultChecked />
                    <span className="checkmark"></span>
                    <span className="terms-text">Save this address for future professional orders</span>
                  </label>

                  <div className="step-actions">
                    <button type="submit" className="btn-deliver">
                      DELIVER TO THIS ADDRESS
                    </button>
                  </div>
                </form>
              </div>
            ) : null}

            {/* STEP 2 */}
            {activeStep === 2 ? (
              <>
                <div className="checkout-step-container expanded">
                  <div className="delivery-summary-header">
                    <h2 className="step-title" style={{marginBottom: 0}}>Delivery Summary</h2>
                    <button className="btn-edit" onClick={() => setActiveStep(1)}>
                      <Edit2 size={14} /> Edit
                    </button>
                  </div>
                  
                  <div className="delivery-address-details">
                    <strong>John Doe Farms</strong>
                    <p>1244 Agricultural Way<br/>Fresno, CA 93706<br/>United States</p>
                  </div>

                  <hr className="summary-divider" />

                  <div className="delivery-method-summary">
                    <Truck size={18} />
                    <span>Shipping Method: Heavy Freight Delivery (3-5 Business Days)</span>
                  </div>
                </div>

                <div className="checkout-step-container expanded mt-4">
                  <div className="order-items-header">
                    <h2 className="step-title" style={{marginBottom: 0}}>Order Items</h2>
                    <span className="items-count-badge">2 Items</span>
                  </div>

                  <div className="order-items-list">
                    {orderItems.map((item, idx) => (
                      <div className="order-item-detailed" key={idx}>
                        <div className="item-img-large">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="item-details-large">
                          <h4>{item.name}</h4>
                          <span className="item-sku">SKU: {item.sku}</span>
                          {item.inStock && <span className="badge-in-stock">In Stock</span>}
                        </div>
                        <div className="item-price-large">
                          <span className="price-bold">${item.price.toFixed(2)}</span>
                          <span className="qty-text">Qty: {item.qty}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : null}

            {/* STEP 3 - Payment */}
            {activeStep === 3 ? (
              <div className="payment-methods-container">
                <h2 className="payment-title">Select Payment Method</h2>
                
                <div className="payment-methods-list">
                  
                  {/* Credit Card Option */}
                  <div className={`payment-method-box ${selectedPayment === 'card' ? 'active' : ''}`} onClick={() => setSelectedPayment('card')}>
                    <div className="payment-method-header">
                      <div className="payment-radio-wrap">
                        <div className={`custom-radio ${selectedPayment === 'card' ? 'selected' : ''}`}></div>
                        <span className="payment-method-name">Credit or Debit Card</span>
                      </div>
                      <CreditCard size={20} className="payment-icon" />
                    </div>
                    
                    {selectedPayment === 'card' && (
                      <div className="payment-method-body">
                        <div className="form-group mb-3">
                          <label>CARD NUMBER</label>
                          <input type="text" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="form-row form-row-2 mb-3">
                          <div className="form-group">
                            <label>EXPIRY DATE</label>
                            <input type="text" placeholder="MM/YY" />
                          </div>
                          <div className="form-group">
                            <label>CVV</label>
                            <input type="text" placeholder="•••" />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>CARDHOLDER NAME</label>
                          <input type="text" placeholder="Name as it appears on card" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* UPI Option */}
                  <div className={`payment-method-box ${selectedPayment === 'upi' ? 'active' : ''}`} onClick={() => setSelectedPayment('upi')}>
                    <div className="payment-method-header">
                      <div className="payment-radio-wrap">
                        <div className={`custom-radio ${selectedPayment === 'upi' ? 'selected' : ''}`}></div>
                        <span className="payment-method-name">UPI (Unified Payments Interface)</span>
                      </div>
                      <QrCode size={20} className="payment-icon" />
                    </div>
                  </div>

                  {/* Net Banking Option */}
                  <div className={`payment-method-box ${selectedPayment === 'netbanking' ? 'active' : ''}`} onClick={() => setSelectedPayment('netbanking')}>
                    <div className="payment-method-header">
                      <div className="payment-radio-wrap">
                        <div className={`custom-radio ${selectedPayment === 'netbanking' ? 'selected' : ''}`}></div>
                        <span className="payment-method-name">Net Banking</span>
                      </div>
                      <Building size={20} className="payment-icon" />
                    </div>
                  </div>

                  {/* Cash on Delivery Option */}
                  <div className={`payment-method-box ${selectedPayment === 'cod' ? 'active' : ''}`} onClick={() => setSelectedPayment('cod')}>
                    <div className="payment-method-header">
                      <div className="payment-radio-wrap">
                        <div className={`custom-radio ${selectedPayment === 'cod' ? 'selected' : ''}`}></div>
                        <span className="payment-method-name">Cash on Delivery</span>
                      </div>
                      <Banknote size={20} className="payment-icon" />
                    </div>
                  </div>

                </div>
              </div>
            ) : null}

            {/* Collapsed Headers for Accordion Steps 2 & 3 (Only when activeStep < 3) */}
            {activeStep < 2 && (
              <div className="checkout-step-container collapsed">
                <div className="step-header-compact">
                  <h2 className="step-title-compact">2. Order Review</h2>
                  <ChevronDown size={20} className="step-icon" />
                </div>
              </div>
            )}

            {activeStep < 3 && activeStep !== 3 && (
              <div className="checkout-step-container collapsed">
                <div className="step-header-compact">
                  <h2 className="step-title-compact">3. Secure Payment</h2>
                  <Lock size={20} className="step-icon" />
                </div>
              </div>
            )}

          </div>

          {/* Right Column - Order Summary */}
          <div className="checkout-summary-column">
            <div className={`checkout-summary-box ${activeStep === 3 ? 'summary-box-step3' : ''}`}>
              <h2>Order Summary</h2>
              
              {/* Step 1 Items Summary */}
              {activeStep === 1 && (
                <div className="summary-items">
                  <div className="summary-item">
                    <div className="summary-item-img">
                      <img src={valveImg} alt="Pro-Flow Irrigation Valve V2" />
                    </div>
                    <div className="summary-item-details">
                      <h4>Pro-Flow Irrigation Valve V2</h4>
                      <span className="item-meta">Industrial Grade Steel</span>
                      <div className="item-price-row">
                        <span className="item-qty">Qty: 4</span>
                        <span className="item-price">$320.00</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="summary-item">
                    <div className="summary-item-img">
                      <img src={wheatImg} alt="Drought-Resistant Wheat Seed" />
                    </div>
                    <div className="summary-item-details">
                      <h4>Drought-Resistant Wheat Seed</h4>
                      <span className="item-meta">50 lb Bulk Sack</span>
                      <div className="item-price-row">
                        <span className="item-qty">Qty: 2</span>
                        <span className="item-price">$180.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1 Totals */}
              {activeStep === 1 && (
                <>
                  <div className="summary-totals">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>$500.00</span>
                    </div>
                    <div className="summary-row">
                      <span>Professional Discount (10%)</span>
                      <span className="text-success">-$50.00</span>
                    </div>
                    <div className="summary-row">
                      <span>Heavy-Duty Delivery</span>
                      <span>$75.00</span>
                    </div>
                  </div>

                  <div className="summary-total-final">
                    <span>Total</span>
                    <span className="total-price">${totalStep1.toFixed(2)}</span>
                  </div>

                  <div className="checkout-trust-badges">
                    <div className="trust-badge">
                      <ShieldCheck size={16} />
                      <span>256-bit SSL Secure Checkout</span>
                    </div>
                    <div className="trust-badge">
                      <Truck size={16} />
                      <span>Insured Heavy Logistics Delivery</span>
                    </div>
                  </div>
                </>
              )}

              {/* Step 2 Totals */}
              {activeStep === 2 && (
                <>
                  <div className="summary-totals-step2">
                    <div className="summary-row">
                      <span>Subtotal (3 items)</span>
                      <span>$1,085.00</span>
                    </div>
                    <div className="summary-row">
                      <span>Shipping (Heavy Freight)</span>
                      <span>$150.00</span>
                    </div>
                    <div className="summary-row">
                      <span>Estimated Tax</span>
                      <span>$92.63</span>
                    </div>
                  </div>

                  <div className="summary-total-final">
                    <span>Total</span>
                    <span className="total-price">${totalStep2.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                  </div>

                  <div className="step2-actions">
                    <button className="btn-proceed-payment" onClick={() => setActiveStep(3)}>
                      PROCEED TO PAYMENT <ArrowRight size={18} />
                    </button>
                    <button className="btn-back-shipping" onClick={() => setActiveStep(1)}>
                      Back to Shipping Address
                    </button>
                  </div>

                  <div className="checkout-trust-badges-center">
                    <div className="trust-badge-center">
                      <Lock size={14} />
                      <span>Secure SSL Checkout</span>
                    </div>
                  </div>
                </>
              )}

              {/* Step 3 Totals */}
              {activeStep === 3 && (
                <>
                  <div className="summary-totals-step3">
                    <div className="summary-row">
                      <span>Items (3)</span>
                      <span>$4,250.00</span>
                    </div>
                    <div className="summary-row">
                      <span>Heavy Freight Shipping</span>
                      <span>$150.00</span>
                    </div>
                    <div className="summary-row">
                      <span>Taxes</span>
                      <span>$352.00</span>
                    </div>
                  </div>

                  <div className="summary-total-final mb-4">
                    <span>Total</span>
                    <span className="total-price">${totalStep3.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                  </div>

                  <div className="delivery-address-summary-box">
                    <div className="delivery-address-header">
                      <Truck size={14} /> DELIVERY ADDRESS
                    </div>
                    <div className="delivery-address-content">
                      John Doe Farms<br />
                      1244 Agricultural Way, Silo District<br />
                      Lincoln, NE 68502
                    </div>
                  </div>

                  <div className="step3-actions">
                    <button className="btn-pay-securely" onClick={() => navigate('/order-success')}>
                      <Lock size={16} /> PAY ${totalStep3.toLocaleString(undefined, {minimumFractionDigits: 2})} SECURELY
                    </button>
                  </div>

                  <div className="checkout-trust-badges-center mt-3">
                    <div className="trust-badge-center">
                      <ShieldCheck size={14} />
                      <span>256-bit Secure & Encrypted Transaction</span>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Checkout;
