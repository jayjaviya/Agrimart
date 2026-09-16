import React, { useState, useContext } from 'react';
import { Package, HelpCircle, Truck, ArrowLeftRight, Phone, MessageCircle, Mail } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/shop/Contact.css';

const Contact = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    contactNumber: '',
    issueType: '',
    orderId: '',
    description: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const userObj = JSON.parse(localStorage.getItem('agrimart_user') || '{}');
      const token = userObj.token;
      
      const res = await fetch(`${API_URL}/api/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ ...formData, userId: user?._id })
      });

      if (!res.ok) {
        throw new Error('Failed to submit request');
      }

      setStatus({ type: 'success', message: 'Your support request has been submitted successfully. We will get back to you soon.' });
      setFormData({
        name: user?.name || '',
        contactNumber: '',
        issueType: '',
        orderId: '',
        description: ''
      });
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

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
              
              {status.message && (
                <div className={`form-status ${status.type}`}>
                  {status.message}
                </div>
              )}
              <form className="support-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>FULL NAME</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. John Deere" required />
                  </div>
                  <div className="form-group">
                    <label>CONTACT NUMBER</label>
                    <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="+1 (555) 000-0000" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>ISSUE TYPE</label>
                    <div className="select-wrapper">
                      <select name="issueType" value={formData.issueType} onChange={handleChange} required>
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
                    <input type="text" name="orderId" value={formData.orderId} onChange={handleChange} placeholder="e.g. AG-12345" />
                  </div>
                </div>

                <div className="form-group">
                  <label>DESCRIPTION</label>
                  <textarea rows={5} name="description" value={formData.description} onChange={handleChange} placeholder="Please describe your issue in detail..." required></textarea>
                </div>

                <div className="form-submit-wrap">
                  <button type="submit" className="btn-submit-request" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Request \u2192'}
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
