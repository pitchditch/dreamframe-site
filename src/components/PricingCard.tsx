
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

interface Feature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  features: Feature[];
  popular?: boolean;
  subtitle?: string;
  link?: string;
  buttonText?: string;
}

const PricingCard = ({ 
  title, 
  price, 
  features, 
  popular = false,
  subtitle = "",
  link = "/contact",
  buttonText = "Get Started"
}: PricingCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg border ${popular ? 'border-bc-red relative' : 'border-gray-200'}`}>
      {popular && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold uppercase py-1 px-3 transform rotate-45 translate-x-8 translate-y-4">
          Popular
        </div>
      )}
      
      <div className={`px-6 py-8 ${popular ? 'bg-bc-red text-white' : 'bg-white'}`}>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        {subtitle && <p className="text-sm mb-4 opacity-80">{subtitle}</p>}
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">{price}</span>
        </div>
      </div>
      
      <div className="px-6 py-8 bg-white">
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle 
                size={20} 
                className={feature.included ? "text-bc-red mr-2 flex-shrink-0" : "text-gray-300 mr-2 flex-shrink-0"} 
                fill={feature.included ? "#fee2e2" : "transparent"}
              />
              <span className={feature.included ? "text-gray-700" : "text-gray-400"}>{feature.text}</span>
            </li>
          ))}
        </ul>
        <Link to={link}>
          <button 
            className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
              popular 
                ? 'bg-bc-red text-white hover:bg-red-700' 
                : 'bg-white text-bc-red border border-bc-red hover:bg-gray-50'
            }`}
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PricingCard;
