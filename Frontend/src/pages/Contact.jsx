import React from 'react';
import { Package, HelpCircle, Truck, ArrowLeftRight, Phone, MessageCircle, Mail } from 'lucide-react';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <main className="contact-page">
      <div className="contact-container">
        
        {/* Header Section */}
        <header className="contact-header">
          <h1>How Can We Help?</h1>
          <p>Whether you need assistance with an existing order or expert guidance choosing the right agricultural products for your needs, our dedicated professional support team is ready to assist.</p>
        </header>

        {/* Support Cards Grid */}
        <div className="support-cards-grid">
          <div className="support-card">
            <Package className="support-icon" size={28} />
            <h3>Order Support</h3>
            <p>Track shipments, modify existing orders, or resolve delivery issues.</p>
          </div>
          <div className="support-card">
            <HelpCircle className="support-icon" size={28} />
            <h3>Product Help</h3>
            <p>Get expert advice on choosing seeds, tools, and heavy equipment.</p>
          </div>
          <div className="support-card">
            <Truck className="support-icon" size={28} />
            <h3>Delivery Support</h3>
            <p>Questions about shipping methods, times, and specialized freight.</p>
          </div>
          <div className="support-card">
            <ArrowLeftRight className="support-icon" size={28} />
            <h3>Returns & Replacements</h3>
            <p>Report damaged goods or request returns for incorrect items.</p>
          </div>
        </div>

        {/* Bottom Layout */}
        <div className="contact-layout">
          
          {/* Direct Contact Sidebar */}
          <aside className="contact-sidebar">
            <h2>Direct Contact</h2>
            
            <div className="direct-contact-block">
              <Phone className="contact-block-icon" size={20} />
              <div className="contact-block-info">
                <span className="contact-label">CALL SUPPORT</span>
                <span className="contact-value">1-800-AGRI-PRO</span>
              </div>
            </div>

            <div className="direct-contact-block">
              <MessageCircle className="contact-block-icon" size={20} />
              <div className="contact-block-info">
                <span className="contact-label">WHATSAPP</span>
                <span className="contact-value">Chat with an Expert</span>
              </div>
            </div>

            <div className="direct-contact-block">
              <Mail className="contact-block-icon" size={20} />
              <div className="contact-block-info">
                <span className="contact-label">EMAIL SUPPORT</span>
                <span className="contact-value">support@agrimart.pro</span>
              </div>
            </div>
          </aside>

          {/* Support Form */}
          <section className="contact-form-section">
            <div className="form-container">
              <h2>Submit a Support Request</h2>
              
              <form className="support-form" onSubmit={e => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label>FULL NAME</label>
                    <input type="text" placeholder="e.g. John Deere" />
                  </div>
                  <div className="form-group">
                    <label>CONTACT NUMBER</label>
                    <input type="text" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>ISSUE TYPE</label>
                    <div className="select-wrapper">
                      <select defaultValue="">
                        <option value="" disabled>Select an issue...</option>
                        <option value="order">Order Inquiry</option>
                        <option value="product">Product Question</option>
                        <option value="delivery">Delivery Issue</option>
                        <option value="return">Return Request</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>ORDER ID (OPTIONAL)</label>
                    <input type="text" placeholder="e.g. AG-12345" />
                  </div>
                </div>

                <div className="form-group">
                  <label>DESCRIPTION</label>
                  <textarea rows={5} placeholder="Please describe your issue in detail..."></textarea>
                </div>

                <div className="form-submit-wrap">
                  <button type="submit" className="btn-submit-request">
                    Submit Request &rarr;
                  </button>
                </div>
              </form>
            </div>
          </section>

        </div>

      </div>
    </main>
  );
};

export default Contact;
