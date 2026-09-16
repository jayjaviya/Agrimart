import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import AddToCartButton from '../../components/shop/AddToCartButton';
import { Star, Truck, ChevronRight } from 'lucide-react';
import '../../styles/shop/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          console.error('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return <main className="product-details-page"><div className="pd-container" style={{padding: '50px', textAlign: 'center'}}>Loading...</div></main>;
  }

  if (!product) {
    return <main className="product-details-page"><div className="pd-container" style={{padding: '50px', textAlign: 'center'}}>Product not found!</div></main>;
  }

  const images = [product.image]; // we only have 1 image per product right now in db

  return (
    <main className="product-details-page">
      <div className="pd-container">
        
        {/* Breadcrumbs */}
        <nav className="pd-breadcrumbs">
          <Link to="/">Home</Link>
          <ChevronRight size={14} className="breadcrumb-icon" />
          <Link to={`/products?category=${product.category}`}>{product.category}</Link>
          <ChevronRight size={14} className="breadcrumb-icon" />
          <span className="current">{product.name}</span>
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
              <img src={images[activeImage]} alt={product.name} />
            </div>
          </div>

          {/* Product Info */}
          <div className="pd-info">
            <h1 className="pd-title">{product.name}</h1>
            
            <div className="pd-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating || 5) ? "var(--color-secondary)" : (i === 4 ? "url(#half)" : "none")} color="var(--color-secondary)" />
                ))}
              </div>
              <span className="rating-text">{(product.rating || 5.0).toFixed(1)} ({product.reviews || 0} reviews)</span>
            </div>

            <div className="pd-price-row">
              <span className="pd-price">₹{product.price.toFixed(2)}</span>
            </div>

            <p className="pd-description">
              {product.description || 'No description available for this product.'}
            </p>

            <div className="pd-badges">
              <span className="pd-badge">
                <Star size={14} /> Professional Grade
              </span>
            </div>

            <hr className="pd-divider" />

            <div className="pd-actions-area">
              <div className="pd-buttons-row" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <AddToCartButton product={product} variant="large" />
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
              <span className="spec-label">SKU</span>
              <span className="spec-value">{product.sku || 'N/A'}</span>
            </div>
            <div className="pd-spec-item">
              <span className="spec-label">Category</span>
              <span className="spec-value">{product.category}</span>
            </div>
            <div className="pd-spec-item">
              <span className="spec-label">Meta</span>
              <span className="spec-value">{product.meta || 'N/A'}</span>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default ProductDetails;
