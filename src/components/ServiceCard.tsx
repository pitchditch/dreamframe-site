
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  image?: string;
}

const ServiceCard = ({ icon, title, description, link, image }: ServiceCardProps) => {
  return (
    <div className="service-card">
      {image && (
        <div className="mb-4 overflow-hidden rounded-md">
          <img src={image} alt={title} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
        </div>
      )}
      <div className="flex items-start">
        <div className="feature-icon">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <Link to={link} className="service-link">
        Learn More <ArrowRight size={16} />
      </Link>
    </div>
  );
};

export default ServiceCard;
