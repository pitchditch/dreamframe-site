
import React from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';

interface NavbarMobileProps {
  isMenuOpen: boolean;
  isServicesMenuOpen: boolean;
  setIsServicesMenuOpen: (open: boolean) => void;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({ 
  isMenuOpen, 
  isServicesMenuOpen, 
  setIsServicesMenuOpen 
}) => {
  return (
    <div className={`fixed top-0 right-0 w-64 h-full bg-gray-900 text-white shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* Navigation Links */}
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NavLink 
          to="/" 
          className="text-white hover:text-bc-red block px-3 py-2 text-base font-medium transition-colors"
        >
          Home
        </NavLink>
        
        {/* Services Section */}
        <div className="px-3 py-2">
          <div className="text-gray-300 text-sm font-medium mb-2">Services</div>
          <div className="ml-4 space-y-1">
            <NavLink to="/services/window-cleaning" className="text-white hover:text-bc-red block py-1 text-sm transition-colors">
              Window Cleaning
            </NavLink>
            <NavLink to="/services/pressure-washing" className="text-white hover:text-bc-red block py-1 text-sm transition-colors">
              Pressure Washing
            </NavLink>
            <NavLink to="/services/gutter-cleaning" className="text-white hover:text-bc-red block py-1 text-sm transition-colors">
              Gutter Cleaning
            </NavLink>
            <NavLink to="/services/roof-cleaning" className="text-white hover:text-bc-red block py-1 text-sm transition-colors">
              Roof Cleaning
            </NavLink>
          </div>
        </div>
        
        <NavLink 
          to="/calculator" 
          className="text-white hover:text-bc-red block px-3 py-2 text-base font-medium transition-colors"
        >
          Quote Calculator
        </NavLink>
        
        <NavLink 
          to="/invoices" 
          className="text-white hover:text-bc-red block px-3 py-2 text-base font-medium transition-colors"
        >
          Invoices
        </NavLink>
        
        <NavLink 
          to="/about" 
          className="text-white hover:text-bc-red block px-3 py-2 text-base font-medium transition-colors"
        >
          About
        </NavLink>
        
        <NavLink 
          to="/contact" 
          className="text-white hover:text-bc-red block px-3 py-2 text-base font-medium transition-colors"
        >
          Contact
        </NavLink>
      </div>
    </div>
  );
};

export default NavbarMobile;
