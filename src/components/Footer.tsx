
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import FooterWeatherService from './FooterWeatherService';

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 mt-16">
          {/* Logo and company info */}
          <div className="col-span-1">
            <div className="mb-4 flex flex-col items-center">
              <Link to="/">
                <img src="/lovable-uploads/9fd8e651-7601-4cbe-8e73-c48efe84a1fa.png" alt="BC Pressure Washing Logo" className="h-24 md:h-28 mb-4" />
              </Link>
              {/* Car image moved below the logo */}
              <img alt="BC Pressure Washing Service Car" className="h-20 mt-2" src="/lovable-uploads/3da7ac70-3771-4584-b170-acc52f801bf8.png" />
            </div>
            <p className="text-gray-300 mb-6 text-base text-center">
              Professional pressure washing services for residential and commercial properties. We deliver top-quality cleaning solutions with attention to detail.
            </p>
            <div className="flex space-x-4 justify-center">
              <a href="https://www.facebook.com/BCPressureWashing" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-all duration-200 hover:scale-125">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/bc.pressure.washing" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-all duration-200 hover:scale-125">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-all duration-200 hover:scale-125">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Our Services links */}
          <div className="col-span-1">
            <h4 className="text-xl font-semibold mb-6 text-white">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services/window-cleaning" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 transform transition-transform duration-200 group-hover:scale-125">→</span> Window Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/pressure-washing" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 transform transition-transform duration-200 group-hover:scale-125">→</span> Pressure Washing
                </Link>
              </li>
              <li>
                <Link to="/services/gutter-cleaning" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 transform transition-transform duration-200 group-hover:scale-125">→</span> Gutter Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/roof-cleaning" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 transform transition-transform duration-200 group-hover:scale-125">→</span> Roof Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/commercial-window-cleaning" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 transform transition-transform duration-200 group-hover:scale-125">→</span> Commercial Services
                </Link>
              </li>
              <li>
                <Link to="/services/compare" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 transform transition-transform duration-200 group-hover:scale-125">→</span> Compare Services
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="mr-2 transform transition-transform duration-200 group-hover:scale-125">→</span> View All Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-span-1">
            <h4 className="text-xl font-semibold mb-6 text-white">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-bc-red mr-3 flex-shrink-0 mt-1 transition-transform duration-200 hover:scale-125" size={18} />
                <span className="text-gray-300">Marine Dr, White Rock, BC</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-bc-red mr-3 flex-shrink-0 transition-transform duration-200 hover:scale-125" size={18} />
                <a href="tel:+17788087620" className="text-gray-300 hover:text-white transition-colors">778 808 7620</a>
              </li>
              <li className="flex items-center">
                <Mail className="text-bc-red mr-3 flex-shrink-0 transition-transform duration-200 hover:scale-125" size={18} />
                <a href="mailto:bcpressurewashing.ca@gmail.com" className="text-gray-300 hover:text-white transition-colors">bcpressurewashing.ca@gmail.com</a>
              </li>
              <li className="flex items-start">
                <Clock className="text-bc-red mr-3 flex-shrink-0 mt-1 transition-transform duration-200 hover:scale-125" size={18} />
                <div className="text-gray-300">
                  <div>Monday-Friday: 8AM - 6PM</div>
                  <div>Saturday: 9AM - 5PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Footer Weather Service */}
          <div className="col-span-1">
            <FooterWeatherService />
          </div>
        </div>

        {/* Copyright and bottom links */}
        <div className="border-t border-gray-800 pt-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 BC Pressure Washing. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Full-width Marine Drive image below footer content - only show on homepage */}
      {isHomePage ? (
        <div className="w-full">
          <img 
            src="/lovable-uploads/2b1c86bf-f351-48ad-831b-a33b68b7bcdc.png" 
            alt="White Rock Marine Drive" 
            className="w-full h-auto object-cover" 
            style={{
              maxHeight: "400px"
            }} 
          />
        </div>
      ) : (
        <div className="w-full">
          <img 
            src="/lovable-uploads/32eacf1b-1b0c-4d77-8a7e-2d495f635e4f.png" 
            alt="White Rock Based Business - Marine Drive" 
            className="w-full h-auto object-cover"
            style={{
              minHeight: "300px",
              maxHeight: "500px"
            }}
          />
        </div>
      )}
    </footer>
  );
};

export default Footer;
