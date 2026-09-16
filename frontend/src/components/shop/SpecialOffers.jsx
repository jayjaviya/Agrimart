import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import AddToCartButton from './AddToCartButton';
import { Star, Tag } from 'lucide-react';
import '../../styles/shop/SpecialOffers.css';

const SpecialOffers = () => {
  const { addToCart } = useContext(CartContext);
  const [offers, setOffers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        // Take a subset of products to show as "Special Offers" (e.g., first 5 or highest rated)
        // For now, we'll just take the first 5 and add dynamic discount badges
        const specialOffers = data.slice(0, 5).map(product => {
          // Generate an old price (e.g. 15-25% more) since our DB doesn't have it
          const markup = 1 + (Math.floor(Math.random() * 10) + 15) / 100;
          const oldPrice = product.price * markup;
          const discountPercent = Math.round((1 - product.price / oldPrice) * 100);
          
          return {
            ...product,
            oldPrice: oldPrice,
            newPrice: product.price,
            badge: `${discountPercent}% OFF`
          };
        });

        setOffers(specialOffers);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Could not load special offers.');
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const loadMore = () => {
    setVisibleCount(offers.length);
  };

  if (loading) return <div style={{textAlign: 'center', padding: '50px'}}>Loading offers...</div>;
  if (error) return null; // Hide section if error

  return (
    <section className="offers-section section" id="special-offers">
      <div className="section-header">
        <h2>Deal of the Week / Bulk Offers</h2>
        <p>Premium agricultural supplies at unmatched prices. Stock up while supplies last.</p>
      </div>

      <div className="offers-grid">
        {offers.slice(0, visibleCount).map((offer) => (
          <Link to={`/product/${offer._id}`} key={offer._id} className="offer-card">
            <div className="offer-badge"><Tag size={12} /> {offer.badge}</div>
            <div className="offer-img-wrap">
              <img src={offer.image} alt={offer.name} />
            </div>
            
            <div className="offer-content">
              <span className="offer-category">{offer.category}</span>
              <h3 className="offer-title">{offer.name}</h3>
              
              <div className="offer-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(offer.rating) ? "#B89947" : "none"} color="#B89947" />
                  ))}
                </div>
                <span>{offer.rating} ({offer.reviews})</span>
              </div>
              
              <div className="offer-pricing" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <div>
                  <span className="old-price">₹{offer.oldPrice.toFixed(2)}</span>
                  <span className="new-price" style={{ marginLeft: '10px' }}>₹{offer.newPrice.toFixed(2)}</span>
                </div>
                <AddToCartButton product={offer} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {visibleCount < offers.length && (
        <div className="load-more-wrap text-center mt-3">
          <button className="btn-load-more" onClick={loadMore}>
            Load More Products
          </button>
        </div>
      )}
    </section>
  );
};

export default SpecialOffers;
