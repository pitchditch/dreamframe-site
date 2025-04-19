
import { NavLink } from './NavLink';
import { useTranslation } from '@/hooks/use-translation';
import PriceCalculatorOverlay from '../PriceCalculatorOverlay';
import { Phone } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavbarDesktopProps {
  isOverVideo: boolean;
  isServicesMenuOpen: boolean;
  setIsServicesMenuOpen: (isOpen: boolean) => void;
}

export const NavbarDesktop = ({ isOverVideo, isServicesMenuOpen, setIsServicesMenuOpen }: NavbarDesktopProps) => {
  const { t } = useTranslation();
  
  return (
    <nav className="hidden md:flex items-center justify-between w-full">
      <div className="flex items-center gap-8">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className={`text-xl ${isOverVideo ? 'text-white' : 'text-gray-800'} hover:text-bc-red`}
              >
                Residential
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavLink to="/services/window-cleaning" isOverVideo={isOverVideo}>
                    Window Cleaning
                  </NavLink>
                  <NavLink to="/services/pressure-washing" isOverVideo={isOverVideo}>
                    Pressure Washing
                  </NavLink>
                  <NavLink to="/services/gutter-cleaning" isOverVideo={isOverVideo}>
                    Gutter Cleaning
                  </NavLink>
                  <NavLink to="/services/roof-cleaning" isOverVideo={isOverVideo}>
                    Roof Cleaning
                  </NavLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className={`text-xl ${isOverVideo ? 'text-white' : 'text-gray-800'} hover:text-bc-red`}
              >
                Commercial
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 w-[400px]">
                  <NavLink to="/services/commercial-window-cleaning" isOverVideo={isOverVideo}>
                    Commercial Window Cleaning
                  </NavLink>
                  <NavLink to="/services/commercial-pressure-washing" isOverVideo={isOverVideo}>
                    Commercial Pressure Washing
                  </NavLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavLink 
          to="/why-us" 
          isOverVideo={isOverVideo} 
          className={`text-xl ${isOverVideo ? 'text-white' : 'text-gray-800'} hover:text-bc-red`}
        >
          Why Us
        </NavLink>
      </div>

      <div className="flex items-center gap-12 flex-1 justify-end">
        <a 
          href="tel:7788087620" 
          className={`flex items-center gap-2 ${
            isOverVideo ? 'text-white' : 'text-gray-800'
          } hover:text-bc-red transition-colors whitespace-nowrap text-2xl md:text-3xl`}
        >
          <Phone className="w-6 h-6" />
          778-808-7620
        </a>
        <PriceCalculatorOverlay 
          buttonText="Contact Us" 
          className="bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded-lg font-medium" 
        />
      </div>
    </nav>
  );
};
