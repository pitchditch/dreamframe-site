
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { NavigationMenu } from '../ui/navigation-menu';
import NavLink from './NavLink';
import ServicesDropdown from './ServicesDropdown';
import { useState } from 'react';

interface NavbarDesktopProps {
  isOverVideo: boolean;
  isScrolled: boolean;
}

export const NavbarDesktop = ({ isOverVideo, isScrolled }: NavbarDesktopProps) => {
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  
  return (
    <div className="hidden lg:flex items-center justify-between flex-1">
      <NavigationMenu className="max-w-none w-full justify-end">
        <div className="flex items-center space-x-8">
          <NavLink 
            to="/" 
            isOverVideo={isOverVideo} 
            isScrolled={isScrolled}
          >
            Home
          </NavLink>
          
          <div 
            className="relative"
            onMouseEnter={() => setIsServicesDropdownOpen(true)}
            onMouseLeave={() => setIsServicesDropdownOpen(false)}
          >
            <NavLink 
              to="/services" 
              isOverVideo={isOverVideo} 
              isScrolled={isScrolled}
            >
              Services
            </NavLink>
            <ServicesDropdown 
              isOpen={isServicesDropdownOpen} 
              isOverVideo={isOverVideo} 
              isScrolled={isScrolled} 
            />
          </div>
          
          <NavLink 
            to="/equipment" 
            isOverVideo={isOverVideo} 
            isScrolled={isScrolled}
          >
            Equipment
          </NavLink>
          
          <NavLink 
            to="/about" 
            isOverVideo={isOverVideo} 
            isScrolled={isScrolled}
          >
            About
          </NavLink>
          
          <NavLink 
            to="/testimonials" 
            isOverVideo={isOverVideo} 
            isScrolled={isScrolled}
          >
            Reviews
          </NavLink>
          
          <NavLink 
            to="/contact" 
            isOverVideo={isOverVideo} 
            isScrolled={isScrolled}
          >
            Contact
          </NavLink>

          <a 
            href="tel:7788087620" 
            className={`flex items-center gap-2 font-medium transition-colors ${
              isScrolled 
                ? 'text-bc-red hover:text-red-700' 
                : isOverVideo 
                  ? 'text-white hover:text-gray-200' 
                  : 'text-bc-red hover:text-red-700'
            }`}
          >
            <Phone className="h-4 w-4" />
            778-808-7620
          </a>
        </div>
      </NavigationMenu>
    </div>
  );
};
