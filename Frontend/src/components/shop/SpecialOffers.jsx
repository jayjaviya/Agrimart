import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Tag } from 'lucide-react';
import seedsImg from '../../assets/images/premium-seeds.png';
import fertilizersImg from '../../assets/images/fertilizers-nutrition.png';
import toolsImg from '../../assets/images/tools-equipment.png';
import cropImg from '../../assets/images/scout-drone.png';
import irrigationImg from '../../assets/images/pivot-irrigation.png';
import '../../styles/shop/SpecialOffers.css';

const offers = [
  {
    id: 101,
    category: 'Seeds',
    name: 'Drought-Resistant Wheat Seed (50lb)',
    oldPrice: 380.00,
    newPrice: 335.50,
    rating: 4.8,
    reviews: 215,
    image: seedsImg,
    badge: '12% OFF'
  },
  {
    id: 102,
    category: 'Fertilizers',
    name: 'NitroBoost Pro Liquid Complex 5 Gal',
    oldPrice: 85.00,
    newPrice: 65.00,
    rating: 4.6,
    reviews: 88,
    image: fertilizersImg,
    badge: '23% OFF'
  },
  {
    id: 103,
    category: 'Tools & Equipment',
    name: 'Pro-Grade Submersible Pump 2HP',
    oldPrice: 950.00,
    newPrice: 845.00,
    rating: 4.9,
    reviews: 142,
    image: toolsImg,
    badge: '11% OFF'
  },
  {
    id: 104,
    category: 'Irrigation',
    name: 'AquaSmart Digital Flow Controller',
    oldPrice: 1050.00,
    newPrice: 890.00,
    rating: 5.0,
    reviews: 45,
    image: irrigationImg,
    badge: '15% OFF'
  },
  {
    id: 105,
    category: 'Crop Protection',
    name: 'AgriScout Surveillance Drone V2',
    oldPrice: 2200.00,
    newPrice: 1850.00,
    rating: 4.7,
    reviews: 310,
    image: cropImg,
    badge: '$350 OFF'
  }
];

const SpecialOffers = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const loadMore = () => {
    setVisibleCount(offers.length);
  };

  return (
    <section className="offers-section section" id="special-offers">
      <div className="section-header">
        <h2>Deal of the Week / Bulk Offers</h2>
        <p>Premium agricultural supplies at unmatched prices. Stock up while supplies last.</p>
      </div>

      <div className="offers-grid">
        {offers.slice(0, visibleCount).map((offer) => (
          <Link to={`/product/${offer.id}`} key={offer.id} className="offer-card">
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
              
              <div className="offer-pricing">
                <span className="old-price">${offer.oldPrice.toFixed(2)}</span>
                <span className="new-price">${offer.newPrice.toFixed(2)}</span>
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
