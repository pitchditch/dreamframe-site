
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info */}
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
            <p className="text-gray-400 mb-6">
              Professional pressure washing services for residential and commercial properties. We deliver top-quality cleaning solutions with attention to detail.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/BCPressureWashing" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/bc.pressure.washing" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Our Services */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services/window-cleaning" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> Window Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/gutter-cleaning" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> Gutter Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/roof-cleaning" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> Roof Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/house-washing" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> House Washing
                </Link>
              </li>
              <li>
                <Link to="/services/driveway-cleaning" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> Driveway Cleaning
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> Testimonials
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> Packages
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-bc-red mr-3 flex-shrink-0 mt-1" size={18} />
                <span className="text-gray-400">15501 Marine Dr, White Rock, BC</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-bc-red mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-400">778 808 7620</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-bc-red mr-3 flex-shrink-0" size={18} />
                <span className="text-gray-400">bcpressurewashing.ca@gmail.com</span>
              </li>
              <li className="flex items-start">
                <Clock className="text-bc-red mr-3 flex-shrink-0 mt-1" size={18} />
                <div className="text-gray-400">
                  <div>Monday-Friday: 8AM - 6PM</div>
                  <div>Saturday: 9AM - 5PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* White Rock Based Business Image - Full Width */}
        <div className="mt-8 w-full">
          <img 
            src="/lovable-uploads/9044bb24-865d-4974-8d4a-8807df54ea8c.png" 
            alt="White Rock Based Business" 
            className="w-full rounded-md h-auto"
          />
        </div>

        <hr className="border-gray-800 my-8" />
        
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} BC Pressure Washing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
