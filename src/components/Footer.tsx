
import React from 'react';
import { MapPin, Phone, Mail, Star, Award, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div>
            <img 
              src="/lovable-uploads/9773afa1-26cf-4788-ade6-2da27716dd3d.png" 
              alt="BC Pressure Washing Logo" 
              className="h-16 w-auto mb-4"
            />
            <h3 className="text-xl font-bold mb-4">BC Pressure Washing</h3>
            <p className="text-gray-300 mb-4">
              Professional window cleaning and pressure washing services throughout Surrey, White Rock, and Metro Vancouver.
            </p>
            <div className="flex space-x-4">
              <a href="https://g.page/r/CbeicZxdYHsKEAI/review" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <img src="/lovable-uploads/c7a06e2a-86f1-4622-81b0-513491105641.png" alt="Google" className="h-8 w-8" />
              </a>
              <a href="https://www.yelp.ca/writeareview/biz/BKJYWQSYBxvKcTA5hkHHsg" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <img src="/lovable-uploads/e8c22c20-e153-4bde-aeb8-f0ae12a4eae0.png" alt="Yelp" className="h-8 w-8" />
              </a>
              <a href="https://www.bbb.org/ca/bc/white-rock/profile/window-cleaning/bc-pressure-washing-0037-2263134/customer-reviews" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <img src="/lovable-uploads/8f646c66-5a09-4335-a82d-e15a1d86a4c4.png" alt="BBB" className="h-8 w-8" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/services/window-cleaning" className="hover:text-white transition-colors">Window Cleaning</a></li>
              <li><a href="/services/pressure-washing" className="hover:text-white transition-colors">House Washing</a></li>
              <li><a href="/services/gutter-cleaning" className="hover:text-white transition-colors">Gutter Cleaning</a></li>
              <li><a href="/services/roof-cleaning" className="hover:text-white transition-colors">Roof Cleaning</a></li>
              <li><a href="/services/commercial-window-cleaning" className="hover:text-white transition-colors">Commercial Services</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">View All Services</a></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Surrey, BC</li>
              <li>White Rock, BC</li>
              <li>Langley, BC</li>
              <li>Richmond, BC</li>
              <li>Burnaby, BC</li>
              <li>Delta, BC</li>
              <li>Vancouver, BC</li>
              <li>Coquitlam, BC</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-bc-red" />
                <a href="tel:7788087620" className="hover:text-white transition-colors">(778) 808-7620</a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-bc-red" />
                <a href="mailto:info@bcpressurewashing.ca" className="hover:text-white transition-colors">info@bcpressurewashing.ca</a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-bc-red mt-1" />
                <span>Serving Surrey, White Rock & Metro Vancouver</span>
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-6">
              <h5 className="font-semibold mb-2">Certifications</h5>
              <div className="flex space-x-2 text-sm text-gray-300">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  <span>Insured</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  <span>Licensed</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  <span>5-Star Rated</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 BC Pressure Washing. All rights reserved.
            </div>
            <div className="mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/9773afa1-26cf-4788-ade6-2da27716dd3d.png" 
                alt="BC Pressure Washing Footer Logo" 
                className="h-12 w-auto"
              />
            </div>
            <div className="flex space-x-6 text-gray-300 text-sm">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
