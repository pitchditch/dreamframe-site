
import React from 'react';
import { NavLink } from 'react-router-dom';
import ServicesDropdown from './ServicesDropdown';
import { Button } from '../ui/button';
import { Phone } from 'lucide-react';

interface NavbarDesktopProps {
  isMenuOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavbarDesktop: React.FC<NavbarDesktopProps> = ({ setIsOpen }) => {
  return (
    <div className="hidden md:flex items-center justify-between w-full">
      <div className="flex items-center">
        <NavLink to="/" className="flex items-center text-white hover:text-bc-red transition-colors mr-8">
          <img src="/images/bc-pressure-washing-logo.png" alt="BC Pressure Washing Logo" className="h-10 mr-2" />
          <span className="font-bold text-xl">BC Pressure Washing</span>
        </NavLink>
      </div>

      <div className="hidden md:flex items-center space-x-8">
        <NavLink to="/" className="text-white hover:text-bc-red transition-colors">
          Home
        </NavLink>
        <ServicesDropdown />
        <NavLink to="/calculator" className="text-white hover:text-bc-red transition-colors">
          Quote Calculator
        </NavLink>
        <NavLink to="/invoices" className="text-white hover:text-bc-red transition-colors">
          Invoices
        </NavLink>
        <NavLink to="/contact" className="text-white hover:text-bc-red transition-colors">
          Contact
        </NavLink>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <Button variant="outline" asChild>
          <NavLink to="tel:7788087620" className="flex items-center text-white hover:text-bc-red transition-colors">
            <Phone className="mr-2" size={16} />
            (778) 808-7620
          </NavLink>
        </Button>
      </div>
    </div>
  );
};

export default NavbarDesktop;
