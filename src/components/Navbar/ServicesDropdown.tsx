
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
          
          {/* All residential services in a 2-column grid */}
          <div className="grid grid-cols-2 gap-1">
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/window-cleaning"
                className="flex flex-col items-center px-2 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md text-center"
              >
                <img src="/lovable-uploads/7a0d94ff-3dea-4fa6-afe4-a8f49e0e220b.png" alt="Window Cleaning" className="mb-2 h-8 w-8 flex-shrink-0" />
                <div>
                  <div className="font-medium text-xs">Window Cleaning</div>
                  <div className="text-xs text-gray-500">Streak-free</div>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/gutter-cleaning"
                className="flex flex-col items-center px-2 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md text-center"
              >
                <img src="/lovable-uploads/f88634ea-9711-4868-962f-e27e65866f0d.png" alt="Gutter Cleaning" className="mb-2 h-8 w-8 flex-shrink-0" />
                <div>
                  <div className="font-medium text-xs">Gutter Cleaning</div>
                  <div className="text-xs text-gray-500">Complete care</div>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/house-soft-wash"
                className="flex flex-col items-center px-2 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md text-center"
              >
                <img src="/lovable-uploads/06564a59-a10e-42cd-94d4-da628dd17fa6.png" alt="House Soft Wash" className="mb-2 h-8 w-8 flex-shrink-0" />
                <div>
                  <div className="font-medium text-xs">House Soft Wash</div>
                  <div className="text-xs text-gray-500">Gentle cleaning</div>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/roof-cleaning"
                className="flex flex-col items-center px-2 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md text-center"
              >
                <img src="/lovable-uploads/ea700c91-f17c-4daa-bd2f-ef22c893d921.png" alt="Roof Cleaning" className="mb-2 h-8 w-8 flex-shrink-0" />
                <div>
                  <div className="font-medium text-xs">Roof Cleaning</div>
                  <div className="text-xs text-gray-500">Safe removal</div>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="p-0 col-span-2">
              <Link
                to="/services/driveway-cleaning"
                className="flex flex-col items-center px-2 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md text-center"
              >
                <img src="/lovable-uploads/10a21fe9-0eca-443f-b4f9-44ace5b2071f.png" alt="Driveway Cleaning" className="mb-2 h-8 w-8 flex-shrink-0" />
                <div>
                  <div className="font-medium text-xs">Driveway Cleaning</div>
                  <div className="text-xs text-gray-500">Remove stains</div>
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
              <img src="/lovable-uploads/5b1d271e-15e2-4bf4-87ce-4ad9e9aadc75.png" alt="Commercial Services" className="mr-3 h-5 w-5 flex-shrink-0" />
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
