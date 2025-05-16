
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScroll } from '../hooks/use-scroll';
import { useTranslation } from '@/hooks/use-translation';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isScrolled } = useScroll();
  const location = useLocation();
  const { language } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close the menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close the menu when the route changes
  useEffect(() => {
    closeMenu();
  }, [location]);

  const navbarClass = isScrolled ? 'bg-white text-gray-800 shadow-md' : 'bg-transparent text-white';
  const linkClass = isScrolled ? 'hover:text-bc-red' : 'hover:text-gray-200';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarClass}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center font-bold text-xl">
          <img src="/logo.png" alt="BC Pressure Washing Logo" className="h-8 mr-2" />
          BC Pressure Washing
        </Link>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className={`lg:flex items-center ${isMenuOpen ? 'block absolute top-full left-0 w-full bg-white text-gray-800 p-4 shadow-md' : 'hidden'}`}>
          <ul className="lg:flex lg:items-center lg:space-x-6">
            <li><Link to="/" className={`block py-2 ${linkClass}`}>Home</Link></li>
            <li><Link to="/services" className={`block py-2 ${linkClass}`}>Services</Link></li>
            <li><Link to="/about" className={`block py-2 ${linkClass}`}>About</Link></li>
            <li><Link to="/contact" className={`block py-2 ${linkClass}`}>Contact</Link></li>
            <li><Link to="/faq" className={`block py-2 ${linkClass}`}>FAQ</Link></li>
            <li><Link to="/why-choose-us" className={`block py-2 ${linkClass}`}>Why Choose Us</Link></li>
            <li><Link to="/locations/white-rock" className={`block py-2 ${linkClass}`}>White Rock</Link></li>
          </ul>

          <div className="lg:ml-4 flex items-center mt-4 lg:mt-0">
            <LanguageSwitcher />
            <Button asChild className="ml-4">
              <Link to="/contact">Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
