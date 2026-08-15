import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import '../../styles/shop/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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
          <span className="navbar-logo-icon">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M16 8c0 0-6 4-6 10s6 6 6 6 6 0 6-6-6-10-6-10z" fill="currentColor" opacity="0.3"/>
              <path d="M16 6c-2 4-2 8 0 12M12 12c2-1 6-1 8 0M11 18c2 1 7 1 10 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
          AgriMart
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'nav-link--active' : ''}`}>Home</Link>
          <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'nav-link--active' : ''}`}>Products</Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'nav-link--active' : ''}`}>Contact</Link>
        </div>

        {/* Action Icons */}
        <div className="nav-actions">
          <button className="nav-icon" id="search-btn" aria-label="Search">
            <Search />
          </button>
          <Link to="/login" className="nav-icon" aria-label="Account">
            <User />
          </Link>
          <Link to="/cart" className="nav-icon" aria-label="Cart">
            <ShoppingCart />
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
        <div className="nav-actions" style={{ display: 'flex' }}>
          <button className="nav-icon" aria-label="Search"><Search /></button>
          <Link to="/cart" className="nav-icon" aria-label="Cart"><ShoppingCart /></Link>
          <Link to="/login" className="nav-icon" aria-label="Account"><User /></Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
