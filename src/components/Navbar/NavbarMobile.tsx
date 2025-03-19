
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface NavbarMobileProps {
  isMenuOpen: boolean;
  isServicesMenuOpen: boolean; 
  setIsServicesMenuOpen: (isOpen: boolean) => void;
}

export const NavbarMobile = ({ 
  isMenuOpen,
  isServicesMenuOpen,
  setIsServicesMenuOpen
}: NavbarMobileProps) => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const isActive = (path: string) => location.pathname === path;
  
  return (
    isMenuOpen && (
      <div className={`md:hidden ${isHomepage && !document.body.classList.contains('scrolled') ? 'bg-black/70 backdrop-blur-md' : 'bg-white'} shadow-lg animate-slide-down`}>
        <div className="px-4 pt-3 pb-4 space-y-2">
          <Link 
            to="/" 
            className={`block px-3 py-2 rounded-md text-base ${
              isActive('/') 
                ? 'bg-bc-red text-white' 
                : isHomepage && !document.body.classList.contains('scrolled')
                  ? 'text-white hover:bg-white/10'
                  : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Home
          </Link>
          <button 
            className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-base ${
              isActive('/services') || location.pathname.includes('/services/') 
                ? 'bg-bc-red text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
          >
            <span>Services</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isServicesMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isServicesMenuOpen && (
            <div className="pl-4 mt-1 mb-1">
              <div className="py-1 text-sm font-medium text-gray-500">Residential</div>
              <Link to="/services/window-cleaning" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Window Cleaning</Link>
              <Link to="/services/gutter-cleaning" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Gutter Cleaning</Link>
              <Link to="/services/house-washing" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md">House Washing</Link>
              <Link to="/services/roof-cleaning" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Roof Cleaning</Link>
              
              <div className="py-1 text-sm font-medium text-gray-500 mt-1">Commercial</div>
              <Link to="/services/commercial-window-cleaning" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Commercial Window Cleaning</Link>
              <Link to="/services/parking-lot-cleaning" className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Parking Lot Cleaning</Link>
            </div>
          )}
          
          <Link 
            to="/about" 
            className={`block px-3 py-2 rounded-md text-base ${
              isActive('/about') ? 'bg-bc-red text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            About
          </Link>
          <Link 
            to="/testimonials" 
            className={`block px-3 py-2 rounded-md text-base ${
              isActive('/testimonials') ? 'bg-bc-red text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Testimonials
          </Link>
          <Link 
            to="/contact" 
            className={`block px-3 py-2 rounded-md text-base ${
              isActive('/contact') ? 'bg-bc-red text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Contact
          </Link>
          <Link 
            to="/contact" 
            className="block px-3 py-3"
          >
            <button className="btn-primary w-full">Get a Quote</button>
          </Link>
        </div>
      </div>
    )
  );
};
