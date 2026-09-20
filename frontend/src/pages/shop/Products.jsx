import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import AddToCartButton from '../../components/shop/AddToCartButton';
import { Search, Star } from 'lucide-react';
import seedsImg from '../../assets/images/premium-seeds.png';
import fertilizersImg from '../../assets/images/fertilizers-nutrition.png';
import irrigationImg from '../../assets/images/pivot-irrigation.png';
import toolsImg from '../../assets/images/tools-equipment.png';
import '../../styles/shop/Products.css';

const dummyProducts = [
  {
    id: 1,
    category: 'SEEDS',
    name: 'ProYield Hybrid Corn Seeds X-100',
    rating: 4.8,
    reviews: 120,
    price: 145.00,
    image: seedsImg,
    meta: 'AgriPro'
  },
  {
    id: 2,
    category: 'IRRIGATION',
    name: 'AquaSmart Digital Flow Controller',
    rating: 5.0,
    reviews: 45,
    price: 890.00,
    image: irrigationImg,
    meta: 'TerraTech'
  },
  {
    id: 3,
    category: 'FERTILIZERS',
    name: 'NitroBoost Pro Liquid Complex 5 Gal',
    rating: 4.2,
    reviews: 88,
    price: 65.00,
    image: fertilizersImg,
    meta: 'YieldMaster'
  },
  {
    id: 4,
    category: 'TOOLS',
    name: 'AeroTech Heavy Duty Backpack Sprayer',
    rating: 4.6,
    reviews: 210,
    price: 120.00,
    image: toolsImg,
    meta: 'AgriPro'
  }
];

import GlobalSearchModal from '../../components/shop/GlobalSearchModal';

const Products = () => {
  const tabs = ['All Products', 'Seeds', 'Fertilizers', 'Crop Protection', 'Irrigation', 'Sprayers', 'Tools & Equipment'];
  const { addToCart } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category');
  
  const [activeTab, setActiveTab] = useState(
    categoryParam && tabs.includes(categoryParam) ? categoryParam : 'All Products'
  );

  const [allProducts, setAllProducts] = useState(dummyProducts);
  const [loading, setLoading] = useState(true);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [priceFilters, setPriceFilters] = useState({
    'Under ₹50': false,
    '₹50 - ₹200': false,
    '₹200 - ₹1000': false,
    'Over ₹1000': false
  });


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/products');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setAllProducts(data);
          }
        }
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const currentCategory = new URLSearchParams(location.search).get('category');
    if (currentCategory && tabs.includes(currentCategory)) {
      setActiveTab(currentCategory);
    } else if (!currentCategory) {
      setActiveTab('All Products');
    }
  }, [location.search]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'All Products') {
      navigate('/products');
    } else {
      navigate(`/products?category=${encodeURIComponent(tab)}`);
    }
  };

  const handlePriceChange = (label) => {
    setPriceFilters(prev => ({ ...prev, [label]: !prev[label] }));
  };


  // Filter Logic
  const filteredProducts = allProducts.filter(product => {
    // Category match
    if (activeTab !== 'All Products') {
      if (product.category.toLowerCase() !== activeTab.toLowerCase()) return false;
    }

    // Price match
    const activePrices = Object.keys(priceFilters).filter(k => priceFilters[k]);
    if (activePrices.length > 0) {
      let priceMatch = false;
      if (priceFilters['Under ₹50'] && product.price < 50) priceMatch = true;
      if (priceFilters['₹50 - ₹200'] && product.price >= 50 && product.price <= 200) priceMatch = true;
      if (priceFilters['₹200 - ₹1000'] && product.price > 200 && product.price <= 1000) priceMatch = true;
      if (priceFilters['Over ₹1000'] && product.price > 1000) priceMatch = true;
      if (!priceMatch) return false;
    }


    return true;
  });

  return (
    <main className="products-page">
      <div className="products-container">
        
        <header className="sp-header">
          <h1>Products for Better Farming</h1>
          <p>Explore quality products for every stage of your farming journey. High-performance equipment, premium seeds, and professional-grade supplies.</p>
        </header>

        <div className="sp-controls">
          <div className="sp-tabs">
            {tabs.map(tab => (
              <button 
                key={tab} 
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <button className="sp-search-btn" onClick={() => setIsSearchModalOpen(true)}>
            <Search className="search-icon" size={20} />
            <span className="search-placeholder">Search products...</span>
          </button>
        </div>

        <GlobalSearchModal 
          isOpen={isSearchModalOpen} 
          onClose={() => setIsSearchModalOpen(false)} 
        />

        <div className="sp-layout">
          <aside className="sp-sidebar">
            <div className="sp-filter-group">
              <h3>PRICE RANGE</h3>
              {Object.keys(priceFilters).map(label => (
                <label key={label} className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={priceFilters[label]} 
                    onChange={() => handlePriceChange(label)}
                  />
                  <span className="checkmark"></span>
                  {label}
                </label>
              ))}
            </div>


          </aside>

          <section className="products-grid-section">
            <div className="sp-grid-inner">
              {loading ? (
                <p>Loading products...</p>
              ) : filteredProducts.length === 0 ? (
                <p>No products found matching your filters.</p>
              ) : (
                filteredProducts.map(product => (
                <Link to={`/product/${product._id || product.id}`} key={product._id || product.id} className="prod-card" style={{ textDecoration: 'none' }}>
                  <div className="prod-card-img-wrap">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="prod-card-info">
                    <span className="prod-category">{product.category}</span>
                    <h4 className="prod-title">{product.name}</h4>
                    
                    <div className="prod-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill={i < Math.floor(product.rating || 5) ? "var(--color-secondary)" : "none"} color="var(--color-secondary)" />
                        ))}
                      </div>
                      <span className="rating-text">{(product.rating || 5.0).toFixed(1)} ({product.reviews || 0})</span>
                    </div>

                    <div className="prod-footer">
                      <span className="prod-price">₹{product.price.toFixed(2)}</span>
                      <AddToCartButton product={product} />
                    </div>
                  </div>
                </Link>
              ))
              )}
            </div>

            <div className="load-more-wrap">
              <button className="btn-load-more">LOAD MORE PRODUCTS</button>
            </div>
          </section>
        </div>

      </div>
    </main>
  );
};

export default Products;
