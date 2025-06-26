import React from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';

interface NavbarMobileProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`fixed top-0 right-0 w-64 h-full bg-gray-900 text-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* Close Button */}
      <div className="p-4 flex justify-end">
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white focus:outline-none">
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NavLink 
          to="/" 
          className="text-white hover:text-bc-red block px-3 py-2 text-base font-medium transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Home
        </NavLink>
        
        {/* Services Section */}
        <div className="px-3 py-2">
          <div className="text-gray-300 text-sm font-medium mb-2">Services</div>
          <div className="ml-4 space-y-1">
            <NavLink to="/services/window-cleaning" className="text-white hover:text-bc-red block py-1 text-sm transition-colors" onClick={() => setIsOpen(false)}>
              Window Cleaning
            </NavLink>
            <NavLink to="/services/pressure-washing" className="text-white hover:text-bc-red block py-1 text-sm transition-colors" onClick={() => setIsOpen(false)}>
              Pressure Washing
            </NavLink>
            <NavLink to="/services/gutter-cleaning" className="text-white hover:text-bc-red block py-1 text-sm transition-colors" onClick={() => setIsOpen(false)}>
              Gutter Cleaning
            </NavLink>
            <NavLink to="/services/roof-cleaning" className="text-white hover:text-bc-red block py-1 text-sm transition-colors" onClick={() => setIsOpen(false)}>
              Roof Cleaning
            </NavLink>
          </div>
        </div>
        
        <NavLink 
          to="/calculator" 
          className="text-white hover:text-bc-red block px-3 py-2 text-base font-medium transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Quote Calculator
        </NavLink>
        
        <NavLink 
          to="/invoices" 
          className="text-white hover:text-bc-red block px-3 py-2 text-base font-medium transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Invoices
        </NavLink>
        
        <NavLink 
          to="/about" 
          className="text-white hover:text-bc-red block px-3 py-2 text-base font-medium transition-colors"
          onClick={() => setIsOpen(false)}
        >
          About
        </NavLink>
        
        <NavLink 
          to="/contact" 
          className="text-white hover:text-bc-red block px-3 py-2 text-base font-medium transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </NavLink>
      </div>
    </div>
  );
};

export default NavbarMobile;
