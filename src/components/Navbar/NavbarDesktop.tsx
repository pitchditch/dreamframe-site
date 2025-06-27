
import { Link } from 'react-router-dom';
import { Phone, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const NavbarDesktop = ({ isOverVideo }: { isOverVideo: boolean }) => {
  const textColor = isOverVideo ? 'text-white' : 'text-gray-700';
  const hoverColor = isOverVideo ? 'hover:text-yellow-300' : 'hover:text-bc-red';

  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link
        to="/"
        className={`${textColor} ${hoverColor} transition-all duration-200 hover:scale-110 font-medium text-lg`}
      >
        Home
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger className={`flex items-center ${textColor} ${hoverColor} transition-all duration-200 hover:scale-110 font-medium text-lg`}>
          Services <ChevronDown className="ml-1 h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-md w-64">
          <DropdownMenuItem asChild>
            <Link to="/services/window-cleaning" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors">
              Window Cleaning
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/services/pressure-washing" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors">
              Pressure Washing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/services/gutter-cleaning" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors">
              Gutter Cleaning
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/services/roof-cleaning" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors">
              Roof Cleaning
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/services/house-wash" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors">
              House Washing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/services/commercial-window-cleaning" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors">
              Commercial Window Cleaning
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/services/commercial-pressure-washing" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors">
              Commercial Pressure Washing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/services/post-construction-window-cleaning" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors">
              Post-Construction Window Cleaning
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link
        to="/testimonials"
        className={`${textColor} ${hoverColor} transition-all duration-200 hover:scale-110 font-medium text-lg`}
      >
        Testimonials
      </Link>

      <Link
        to="/why-us"
        className={`${textColor} ${hoverColor} transition-all duration-200 hover:scale-110 font-medium text-lg`}
      >
        Why Us
      </Link>

      <Link
        to="/calculator"
        className={`${textColor} ${hoverColor} transition-all duration-200 hover:scale-110 font-medium text-lg`}
      >
        Get Quote
      </Link>

      <Link
        to="/contact"
        className={`${textColor} ${hoverColor} transition-all duration-200 hover:scale-110 font-medium text-lg`}
      >
        Contact
      </Link>

      <a
        href="tel:7788087620"
        className={`flex items-center ${isOverVideo ? 'bg-bc-red text-white hover:bg-red-700' : 'bg-bc-red text-white hover:bg-red-700'} px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 font-medium text-lg`}
      >
        <Phone size={16} className="mr-2" />
        (778) 808-7620
      </a>
    </div>
  );
};
