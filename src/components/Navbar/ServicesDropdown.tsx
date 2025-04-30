
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServicesDropdownProps {
  isOverVideo: boolean;
}

export const ServicesDropdown = ({ isOverVideo }: ServicesDropdownProps) => {
  return (
    <div className="relative group">
      <button
        className={`flex items-center focus:outline-none relative transition-all duration-300 hover:scale-105 ${
          isOverVideo 
          ? 'text-white hover:text-bc-red hover:text-shadow-white text-shadow-sm' 
          : 'text-black hover:text-bc-red'
        } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-bc-red after:left-0 after:bottom-0 after:transition-all group-hover:after:w-full`}
        aria-expanded="false"
      >
        <span>Services</span>
        <ChevronDown size={16} className="ml-1" />
      </button>

      <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 z-50">
        <div className="py-2 px-1">
          <Link
            to="/services/pressure-washing"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <img 
              src="/lovable-uploads/9bd0cd9a-cedc-45fc-b124-a03f53d0f9bb.png" 
              alt="Pressure Washing" 
              className="w-6 h-6" 
            />
            <span>Pressure Washing</span>
          </Link>
          
          <Link
            to="/services/window-cleaning"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <img 
              src="/lovable-uploads/614f79f3-1890-4fbd-bbc7-192aeb274e44.png" 
              alt="Window Cleaning" 
              className="w-6 h-6" 
            />
            <span>Window Cleaning</span>
          </Link>
          
          <Link
            to="/services/roof-cleaning"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <img 
              src="/lovable-uploads/19ebc5d3-988d-4a33-bf2d-b5022458a2c2.png" 
              alt="Roof Cleaning" 
              className="w-6 h-6" 
            />
            <span>Roof Cleaning</span>
          </Link>
          
          <Link
            to="/services/gutter-cleaning"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <img 
              src="/lovable-uploads/a4898f2f-f181-4d38-bc4a-5ab83eac1507.png" 
              alt="Gutter Cleaning" 
              className="w-6 h-6" 
            />
            <span>Gutter Cleaning</span>
          </Link>
          
          <Link
            to="/services/post-construction-window-cleaning"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <img 
              src="/lovable-uploads/614f79f3-1890-4fbd-bbc7-192aeb274e44.png" 
              alt="Post-Construction Cleaning" 
              className="w-6 h-6" 
            />
            <span>Post-Construction Cleaning</span>
          </Link>
          
          <Link
            to="/services/commercial-pressure-washing"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <img 
              src="/lovable-uploads/9bd0cd9a-cedc-45fc-b124-a03f53d0f9bb.png" 
              alt="Commercial Pressure Washing" 
              className="w-6 h-6" 
            />
            <span>Commercial Pressure Washing</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesDropdown;
