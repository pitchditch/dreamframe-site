
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Star, Facebook, Instagram, Youtube } from 'lucide-react';
import FooterWeatherService from './FooterWeatherService';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/1382a332-34e7-4830-bc43-d3dd1045dab9.png" 
              alt="BC Pressure Washing Logo" 
              className="h-16 w-auto"
            />
            <p className="text-gray-400 text-sm">
              Professional exterior cleaning services in White Rock, Surrey, and Metro Vancouver. 
              Family-owned and operated since 2020.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/bcpressurewashing" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/bc.pressure.washing" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@bc.pressure.washing" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Our Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Our Services</h3>
            <div className="space-y-2">
              <hr className="border-gray-700" />
              <Link to="/services/window-cleaning" className="block text-gray-400 hover:text-white transition-colors">
                → Window Cleaning
              </Link>
              <hr className="border-gray-700" />
              <Link to="/services/pressure-washing" className="block text-gray-400 hover:text-white transition-colors">
                → Pressure Washing
              </Link>
              <hr className="border-gray-700" />
              <Link to="/services/gutter-cleaning" className="block text-gray-400 hover:text-white transition-colors">
                → Gutter Cleaning
              </Link>
              <hr className="border-gray-700" />
              <Link to="/services/roof-cleaning" className="block text-gray-400 hover:text-white transition-colors">
                → Roof Cleaning
              </Link>
              <hr className="border-gray-700" />
              <Link to="/services/commercial-services" className="block text-gray-400 hover:text-white transition-colors">
                → Commercial Services
              </Link>
              <hr className="border-gray-700" />
              <Link to="/compare-prices" className="block text-gray-400 hover:text-white transition-colors">
                → Compare Services
              </Link>
              <hr className="border-gray-700" />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-bc-red flex-shrink-0" />
                <span className="text-gray-400">Marine Dr, White Rock, BC</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-bc-red flex-shrink-0" />
                <a href="tel:778-808-7620" className="text-gray-400 hover:text-white transition-colors">
                  778-808-7620
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-bc-red flex-shrink-0" />
                <a href="mailto:bcpressurewashing.ca@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  bcpressurewashing.ca@gmail.com
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span className="text-gray-400">5-Star Rated on Google</span>
              </div>
            </div>
          </div>

          {/* Weather & Service */}
          <FooterWeatherService />
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} BC Pressure Washing. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
