
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Building2 } from 'lucide-react';
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
        className="bg-white border border-gray-200 shadow-lg rounded-md w-80 p-0 z-50"
        align="center"
        sideOffset={0}
      >
        {/* Residential Services Section */}
        <div className="p-2">
          <div className="text-xs font-semibold text-gray-500 uppercase px-4 py-2">Residential Services</div>
          
          {/* All residential services in a single column */}
          <div className="space-y-1">
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/house-soft-wash"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md"
              >
                <img src="/lovable-uploads/00d7b436-b2b5-4231-99d0-df1a09cb68ae.png" alt="House Soft Wash" className="mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">House Soft Wash</div>
                  <div className="text-sm text-gray-500">Gentle cleaning</div>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/window-cleaning"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md"
              >
                <img src="/lovable-uploads/0c6a9ec0-eaa2-4aa8-816e-d9cf88afac7d.png" alt="Window Cleaning" className="mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Window Cleaning</div>
                  <div className="text-sm text-gray-500">Streak-free results</div>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/gutter-cleaning"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md"
              >
                <img src="/lovable-uploads/af9b8f9c-8fc9-4a88-8768-17283cac5213.png" alt="Gutter Cleaning" className="mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Gutter Cleaning</div>
                  <div className="text-sm text-gray-500">Complete care</div>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/roof-cleaning"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md"
              >
                <img src="/lovable-uploads/e1b8e784-b329-4db1-b413-c3a9abdfee7d.png" alt="Roof Cleaning" className="mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Roof Cleaning</div>
                  <div className="text-sm text-gray-500">Safe removal</div>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/pressure-washing"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md"
              >
                <img src="/lovable-uploads/7e4e1197-6f16-44aa-bb6d-aa5eb19f6f8a.png" alt="Pressure Washing" className="mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Pressure Washing</div>
                  <div className="text-sm text-gray-500">Deep clean</div>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/driveway-cleaning"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md"
              >
                <img src="/lovable-uploads/4bc56646-a50c-4c86-aeeb-997bd1c1c579.png" alt="Driveway Cleaning" className="mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium">Driveway Cleaning</div>
                  <div className="text-sm text-gray-500">Remove stains</div>
                </div>
              </Link>
            </DropdownMenuItem>
          </div>
        </div>

        {/* Commercial Services Section */}
        <div className="border-t border-gray-100 p-2">
          <div className="text-xs font-semibold text-gray-500 uppercase px-4 py-2">Commercial Services</div>
          
          <DropdownMenuItem asChild className="p-0">
            <Link
              to="/services/commercial-window-cleaning"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md"
            >
              <img src="/lovable-uploads/f80b484b-5931-4960-9e9f-a3dfe308b905.png" alt="Commercial Services" className="mr-3 h-5 w-5 flex-shrink-0" />
              <div>
                <div className="font-medium">Commercial Services</div>
                <div className="text-sm text-gray-500">Professional building maintenance</div>
              </div>
            </Link>
          </DropdownMenuItem>
        </div>

        {/* Compare Services */}
        <div className="border-t border-gray-100 p-2">
          <DropdownMenuItem asChild className="p-0">
            <Link
              to="/compare-services"
              className="flex items-center justify-center px-4 py-3 text-bc-red hover:bg-gray-50 hover:text-red-700 transition-colors w-full rounded-md font-medium"
            >
              Compare Services
            </Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServicesDropdown;
