
import React from 'react';
import { NavLink } from 'react-router-dom';
import ServicesDropdown from './ServicesDropdown';
import { Button } from '../ui/button';
import { Phone } from 'lucide-react';

interface NavbarDesktopProps {
  isMenuOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isOverVideo: boolean;
}

const NavbarDesktop: React.FC<NavbarDesktopProps> = ({ setIsOpen, isOverVideo }) => {
  const textColor = isOverVideo ? 'text-white' : 'text-gray-700';
  const hoverColor = isOverVideo ? 'hover:text-bc-red' : 'hover:text-bc-red';

  return (
    <div className="hidden md:flex items-center justify-between w-full">
      <div className="flex items-center">
        <NavLink to="/" className={`flex items-center ${textColor} ${hoverColor} transition-colors mr-8`}>
          <img src="/images/bc-pressure-washing-logo.png" alt="BC Pressure Washing Logo" className="h-10 mr-2" />
          <span className="font-bold text-xl">BC Pressure Washing</span>
        </NavLink>
      </div>

      <div className="hidden md:flex items-center space-x-8">
        <NavLink to="/" className={`${textColor} ${hoverColor} transition-colors`}>
          Home
        </NavLink>
        <ServicesDropdown isOverVideo={isOverVideo} />
        <NavLink to="/calculator" className={`${textColor} ${hoverColor} transition-colors`}>
          Quote Calculator
        </NavLink>
        <NavLink to="/invoices" className={`${textColor} ${hoverColor} transition-colors`}>
          Invoices
        </NavLink>
        <NavLink to="/about" className={`${textColor} ${hoverColor} transition-colors`}>
          About
        </NavLink>
        <NavLink to="/contact" className={`${textColor} ${hoverColor} transition-colors`}>
          Contact
        </NavLink>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <Button variant="outline" asChild>
          <NavLink to="tel:7788087620" className={`flex items-center ${textColor} ${hoverColor} transition-colors`}>
            <Phone className="mr-2" size={16} />
            (778) 808-7620
          </NavLink>
        </Button>
      </div>
    </div>
  );
};

export default NavbarDesktop;
