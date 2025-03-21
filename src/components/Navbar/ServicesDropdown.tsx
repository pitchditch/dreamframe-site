
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface ServicesDropdownProps {
  isOverVideo: boolean;
  isServicesMenuOpen: boolean;
  setIsServicesMenuOpen: (isOpen: boolean) => void;
}

export const ServicesDropdown = ({ 
  isOverVideo, 
  isServicesMenuOpen, 
  setIsServicesMenuOpen 
}: ServicesDropdownProps) => {
  const location = useLocation();
  const isActive = location.pathname === '/services' || location.pathname.includes('/services/');

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsServicesMenuOpen(true)}
      onMouseLeave={() => setIsServicesMenuOpen(false)}
    >
      <button 
        className={`flex items-center transition-all duration-200 px-3 py-1 rounded-md hover:scale-110 ${
          isOverVideo 
          ? 'text-white hover:text-bc-red hover:bg-white/90' 
          : `text-gray-700 hover:text-bc-red hover:bg-gray-100 ${isActive ? 'font-medium text-bc-red' : ''}`
        }`}
        onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
        aria-expanded={isServicesMenuOpen}
      >
        Services <ChevronDown className="ml-1 h-4 w-4" />
      </button>

      <div 
        className={`service-menu absolute z-50 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden transition-all duration-200 ${
          isServicesMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="py-2">
          <div className="px-4 py-2 text-sm font-medium text-gray-500">Residential</div>
          <Link to="/services/window-cleaning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red transition-colors">Window Cleaning</Link>
          <Link to="/services/gutter-cleaning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red transition-colors">Gutter Cleaning</Link>
          <Link to="/services/house-washing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red transition-colors">House Washing</Link>
          <Link to="/services/roof-cleaning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red transition-colors">Roof Cleaning</Link>
          
          <div className="px-4 py-2 text-sm font-medium text-gray-500 mt-2">Commercial</div>
          <Link to="/services/commercial-window-cleaning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red transition-colors">Commercial Window Cleaning</Link>
          <Link to="/services/storefront-window-cleaning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red transition-colors">Storefront Window Cleaning</Link>
          <Link to="/services/parking-lot-cleaning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red transition-colors">Parking Lot Cleaning</Link>
        </div>
      </div>
    </div>
  );
};
