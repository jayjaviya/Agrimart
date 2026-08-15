import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
    image: seedsImg
  },
  {
    id: 2,
    category: 'IRRIGATION',
    name: 'AquaSmart Digital Flow Controller',
    rating: 5.0,
    reviews: 45,
    price: 890.00,
    image: irrigationImg
  },
  {
    id: 3,
    category: 'FERTILIZERS',
    name: 'NitroBoost Pro Liquid Complex 5 Gal',
    rating: 4.2,
    reviews: 88,
    price: 65.00,
    image: fertilizersImg
  },
  {
    id: 4,
    category: 'SPRAYERS',
    name: 'AeroTech Heavy Duty Backpack Sprayer',
    rating: 4.6,
    reviews: 210,
    price: 120.00,
    image: toolsImg 
  }
];

const Products = () => {
  const tabs = ['All Products', 'Seeds', 'Fertilizers', 'Crop Protection', 'Irrigation', 'Sprayers', 'Tools & Equipment'];
  const location = useLocation();
  const navigate = useNavigate();
  
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category');
  
  const [activeTab, setActiveTab] = useState(
    categoryParam && tabs.includes(categoryParam) ? categoryParam : 'All Products'
  );

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

  return (
    <main className="products-page">
      <div className="products-container">
        
        <header className="products-header">
          <h1>Products for Better Farming</h1>
          <p>Explore quality products for every stage of your farming journey. High-performance equipment, premium seeds, and professional-grade supplies.</p>
          
          <div className="products-controls">
            <div className="products-tabs">
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

            <div className="products-search">
              <Search className="search-icon" size={20} />
              <input type="text" placeholder="Search products..." />
            </div>
          </div>
        </header>

        <div className="products-layout">
          <aside className="products-sidebar">
            <div className="filter-group">
              <h3>PRICE RANGE</h3>
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Under $50
              </label>
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span className="checkmark"></span>
                $50 - $200
              </label>
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkmark"></span>
                $200 - $1000
              </label>
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Over $1000
              </label>
            </div>

            <div className="filter-group">
              <h3>BRAND</h3>
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span className="checkmark"></span>
                AgriPro
              </label>
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkmark"></span>
                YieldMaster
              </label>
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkmark"></span>
                TerraTech
              </label>
            </div>
          </aside>

          <section className="products-grid-section">
            <div className="products-grid-inner">
              {dummyProducts.map(product => (
                <Link to={`/product/${product.id}`} key={product.id} className="prod-card" style={{ textDecoration: 'none' }}>
                  <div className="prod-card-img-wrap">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="prod-card-info">
                    <span className="prod-category">{product.category}</span>
                    <h4 className="prod-title">{product.name}</h4>
                    
                    <div className="prod-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "var(--color-secondary)" : "none"} color="var(--color-secondary)" />
                        ))}
                      </div>
                      <span className="rating-text">{product.rating.toFixed(1)} ({product.reviews})</span>
                    </div>

                    <div className="prod-footer">
                      <span className="prod-price">${product.price.toFixed(2)}</span>
                      <button className="prod-add-btn">ADD</button>
                    </div>
                  </div>
                </Link>
              ))}
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
