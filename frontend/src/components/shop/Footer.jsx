import { Link } from 'react-router-dom';
import '../../styles/shop/Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M16 8c0 0-6 4-6 10s6 6 6 6 6 0 6-6-6-10-6-10z" fill="currentColor" opacity="0.3"/>
                <path d="M16 6c-2 4-2 8 0 12M12 12c2-1 6-1 8 0M11 18c2 1 7 1 10 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              AgriMart
            </Link>
            <p className="footer-tagline">
              © 2024 AgriMart Professional Agriculture. All rights reserved.
            </p>
          </div>

          {/* Column 1 */}
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="footer-column">
            <h4>Shipping</h4>
            <ul>
              <li><Link to="/shipping">Shipping Info</Link></li>
              <li><Link to="/bulk-orders">Bulk Orders</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><Link to="/sustainability">Sustainability</Link></li>
              <li><Link to="/support">Technical Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>AgriMart — Growing smarter, together.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
