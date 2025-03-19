
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  return (
    <>
      {isHomepage && (
        <div className="bg-black py-12 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-white text-center text-3xl font-bold mb-8">Meet Our Team</h2>
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <img 
                  src="/lovable-uploads/9d522a8f-7afd-455e-a842-1ac662af3305.png" 
                  alt="BC Pressure Washing Team Members" 
                  className="w-full h-auto rounded-lg" 
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      <footer className="bg-black text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1">
              <div className="mb-4">
                <Link to="/">
                  <img 
                    src="/lovable-uploads/105fbc2d-b1cc-452e-bf1d-636a23a1bbe8.png" 
                    alt="BC Pressure Washing Logo" 
                    className="h-24 md:h-28 mb-4 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  />
                </Link>
              </div>
              <p className="text-gray-400 mb-6">
                Professional pressure washing services for residential and commercial properties. We deliver top-quality cleaning solutions with attention to detail.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
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
                  <span className="text-gray-400">Langley, BC, Canada</span>
                </li>
                <li className="flex items-center">
                  <Phone className="text-bc-red mr-3 flex-shrink-0" size={18} />
                  <span className="text-gray-400">778 808 7620</span>
                </li>
                <li className="flex items-center">
                  <Mail className="text-bc-red mr-3 flex-shrink-0" size={18} />
                  <span className="text-gray-400">info@bcpressurewashing.ca</span>
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

          <hr className="border-gray-800 my-8" />
          
          <div className="text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} BC Pressure Washing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
