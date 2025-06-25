
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
          <div className="text-sm font-semibold text-gray-500 uppercase px-4 py-2">Residential Services</div>
          
          {/* All residential services in a 2-column grid */}
          <div className="grid grid-cols-2 gap-1">
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/window-cleaning"
                className="flex flex-col items-center px-2 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md text-center"
              >
                <img src="/lovable-uploads/165b02c3-f25e-42d7-aa8f-7cf0a7ed27a9.png" alt="Window Cleaning" className="mb-2 h-8 w-8 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Window Cleaning</div>
                  <div className="text-xs text-gray-500">Streak-free</div>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/gutter-cleaning"
                className="flex flex-col items-center px-2 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md text-center"
              >
                <img src="/lovable-uploads/4c194a64-57a3-4315-baab-181509b591a1.png" alt="Gutter Cleaning" className="mb-2 h-8 w-8 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Gutter Cleaning</div>
                  <div className="text-xs text-gray-500">Complete care</div>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/house-soft-wash"
                className="flex flex-col items-center px-2 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md text-center"
              >
                <img src="/lovable-uploads/bed5edc5-3ddc-443c-b591-b46a2d863422.png" alt="House Soft Wash" className="mb-2 h-8 w-8 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">House Soft Wash</div>
                  <div className="text-xs text-gray-500">Gentle cleaning</div>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/roof-cleaning"
                className="flex flex-col items-center px-2 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md text-center"
              >
                <img src="/lovable-uploads/c3789024-080d-4399-b348-ac2d5a1b744f.png" alt="Roof Cleaning" className="mb-2 h-8 w-8 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Roof Cleaning</div>
                  <div className="text-xs text-gray-500">Safe removal</div>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/pressure-washing"
                className="flex flex-col items-center px-2 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md text-center"
              >
                <img src="/lovable-uploads/b5967047-dddc-47e1-a23c-dd4a5feb9125.png" alt="Pressure Washing" className="mb-2 h-8 w-8 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Pressure Washing</div>
                  <div className="text-xs text-gray-500">Deep clean</div>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/fence-washing"
                className="flex flex-col items-center px-2 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md text-center"
              >
                <img src="/lovable-uploads/b18323e2-db3c-4f96-af15-171ee39301bc.png" alt="Fence Washing" className="mb-2 h-8 w-8 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Fence Washing</div>
                  <div className="text-xs text-gray-500">Restore curb appeal</div>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/deck-cleaning"
                className="flex flex-col items-center px-2 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md text-center"
              >
                <img src="/lovable-uploads/6efc066c-cf14-4550-a6ab-dd1184a2b519.png" alt="Deck Cleaning" className="mb-2 h-8 w-8 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Deck Cleaning</div>
                  <div className="text-xs text-gray-500">Wood restoration</div>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/driveway-cleaning"
                className="flex flex-col items-center px-2 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md text-center"
              >
                <img src="/lovable-uploads/b5967047-dddc-47e1-a23c-dd4a5feb9125.png" alt="Driveway Cleaning" className="mb-2 h-8 w-8 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Driveway Cleaning</div>
                  <div className="text-xs text-gray-500">Oil stain removal</div>
                </div>
              </Link>
            </DropdownMenuItem>
          </div>
        </div>

        {/* Commercial Services Section */}
        <div className="border-t border-gray-100 p-2">
          <div className="text-sm font-semibold text-gray-500 uppercase px-4 py-2">Commercial Services</div>
          
          <div className="grid grid-cols-1 gap-1">
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/commercial-window-cleaning"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md"
              >
                <img src="/lovable-uploads/5b1d271e-15e2-4bf4-87ce-4ad9e9aadc75.png" alt="Commercial Window Cleaning" className="mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Commercial Window Cleaning</div>
                  <div className="text-xs text-gray-500">Professional office cleaning</div>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/commercial-building-washing"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md"
              >
                <Building2 className="mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Building Washing</div>
                  <div className="text-xs text-gray-500">Exterior maintenance</div>
                </div>
              </Link>
            </DropdownMenuItem>
            
            <DropdownMenuItem asChild className="p-0">
              <Link
                to="/services/parking-lot-cleaning"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full rounded-md"
              >
                <img src="/lovable-uploads/0413d26c-fb32-4ac3-ad1c-8e24f7878b90.png" alt="Parking Lot Cleaning" className="mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm">Parking Lot Cleaning</div>
                  <div className="text-xs text-gray-500">Commercial surfaces</div>
                </div>
              </Link>
            </DropdownMenuItem>
          </div>
        </div>

        {/* Compare Services */}
        <div className="border-t border-gray-100 p-2">
          <DropdownMenuItem asChild className="p-0">
            <Link
              to="/services"
              className="flex items-center justify-center px-4 py-3 text-bc-red hover:bg-gray-50 hover:text-red-700 transition-colors w-full rounded-md font-medium text-sm"
            >
              View All Services
            </Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServicesDropdown;
