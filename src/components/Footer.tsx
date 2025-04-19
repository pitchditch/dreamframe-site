import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import FooterContactForm from './FooterContactForm';
import ServiceAreaMap from './ServiceAreaMap';

const Footer = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Determine which background to show based on the current route
  const getFooterBgImage = () => {
    if (location.pathname.includes('/services/window-cleaning')) {
      return "/lovable-uploads/fa16ee2d-1381-4719-80d7-0bec536ba4d8.png";
    } else if (location.pathname.includes('/services/post-construction')) {
      return "/lovable-uploads/a047b138-d031-4811-9b48-b46dc707a449.png";
    } else {
      return "/lovable-uploads/d924d396-955b-42cd-b850-83ba524d524e.png";
    }
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1">
            <div className="mb-4">
              <Link to="/">
                <img 
                  src="/lovable-uploads/9fd8e651-7601-4cbe-8e73-c48efe84a1fa.png" 
                  alt="BC Pressure Washing Logo" 
                  className="h-24 md:h-28 mb-4"
                />
              </Link>
            </div>
            <p className="text-gray-300 mb-6 text-base">
              Professional pressure washing services for residential and commercial properties. We deliver top-quality cleaning solutions with attention to detail.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/BCPressureWashing" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/bc.pressure.washing" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="text-xl font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services/window-cleaning" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> Window Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/gutter-cleaning" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> Gutter Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/roof-cleaning" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> Roof Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/house-washing" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> House Washing
                </Link>
              </li>
              <li>
                <Link to="/services/driveway-cleaning" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> Driveway Cleaning
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-xl font-semibold mb-6">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-bc-red mr-3 flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-300">15501 Marine Dr, White Rock, BC</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-bc-red mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-300">778 808 7620</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-bc-red mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-300">bcpressurewashing.ca@gmail.com</span>
              </li>
              <li className="flex items-start">
                <Clock className="text-bc-red mr-3 flex-shrink-0 mt-1" size={18} />
                <div className="text-gray-300">
                  <div>Monday-Friday: 8AM - 6PM</div>
                  <div>Saturday: 9AM - 5PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <FooterContactForm />
          </div>
        </div>

        {/* Service Area Map */}
        <div className="mb-12">
          <h4 className="text-xl font-semibold mb-6">Our Service Area</h4>
          <ServiceAreaMap />
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        <div className="text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} BC Pressure Washing. All rights reserved.</p>
          {/* Structured address for SEO */}
          <div itemScope itemType="http://schema.org/LocalBusiness" className="sr-only">
            <span itemProp="name">BC Pressure Washing</span>
            <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
              <span itemProp="streetAddress">15501 Marine Dr</span>
              <span itemProp="addressLocality">White Rock</span>,
              <span itemProp="addressRegion">BC</span>
              <span itemProp="postalCode">V4B 1C9</span>
            </div>
            <span itemProp="telephone">778 808 7620</span>
            <a href="https://bcpressurewashing.ca" itemProp="url">bcpressurewashing.ca</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
