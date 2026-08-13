import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, Heart, ChevronRight, Minus, Plus, Droplets, ArrowUpCircle } from 'lucide-react';
import '../styles/ProductDetails.css';

import mainImg from '../assets/images/premium-seeds.png';
import img2 from '../assets/images/fertilizers-nutrition.png';
import img3 from '../assets/images/pivot-irrigation.png';
import img4 from '../assets/images/tools-equipment.png';

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const images = [mainImg, img2, img3, img4];

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <main className="product-details-page">
      <div className="pd-container">
        
        {/* Breadcrumbs */}
        <nav className="pd-breadcrumbs">
          <Link to="/">Home</Link>
          <ChevronRight size={14} className="breadcrumb-icon" />
          <Link to="/products">Seed Varieties</Link>
          <ChevronRight size={14} className="breadcrumb-icon" />
          <span className="current">ProYield Hybrid Corn</span>
        </nav>

        {/* Top Layout */}
        <div className="pd-layout">
          
          {/* Image Gallery */}
          <div className="pd-gallery">
            <div className="pd-thumbnails">
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`pd-thumb ${activeImage === idx ? 'active' : ''}`}
                  onClick={() => setActiveImage(idx)}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} />
                </div>
              ))}
            </div>
            <div className="pd-main-image">
              <img src={images[activeImage]} alt="ProYield Hybrid Corn Seeds" />
            </div>
          </div>

          {/* Product Info */}
          <div className="pd-info">
            <h1 className="pd-title">ProYield Hybrid Corn<br/>Seeds</h1>
            
            <div className="pd-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < 4 ? "var(--color-secondary)" : (i === 4 ? "url(#half)" : "none")} color="var(--color-secondary)" />
                ))}
              </div>
              <span className="rating-text">4.8 (124 reviews)</span>
            </div>

            <div className="pd-price-row">
              <span className="pd-price">$340.00</span>
              <span className="pd-price-original">$380.00</span>
            </div>

            <p className="pd-description">
              Engineered for maximum yield in diverse climates, ProYield Hybrid Corn offers superior standability and exceptional drought tolerance. Ideal for professional operations demanding consistent, high-volume harvests.
            </p>

            <div className="pd-badges">
              <span className="pd-badge">
                <ArrowUpCircle size={14} /> High Germination Rate
              </span>
              <span className="pd-badge">
                <Droplets size={14} /> Drought Resistant
              </span>
              <span className="pd-badge">
                <Star size={14} /> Professional Grade
              </span>
            </div>

            <hr className="pd-divider" />

            <div className="pd-actions-area">
              <div className="pd-quantity-row">
                <div className="pd-quantity-selector">
                  <button onClick={handleDecrease}><Minus size={16} /></button>
                  <input type="number" value={quantity} readOnly />
                  <button onClick={handleIncrease}><Plus size={16} /></button>
                </div>
                <span className="pd-unit-text">50lb Bag</span>
              </div>

              <div className="pd-buttons-row">
                <button className="pd-btn pd-btn-primary">Add to Cart</button>
                <button className="pd-btn pd-btn-secondary">Buy Now</button>
                <button className="pd-btn pd-btn-icon"><Heart size={20} /></button>
              </div>
            </div>

            <div className="pd-shipping-box">
              <div className="shipping-header">
                <Truck size={18} />
                <strong>Calculated Shipping at Checkout</strong>
              </div>
              <p className="shipping-desc">
                Est. Delivery: 3-5 Business Days (Freight available for bulk)
              </p>
            </div>

          </div>
        </div>

        <hr className="pd-divider-full" />

        {/* Technical Specs */}
        <section className="pd-specs-section">
          <h2>Technical Specifications</h2>
          
          <div className="pd-specs-grid">
            <div className="pd-spec-item">
              <span className="spec-label">Weight</span>
              <span className="spec-value">50 lbs</span>
            </div>
            <div className="pd-spec-item">
              <span className="spec-label">Coverage</span>
              <span className="spec-value">Approx. 2.5 Acres</span>
            </div>
            <div className="pd-spec-item">
              <span className="spec-label">Relative Maturity</span>
              <span className="spec-value">110 Days</span>
            </div>
            <div className="pd-spec-item">
              <span className="spec-label">Trait Package</span>
              <span className="spec-value">Conventional</span>
            </div>
            <div className="pd-spec-item">
              <span className="spec-label">Kernel Rows</span>
              <span className="spec-value">16-18</span>
            </div>
            <div className="pd-spec-item">
              <span className="spec-label">Test Weight</span>
              <span className="spec-value">Excellent</span>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default ProductDetails;
