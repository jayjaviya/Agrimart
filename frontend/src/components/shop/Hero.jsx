import { Link } from 'react-router-dom';
import heroImage from '../../assets/images/hero-farm.png';
import '../../styles/shop/Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="hero">
      {/* Background Image */}
      <div className="hero-bg">
        <img src={heroImage} alt="Modern agriculture farm landscape" />
      </div>
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <div className="hero-content-inner">

          <h1>
            Everything You Need<br />
            to Grow Better.
          </h1>

          <p className="hero-description">
            Empowering modern agriculture with premium seeds,
            advanced fertilizers, and professional-grade equipment for
            unmatched yield and efficiency.
          </p>

          <div className="hero-cta">
            <Link to="/products" className="btn btn-primary">
              Explore Products
            </Link>
            <Link to="/contact" className="btn btn-inverted">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
