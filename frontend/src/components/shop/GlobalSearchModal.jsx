import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import '../../styles/shop/GlobalSearchModal.css';

const GlobalSearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      // Save current scroll position and lock body
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      // Focus input when modal opens
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
      setSearchQuery('');
      setResults([]);
      setHasSearched(false);
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY) * -1);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setHasSearched(true);
      try {
        const res = await fetch(`http://localhost:5001/api/products?search=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error('Failed to fetch search results', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className={`search-modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="search-modal-container" onClick={e => e.stopPropagation()}>
        
        <div className="search-modal-header">
          <div className="search-modal-input-wrap">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              className="search-modal-input"
              placeholder="Search for products, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              ref={inputRef}
            />
          </div>
          <button className="search-modal-close" onClick={onClose} aria-label="Close search">
            <X size={20} />
          </button>
        </div>

        <div className="search-modal-body">
          
          {loading ? (
            <div className="search-results-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-img"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text medium"></div>
                  <div className="skeleton-text short" style={{ marginTop: 'auto' }}></div>
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="search-results-grid">
              {results.map(product => (
                <Link 
                  to={`/product/${product._id || product.id}`} 
                  key={product._id || product.id} 
                  className="search-result-card"
                  onClick={onClose}
                >
                  <img src={product.image} alt={product.name} className="search-result-img" />
                  <span className="search-result-category">{product.category}</span>
                  <h4 className="search-result-title">{product.name}</h4>
                  <div className="search-result-price">₹{product.price.toFixed(2)}</div>
                </Link>
              ))}
            </div>
          ) : hasSearched && !loading ? (
            <div className="search-empty">
              <h3>No products found</h3>
              <p>Try checking your spelling or use more general terms.</p>
            </div>
          ) : (
            <div className="search-empty" style={{ opacity: 0.6 }}>
              <h3>Start typing to search...</h3>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default GlobalSearchModal;
