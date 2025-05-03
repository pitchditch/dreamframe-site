
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Droplets, Home, MessageSquare, Phone, Shield, Wind } from 'lucide-react';
import { Link } from "react-router-dom";
import { useTranslation } from '@/hooks/use-translation';
import { useLocation } from 'react-router-dom';

interface NavbarDesktopProps {
  isOverVideo: boolean;
}

export const NavbarDesktop = ({ isOverVideo }: NavbarDesktopProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  
  const textColor = isOverVideo ? 'text-white' : 'text-gray-800';
  const hoverBgColor = isOverVideo ? 'hover:bg-white/10' : 'hover:bg-gray-100';
  
  const classNames = {
    button: `${textColor} px-4`,
    link: `${textColor} ${hoverBgColor} rounded-md px-3 py-2 text-sm font-medium transition-all duration-200`,
    activeLink: `${isOverVideo ? 'bg-white/10' : 'bg-gray-100'} rounded-md px-3 py-2 text-sm font-medium`,
    trigger: `${textColor} ${hoverBgColor} rounded-md px-3 py-2 text-sm font-medium group inline-flex items-center transition-all duration-200`,
  };

  const isActive = (path: string) => {
    // Check if current path starts with provided path (for nested routes)
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <NavigationMenu className="hidden lg:block mx-6">
      <NavigationMenuList className="flex items-center gap-4">
        {/* Why Us */}
        <NavigationMenuItem>
          <Link to="/why-us" className={isActive('/why-us') ? classNames.activeLink : classNames.link}>
            {t('Why Us')}
          </Link>
        </NavigationMenuItem>
        
        {/* Residential Services Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={classNames.trigger}>
            {t('Residential Services')}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2 gap-3 p-6 w-[500px] bg-white rounded-lg shadow-lg">
              <Link to="/services/window-cleaning" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-all duration-200">
                <div className="bg-blue-50 p-2 rounded-lg mr-3">
                  <Droplets className="text-blue-500 navbar-service-icon" size={24} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{t('Window Cleaning')}</div>
                  <div className="text-sm text-gray-500">{t('Crystal clear windows')}</div>
                </div>
              </Link>
              <Link to="/services/pressure-washing" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-all duration-200">
                <div className="bg-red-50 p-2 rounded-lg mr-3">
                  <Home className="text-bc-red navbar-service-icon" size={24} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{t('Pressure Washing')}</div>
                  <div className="text-sm text-gray-500">{t('Remove dirt & grime')}</div>
                </div>
              </Link>
              <Link to="/services/gutter-cleaning" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-all duration-200">
                <div className="bg-green-50 p-2 rounded-lg mr-3">
                  <Wind className="text-green-600 navbar-service-icon" size={24} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{t('Gutter Cleaning')}</div>
                  <div className="text-sm text-gray-500">{t('Prevent water damage')}</div>
                </div>
              </Link>
              <Link to="/services/roof-cleaning" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-all duration-200">
                <div className="bg-amber-50 p-2 rounded-lg mr-3">
                  <Home className="text-amber-700 navbar-service-icon" size={24} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{t('Roof Cleaning')}</div>
                  <div className="text-sm text-gray-500">{t('Remove moss & debris')}</div>
                </div>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        {/* Commercial Services Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={classNames.trigger}>
            {t('Commercial Services')}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2 gap-3 p-6 w-[500px] bg-white rounded-lg shadow-lg">
              <Link to="/services/commercial-window-cleaning" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-all duration-200">
                <div className="bg-blue-50 p-2 rounded-lg mr-3">
                  <Droplets className="text-blue-600 navbar-service-icon" size={24} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{t('Commercial Window Cleaning')}</div>
                  <div className="text-sm text-gray-500">{t('For businesses & offices')}</div>
                </div>
              </Link>
              <Link to="/services/commercial-pressure-washing" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-all duration-200">
                <div className="bg-blue-50 p-2 rounded-lg mr-3">
                  <Home className="text-blue-700 navbar-service-icon" size={24} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{t('Commercial Pressure Washing')}</div>
                  <div className="text-sm text-gray-500">{t('For storefronts & facilities')}</div>
                </div>
              </Link>
              <Link to="/services/post-construction-cleaning" className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-all duration-200">
                <div className="bg-purple-50 p-2 rounded-lg mr-3">
                  <MessageSquare className="text-purple-600 navbar-service-icon" size={24} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{t('Post-Construction Cleaning')}</div>
                  <div className="text-sm text-gray-500">{t('Final cleaning after construction')}</div>
                </div>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        {/* Get a Quote Button */}
        <NavigationMenuItem>
          <Button asChild className="bg-bc-red hover:bg-red-700 text-white rounded-full transition-all duration-200 shadow hover:shadow-md">
            <Link to="/contact">
              <MessageSquare className="mr-2" size={16} />
              {t('Get a Quote')}
            </Link>
          </Button>
        </NavigationMenuItem>
        
        {/* Phone Button */}
        <NavigationMenuItem>
          <Button asChild variant="outline" className={`${textColor} border rounded-full transition-all duration-200 shadow hover:shadow-md ${isOverVideo ? 'border-white/70 hover:bg-white/20' : 'border-gray-300 hover:bg-gray-100'}`}>
            <a href="tel:7788087620">
              <Phone className="mr-2" size={16} />
              778-808-7620
            </a>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
