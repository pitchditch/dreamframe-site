
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Droplets, Zap, Shield, Building2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ServicesDropdownProps {
  isOverVideo: boolean;
}

const ServicesDropdown = ({ isOverVideo }: ServicesDropdownProps) => {
  const textColor = isOverVideo ? 'text-white' : 'text-gray-700';
  const hoverColor = isOverVideo ? 'hover:text-bc-red' : 'hover:text-bc-red';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`flex items-center ${textColor} ${hoverColor} transition-all duration-200 hover:scale-110 font-medium group`}>
        Services <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="bg-white border border-gray-200 shadow-lg rounded-md w-80"
        align="center"
        sideOffset={0}
      >
        <DropdownMenuItem asChild>
          <Link
            to="/services/window-cleaning"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full"
          >
            <Droplets className="mr-3 h-5 w-5 text-blue-500" />
            <div>
              <div className="font-medium">Window Cleaning</div>
              <div className="text-sm text-gray-500">Streak-free residential & commercial</div>
            </div>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link
            to="/services/pressure-washing"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full"
          >
            <img src="/lovable-uploads/7e4e1197-6f16-44aa-bb6d-aa5eb19f6f8a.png" alt="House Washing" className="mr-3 h-5 w-5" />
            <div>
              <div className="font-medium">Pressure Washing</div>
              <div className="text-sm text-gray-500">Driveways, siding, decks & more</div>
            </div>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link
            to="/services/gutter-cleaning"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full"
          >
            <Shield className="mr-3 h-5 w-5 text-green-500" />
            <div>
              <div className="font-medium">Gutter Cleaning</div>
              <div className="text-sm text-gray-500">Complete debris removal & flushing</div>
            </div>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link
            to="/services/roof-cleaning"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full"
          >
            <Zap className="mr-3 h-5 w-5 text-purple-500" />
            <div>
              <div className="font-medium">Roof Cleaning</div>
              <div className="text-sm text-gray-500">Safe moss & algae removal</div>
            </div>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link
            to="/services/commercial-window-cleaning"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full"
          >
            <Building2 className="mr-3 h-5 w-5 text-gray-500" />
            <div>
              <div className="font-medium">Commercial Services</div>
              <div className="text-sm text-gray-500">Professional building maintenance</div>
            </div>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServicesDropdown;
