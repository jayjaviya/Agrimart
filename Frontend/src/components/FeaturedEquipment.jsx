import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import cultivatorImg from '../assets/images/cultivator.png';
import harvesterImg from '../assets/images/combine-harvester.png';
import irrigationImg from '../assets/images/pivot-irrigation.png';
import droneImg from '../assets/images/scout-drone.png';
import '../styles/FeaturedEquipment.css';

const products = [
  {
    id: 1,
    category: 'Heavy Machinery',
    name: 'Pro-Grade Cultivator X500',
    price: 45000,
    oldPrice: null,
    image: cultivatorImg,
    badge: 'new',
  },
  {
    id: 2,
    category: 'Harvesting',
    name: 'AgriCombine Series 8',
    price: 120000,
    oldPrice: null,
    image: harvesterImg,
    badge: null,
  },
  {
    id: 3,
    category: 'Water Management',
    name: 'Smart Pivot System',
    price: 18500,
    oldPrice: null,
    image: irrigationImg,
    badge: null,
  },
  {
    id: 4,
    category: 'Precision Ag',
    name: 'Scout Drone Pro V2',
    price: 2850,
    oldPrice: 3500,
    image: droneImg,
    badge: 'sale',
  },
];

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const FeaturedEquipment = () => {
  return (
    <section className="featured-equipment" id="featured-equipment">
      <div className="featured-header">
        <div className="featured-header-text">
          <h2>Featured Equipment</h2>
          <p>Top-rated machinery for large-scale operations.</p>
        </div>
        <Link to="/products" className="featured-view-all">
          View All <ArrowRight />
        </Link>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-card-img-wrap">
              <img src={product.image} alt={product.name} />
              {product.badge === 'new' && (
                <span className="product-badge product-badge--new">New</span>
              )}
              {product.badge === 'sale' && (
                <span className="product-badge product-badge--sale">Sale</span>
              )}
            </div>
            <div className="product-card-body">
              <div className="product-category">{product.category}</div>
              <div className="product-name">{product.name}</div>
            </div>
            <div className="product-card-footer">
              <div className="product-price">
                {product.oldPrice && (
                  <span className="product-price-old">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                <span className="product-price-current">
                  {formatPrice(product.price)}
                </span>
              </div>
              <button className="product-cart-btn" aria-label={`Add ${product.name} to cart`}>
                <ShoppingCart />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedEquipment;
