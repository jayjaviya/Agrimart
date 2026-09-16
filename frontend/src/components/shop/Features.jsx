import { Truck, Headphones, ShieldCheck } from 'lucide-react';
import '../../styles/shop/Features.css';

const features = [
  {
    icon: <Truck />,
    title: 'Logistics Excellence',
    description: 'Nationwide delivery with specialized handling for agricultural bulk orders.',
  },
  {
    icon: <Headphones />,
    title: 'Technical Support',
    description: '24/7 access to agronomists and equipment specialists for expert guidance.',
  },
  {
    icon: <ShieldCheck />,
    title: 'Certified Quality',
    description: 'All products meet stringent industry standards for safety and efficacy.',
  },
];

const Features = () => {
  return (
    <section className="features" id="features">
      <div className="features-grid">
        {features.map((feature, index) => (
          <div
            className="feature-card"
            key={index}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="feature-icon">
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
