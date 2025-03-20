
import { Link } from 'react-router-dom';
import { NavLink } from './NavLink';
import { ServicesDropdown } from './ServicesDropdown';

interface NavbarDesktopProps {
  isOverVideo: boolean;
  isServicesMenuOpen: boolean;
  setIsServicesMenuOpen: (isOpen: boolean) => void;
}

export const NavbarDesktop = ({
  isOverVideo,
  isServicesMenuOpen, 
  setIsServicesMenuOpen
}: NavbarDesktopProps) => {
  return (
    <>
      <nav className="hidden md:flex items-center space-x-8">
        <NavLink to="/" isOverVideo={isOverVideo}>
          Home
        </NavLink>
        <ServicesDropdown 
          isOverVideo={isOverVideo} 
          isServicesMenuOpen={isServicesMenuOpen}
          setIsServicesMenuOpen={setIsServicesMenuOpen}
        />
        <NavLink to="/about" isOverVideo={isOverVideo}>
          About
        </NavLink>
        <NavLink to="/testimonials" isOverVideo={isOverVideo}>
          Testimonials
        </NavLink>
        <NavLink to="/contact" isOverVideo={isOverVideo}>
          Contact
        </NavLink>
        <NavLink to="/calculator" isOverVideo={isOverVideo}>
          Price Calculator
        </NavLink>
      </nav>
      
      <Link to="/contact" className="hidden md:block">
        <button className="btn-primary">Get a Quote</button>
      </Link>
    </>
  );
};
