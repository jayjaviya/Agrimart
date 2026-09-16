import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import seedsImg from '../../assets/images/premium-seeds.png';
import fertilizersImg from '../../assets/images/fertilizers-nutrition.png';
import toolsImg from '../../assets/images/tools-equipment.png';
import cropImg from '../../assets/images/scout-drone.png';
import irrigationImg from '../../assets/images/pivot-irrigation.png';
import sprayersImg from '../../assets/images/combine-harvester.png'; // using harvester as placeholder
import '../../styles/shop/Categories.css';

const categories = [
  {
    title: 'Premium Seeds',
    description: 'High-yield varieties optimized for diverse climates and soil conditions.',
    image: seedsImg,
    link: '/products?category=Seeds',
    cta: 'Explore Seeds',
  },
  {
    title: 'Fertilizers & Nutrition',
    description: 'Advanced formulations for precise nutrient delivery and sustainable growth.',
    image: fertilizersImg,
    link: '/products?category=Fertilizers',
    cta: 'Explore Nutrition',
  },
  {
    title: 'Tools & Equipment',
    description: 'Durable, professional-grade tools designed for rigorous daily field use.',
    image: toolsImg,
    link: '/products?category=Tools %26 Equipment',
    cta: 'Explore Equipment',
  },
  {
    title: 'Crop Protection',
    description: 'Advanced solutions to safeguard your crops against pests and diseases.',
    image: cropImg,
    link: '/products?category=Crop Protection',
    cta: 'Explore Protection',
  },
  {
    title: 'Irrigation',
    description: 'Efficient water management systems for optimal crop hydration.',
    image: irrigationImg,
    link: '/products?category=Irrigation',
    cta: 'Explore Irrigation',
  },
  {
    title: 'Sprayers',
    description: 'High-performance application equipment for precise coverage.',
    image: sprayersImg,
    link: '/products?category=Sprayers',
    cta: 'Explore Sprayers',
  }
];

const Categories = () => {
  return (
    <section className="categories section" id="categories">
      <div className="section-header">
        <h2>Professional Categories</h2>
        <p>Premium agricultural supplies tailored for optimal yield and sustainable growth.</p>
      </div>

      <div className="categories-grid">
        {categories.map((cat, index) => (
          <Link to={cat.link} className="category-card" key={index}>
            <img
              className="category-card-img"
              src={cat.image}
              alt={cat.title}
            />
            <div className="category-card-overlay" />
            <div className="category-card-content">
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
              <span className="category-link">
                {cat.cta} <ArrowRight />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
