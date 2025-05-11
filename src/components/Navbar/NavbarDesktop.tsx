
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import ButtonWithShadcnButton from './ButtonWithShadcnButton';

interface NavbarDesktopProps {
  isOverVideo: boolean;
}

export const NavbarDesktop: React.FC<NavbarDesktopProps> = ({ isOverVideo }) => {
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isLocationsHovered, setIsLocationsHovered] = useState(false);

  return (
    <div className="hidden md:flex items-center gap-2">
      <nav className={`${isOverVideo ? 'text-white' : 'text-gray-800'} flex items-center gap-1`}>
        <div className="group relative">
          <button
            className={`flex items-center gap-1 px-3 py-2 ${
              isOverVideo
                ? 'hover:bg-white/10 hover:text-white'
                : 'hover:bg-gray-100 hover:text-gray-900'
            } rounded-lg`}
            onMouseEnter={() => setIsServicesHovered(true)}
            onMouseLeave={() => setIsServicesHovered(false)}
          >
            Services
            <ChevronDown size={16} className={`transition-transform ${isServicesHovered ? 'rotate-180' : ''}`} />
          </button>

          <div
            className={`absolute left-0 top-full z-50 min-w-[220px] rounded-lg bg-white/95 shadow-lg backdrop-blur-sm p-1 transition-opacity duration-300 ${
              isServicesHovered ? 'opacity-100' : 'opacity-0 invisible'
            }`}
            onMouseEnter={() => setIsServicesHovered(true)}
            onMouseLeave={() => setIsServicesHovered(false)}
          >
            <Link
              to="/services"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              All Services
            </Link>
            
            <Link
              to="/services/window-cleaning"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              Window Cleaning
            </Link>
            <Link
              to="/services/pressure-washing"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              Pressure Washing
            </Link>
            <Link
              to="/services/gutter-cleaning"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              Gutter Cleaning
            </Link>
            <Link
              to="/services/roof-cleaning"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              Roof Cleaning
            </Link>
            <Link
              to="/services/commercial-window-cleaning"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              Commercial Window Cleaning
            </Link>
            <Link
              to="/services/commercial-pressure-washing"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              Commercial Pressure Washing
            </Link>
            {/* Removed Post Construction Window Cleaning as requested */}
            <Link
              to="/express-cleaning"
              className="block px-4 py-2 text-bc-red font-bold hover:bg-gray-100 rounded-md"
            >
              Express Cleaning
            </Link>
          </div>
        </div>

        <div className="group relative">
          <button
            className={`flex items-center gap-1 px-3 py-2 ${
              isOverVideo
                ? 'hover:bg-white/10 hover:text-white'
                : 'hover:bg-gray-100 hover:text-gray-900'
            } rounded-lg`}
            onMouseEnter={() => setIsLocationsHovered(true)}
            onMouseLeave={() => setIsLocationsHovered(false)}
          >
            Locations
            <ChevronDown size={16} className={`transition-transform ${isLocationsHovered ? 'rotate-180' : ''}`} />
          </button>

          <div
            className={`absolute left-0 top-full z-50 min-w-[220px] rounded-lg bg-white/95 shadow-lg backdrop-blur-sm p-1 transition-opacity duration-300 ${
              isLocationsHovered ? 'opacity-100' : 'opacity-0 invisible'
            }`}
            onMouseEnter={() => setIsLocationsHovered(true)}
            onMouseLeave={() => setIsLocationsHovered(false)}
          >
            <Link
              to="/locations/white-rock-bc"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              White Rock
            </Link>
            <Link
              to="/locations/vancouver-bc"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
            >
              Vancouver
            </Link>
          </div>
        </div>

        <Link
          to="/why-us"
          className={`block px-3 py-2 ${
            isOverVideo ? 'hover:bg-white/10' : 'hover:bg-gray-100'
          } rounded-lg`}
        >
          Why Us
        </Link>

        <Link
          to="/equipment"
          className={`block px-3 py-2 ${
            isOverVideo ? 'hover:bg-white/10' : 'hover:bg-gray-100'
          } rounded-lg`}
        >
          Equipment
        </Link>

        <Link
          to="/testimonials"
          className={`block px-3 py-2 ${
            isOverVideo ? 'hover:bg-white/10' : 'hover:bg-gray-100'
          } rounded-lg`}
        >
          Testimonials
        </Link>

        <Link
          to="/blog"
          className={`block px-3 py-2 ${
            isOverVideo ? 'hover:bg-white/10' : 'hover:bg-gray-100'
          } rounded-lg`}
        >
          Blog
        </Link>
      </nav>

      <ButtonWithShadcnButton 
        text="Contact"
        to="/contact"
        isOverVideo={isOverVideo}
      />
    </div>
  );
};
