import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import { ShoppingCart, User } from 'lucide-react';
import whiteLogo from '../../assets/images/logo/whiteThemeLogo.png';
import blackLogo from '../../assets/images/logo/blackThemeLogo.png';
import '../../styles/shop/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const { cartCount, cartTotal } = useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !scrolled;

  return (
    <nav className={`navbar ${isTransparent ? 'navbar--transparent' : 'navbar--scrolled'}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img 
            src={isTransparent ? blackLogo : whiteLogo} 
            alt="AgriMart Logo" 
            className="navbar-brand-logo"
            style={{ height: '55px', width: 'auto', display: 'block' }}
          />
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'nav-link--active' : ''}`}>Home</Link>
          <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'nav-link--active' : ''}`}>Products</Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'nav-link--active' : ''}`}>Contact</Link>
        </div>

        {/* Action Icons */}
        <div className="nav-actions">
          
          {user ? (
            <div 
              className="nav-user-wrapper" 
              onMouseEnter={() => setDropdownOpen(true)} 
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="nav-icon" aria-label="Account">
                <User />
              </div>
              
              <div className={`nav-dropdown ${dropdownOpen ? 'nav-dropdown--open' : ''}`}>
                <div className="nav-dropdown-header">
                  <strong>My Account</strong>
                  <span>{user.phone || user.email}</span>
                </div>
                <Link to="/orders" className="nav-dropdown-item">My Orders</Link>
                <Link to="/support" className="nav-dropdown-item">Help Center</Link>
                <div className="nav-dropdown-divider"></div>
                <button onClick={logout} className="nav-dropdown-item nav-dropdown-logout">
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login-nav">Log In</Link>
              <Link to="/signup" className="btn-signup-nav">Sign Up</Link>
            </div>
          )}

          <Link to="/cart" className={`nav-cart-btn ${cartCount > 0 ? 'nav-cart-btn--active' : ''}`} aria-label="Cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="nav-cart-badge">
                <span className="nav-cart-count">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`nav-toggle ${menuOpen ? 'nav-toggle--open' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`nav-mobile ${menuOpen ? 'nav-mobile--open' : ''}`}>
        <Link to="/" className="nav-link nav-link--active" onClick={toggleMenu}>Home</Link>
        <Link to="/products" className="nav-link" onClick={toggleMenu}>Products</Link>
        <Link to="/contact" className="nav-link" onClick={toggleMenu}>Contact</Link>
        <div className="nav-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          <Link to="/cart" className={`nav-cart-btn ${cartCount > 0 ? 'nav-cart-btn--active' : ''}`} aria-label="Cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="nav-cart-badge">
                <span className="nav-cart-count">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
              </span>
            )}
          </Link>
          
          {user ? (
            <div style={{ width: '100%', marginTop: '10px', background: 'rgba(0,0,0,0.03)', padding: '15px', borderRadius: '8px' }}>
              <div style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <strong style={{ display: 'block', color: 'var(--color-primary)' }}>My Account</strong>
                <span style={{ fontSize: '0.85rem', color: '#666' }}>{user.phone || user.email}</span>
              </div>
              <Link to="/orders" className="nav-link" onClick={toggleMenu} style={{ display: 'block', marginBottom: '10px' }}>My Orders</Link>
              <Link to="/support" className="nav-link" onClick={toggleMenu} style={{ display: 'block', marginBottom: '15px' }}>Help Center</Link>
              <button 
                onClick={() => { logout(); toggleMenu(); }} 
                className="btn-login-nav" 
                style={{ width: '100%', textAlign: 'center', color: 'red', borderColor: 'red' }}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: '10px' }}>
              <Link to="/login" className="btn-login-nav" style={{flex: 1, textAlign: 'center'}}>Log In</Link>
              <Link to="/signup" className="btn-signup-nav" style={{flex: 1, textAlign: 'center'}}>Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
