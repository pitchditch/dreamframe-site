
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Star, Calendar } from 'lucide-react';
import FooterContactForm from './FooterContactForm';
import FooterWeatherService from './FooterWeatherService';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/9773afa1-26cf-4788-ade6-2da27716dd3d.png" 
                alt="BC Pressure Washing Logo" 
                className="w-8 h-8"
              />
              <h3 className="text-xl font-bold">BC Pressure Washing</h3>
            </div>
            <p className="text-gray-400">
              Professional pressure washing, window cleaning, and exterior maintenance services across Metro Vancouver.
            </p>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm text-gray-400 ml-2">5.0 Stars on Google</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/services/window-cleaning" className="hover:text-white transition-colors">Window Cleaning</Link></li>
              <li><Link to="/services/pressure-washing" className="hover:text-white transition-colors">Pressure Washing</Link></li>
              <li><Link to="/services/gutter-cleaning" className="hover:text-white transition-colors">Gutter Cleaning</Link></li>
              <li><Link to="/services/roof-cleaning" className="hover:text-white transition-colors">Roof Cleaning</Link></li>
              <li><Link to="/services/commercial-window-cleaning" className="hover:text-white transition-colors">Commercial Services</Link></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Service Areas</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/locations/surrey" className="hover:text-white transition-colors">Surrey</Link></li>
              <li><Link to="/locations/white-rock" className="hover:text-white transition-colors">White Rock</Link></li>
              <li><Link to="/locations/langley" className="hover:text-white transition-colors">Langley</Link></li>
              <li><Link to="/locations/vancouver" className="hover:text-white transition-colors">Vancouver</Link></li>
              <li><Link to="/locations/richmond" className="hover:text-white transition-colors">Richmond</Link></li>
              <li><Link to="/locations/burnaby" className="hover:text-white transition-colors">Burnaby</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-bc-red flex-shrink-0" />
                <a href="tel:7788087620" className="text-gray-400 hover:text-white transition-colors">
                  (778) 808-7620
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-bc-red flex-shrink-0" />
                <a href="mailto:hello@bcpressurewashing.ca" className="text-gray-400 hover:text-white transition-colors">
                  hello@bcpressurewashing.ca
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-bc-red flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  Serving Metro Vancouver<br />
                  Surrey, BC, Canada
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-bc-red flex-shrink-0" />
                <span className="text-gray-400">
                  7 Days a Week<br />
                  8 AM - 6 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <FooterContactForm />
        </div>

        {/* Weather Service Section */}
        <div className="mt-8">
          <FooterWeatherService />
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 BC Pressure Washing. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
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
