
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface NavbarMobileProps {
  isMenuOpen: boolean;
  isServicesMenuOpen: boolean;
  setIsServicesMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarMobile: React.FC<NavbarMobileProps> = ({
  isMenuOpen,
  isServicesMenuOpen,
  setIsServicesMenuOpen
}) => {
  const toggleServicesMenu = () => {
    setIsServicesMenuOpen(!isServicesMenuOpen);
  };

  if (!isMenuOpen) return null;

  return (
    <div className="absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-30 border-t md:hidden overflow-auto max-h-[80vh]">
      <div className="container mx-auto px-4 py-2">
        {isServicesMenuOpen ? (
          <>
            <div className="border-b py-2">
              <button
                onClick={toggleServicesMenu}
                className="flex items-center gap-2 text-gray-800 font-medium"
              >
                <ChevronRight size={20} />
                Back to Menu
              </button>
            </div>
            <div className="py-2 flex flex-col gap-1">
              <Link
                to="/services"
                className="block px-3 py-3 text-gray-800 hover:bg-gray-100 rounded-md"
              >
                All Services
              </Link>
              <Link
                to="/services/window-cleaning"
                className="block px-3 py-3 text-gray-800 hover:bg-gray-100 rounded-md"
              >
                Window Cleaning
              </Link>
              <Link
                to="/services/pressure-washing"
                className="block px-3 py-3 text-gray-800 hover:bg-gray-100 rounded-md"
              >
                Pressure Washing
              </Link>
              <Link
                to="/services/gutter-cleaning"
                className="block px-3 py-3 text-gray-800 hover:bg-gray-100 rounded-md"
              >
                Gutter Cleaning
              </Link>
              <Link
                to="/services/roof-cleaning"
                className="block px-3 py-3 text-gray-800 hover:bg-gray-100 rounded-md"
              >
                Roof Cleaning
              </Link>
              <Link
                to="/services/commercial-window-cleaning"
                className="block px-3 py-3 text-gray-800 hover:bg-gray-100 rounded-md"
              >
                Commercial Window Cleaning
              </Link>
              <Link
                to="/services/commercial-pressure-washing"
                className="block px-3 py-3 text-gray-800 hover:bg-gray-100 rounded-md"
              >
                Commercial Pressure Washing
              </Link>
              {/* Removed Post Construction Window Cleaning as requested */}
              <Link
                to="/express-cleaning"
                className="block px-3 py-3 text-bc-red font-bold hover:bg-gray-100 rounded-md"
              >
                Express Cleaning
              </Link>
            </div>
          </>
        ) : (
          <div className="py-2 flex flex-col gap-1">
            <button
              onClick={toggleServicesMenu}
              className="flex justify-between items-center w-full px-3 py-3 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              Services
              <ChevronDown size={20} />
            </button>
            <Link
              to="/why-us"
              className="block px-3 py-3 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              Why Us
            </Link>
            <Link
              to="/equipment"
              className="block px-3 py-3 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              Equipment
            </Link>
            <Link
              to="/testimonials"
              className="block px-3 py-3 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              Testimonials
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-3 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              Blog
            </Link>
            <div className="pt-2 border-t">
              <Link
                to="/locations/white-rock-bc"
                className="block px-3 py-3 text-gray-800 hover:bg-gray-100 rounded-md"
              >
                White Rock
              </Link>
              <Link
                to="/locations/vancouver-bc"
                className="block px-3 py-3 text-gray-800 hover:bg-gray-100 rounded-md"
              >
                Vancouver
              </Link>
            </div>
            <div className="pt-2 pb-2 border-t">
              <Link
                to="/contact"
                className="block w-full text-center px-3 py-3 bg-bc-red text-white rounded-md font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
