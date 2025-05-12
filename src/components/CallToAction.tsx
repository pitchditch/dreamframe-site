
import { Link } from 'react-router-dom';
import PriceCalculatorOverlay from './PriceCalculatorOverlay';

interface CallToActionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
  hideImage?: boolean;
}

const CallToAction = ({
  title = "Ready to Transform Your Property?",
  subtitle = "Contact us today to schedule a service or request a free, no-obligation quote.",
  primaryButtonText = "Check Prices & Availability",
  secondaryButtonText = "Contact Us",
  primaryButtonLink = "/contact",
  secondaryButtonLink = "/contact",
  backgroundImage = "/lovable-uploads/1d7d3c0f-21a5-4ae2-80c7-7f156797449f.png",
  hideImage = false
}: CallToActionProps) => {
  return (
    <section className="py-16 relative">
      {!hideImage && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img 
            src={backgroundImage} 
            alt="Call to action background" 
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center center' }} // Ensure image is centered properly
          />
        </div>
      )}
      
      <div className={`container mx-auto px-4 relative z-20 ${!hideImage ? 'text-white' : 'text-gray-800'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-shadow-lg">{title}</h2>
          <p className="text-lg mb-8 text-shadow-sm">{subtitle}</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to={primaryButtonLink}
              className="bg-bc-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center transition-all hover:scale-105"
            >
              {primaryButtonText}
            </Link>
            
            <Link
              to={secondaryButtonLink}
              className={`${!hideImage ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} backdrop-blur-sm px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center transition-all hover:scale-105`}
            >
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
