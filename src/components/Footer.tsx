
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import ServiceAreaMap from './ServiceAreaMap';
import WeatherService from './WeatherService';

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 pt-16">
        {/* Only show FAQs on non-homepage routes */}
        {!isHomePage}
        
        {/* LocationBanner has been removed */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 mt-16">
          {/* Logo and social media links */}
          <div className="col-span-1">
            <div className="mb-4 flex flex-col items-center">
              <Link to="/">
                <img src="/lovable-uploads/9fd8e651-7601-4cbe-8e73-c48efe84a1fa.png" alt="BC Pressure Washing Logo" className="h-24 md:h-28 mb-4" />
              </Link>
              {/* Car image moved below the logo */}
              <img alt="BC Pressure Washing Service Car" className="h-20 mt-2" src="/lovable-uploads/3da7ac70-3771-4584-b170-acc52f801bf8.png" />
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

          {/* Our Services links */}
          <div className="col-span-1">
            <h4 className="text-xl font-semibold mb-6 text-white">Our Services</h4>
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

          {/* Contact Information */}
          <div className="col-span-1">
            <h4 className="text-xl font-semibold mb-6 text-white">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-bc-red mr-3 flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-300">Marine Dr, White Rock, BC</span>
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

          {/* Weather Service Component (replacing FooterContactForm) */}
          <div className="col-span-1">
            <h4 className="text-xl font-semibold mb-6 text-white">Weather & Service Availability</h4>
            <div className="bg-gray-800 p-4 rounded-lg">
              <WeatherService compact={true} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Full-width image below footer */}
      <div className="w-full h-auto">
        <img src="/lovable-uploads/a9642252-b006-4c8c-89d4-d439e04f9891.png" alt="White Rock Marine Drive" className="w-full object-cover" style={{
        maxHeight: "400px"
      }} />
      </div>
    </footer>
  );
};

export default Footer;
