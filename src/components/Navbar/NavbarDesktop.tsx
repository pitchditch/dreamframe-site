
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { CalendarClock, Droplets, Home, Info, MapPin, MessageSquare, PhoneCall, Star, Wind } from 'lucide-react';
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
  const borderColor = isOverVideo ? 'border-white' : 'border-gray-200';
  const hoverBgColor = isOverVideo ? 'hover:bg-white/10' : 'hover:bg-gray-100';
  
  const classNames = {
    button: `${textColor} ${borderColor} ${hoverBgColor} px-4`,
    link: `${textColor} ${hoverBgColor} rounded-md px-3 py-2 text-sm font-medium`,
    activeLink: `${isOverVideo ? 'bg-white/10' : 'bg-gray-100'} rounded-md px-3 py-2 text-sm font-medium`,
    trigger: `${textColor} ${hoverBgColor} rounded-md px-3 py-2 text-sm font-medium group inline-flex items-center`,
  };

  const isActive = (path: string) => {
    // Check if current path starts with provided path (for nested routes)
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  return (
    <NavigationMenu className="hidden lg:block mx-6">
      <NavigationMenuList className="flex items-center gap-1">
        {/* Home */}
        <NavigationMenuItem>
          <Link to="/" className={isActive('/') ? classNames.activeLink : classNames.link}>
            {t('Home')}
          </Link>
        </NavigationMenuItem>
        
        {/* Services Dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={classNames.trigger}>
            {t('Services')}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-2 gap-3 p-6 w-[600px]">
              <div className="col-span-2">
                <h3 className="font-semibold mb-2 text-lg">{t('Residential Services')}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/services/window-cleaning" className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
                    <Droplets className="text-bc-red mr-3 navbar-service-icon" size={28} />
                    <div>
                      <div className="font-medium">{t('Window Cleaning')}</div>
                      <div className="text-sm text-gray-500">{t('Crystal clear windows')}</div>
                    </div>
                  </Link>
                  <Link to="/services/pressure-washing" className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
                    <Home className="text-blue-500 mr-3 navbar-service-icon" size={28} />
                    <div>
                      <div className="font-medium">{t('Pressure Washing')}</div>
                      <div className="text-sm text-gray-500">{t('Remove dirt & grime')}</div>
                    </div>
                  </Link>
                  <Link to="/services/gutter-cleaning" className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
                    <Wind className="text-green-600 mr-3 navbar-service-icon" size={28} />
                    <div>
                      <div className="font-medium">{t('Gutter Cleaning')}</div>
                      <div className="text-sm text-gray-500">{t('Prevent water damage')}</div>
                    </div>
                  </Link>
                  <Link to="/services/roof-cleaning" className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
                    <Home className="text-amber-700 mr-3 navbar-service-icon" size={28} />
                    <div>
                      <div className="font-medium">{t('Roof Cleaning')}</div>
                      <div className="text-sm text-gray-500">{t('Remove moss & debris')}</div>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-span-2 mt-4">
                <h3 className="font-semibold mb-2 text-lg">{t('Commercial Services')}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/services/commercial-window-cleaning" className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
                    <Droplets className="text-blue-600 mr-3 navbar-service-icon" size={28} />
                    <div>
                      <div className="font-medium">{t('Commercial Window Cleaning')}</div>
                      <div className="text-sm text-gray-500">{t('For businesses & offices')}</div>
                    </div>
                  </Link>
                  <Link to="/services/commercial-pressure-washing" className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
                    <Home className="text-blue-700 mr-3 navbar-service-icon" size={28} />
                    <div>
                      <div className="font-medium">{t('Commercial Pressure Washing')}</div>
                      <div className="text-sm text-gray-500">{t('For storefronts & facilities')}</div>
                    </div>
                  </Link>
                  <Link to="/services/post-construction-cleaning" className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
                    <CalendarClock className="text-purple-600 mr-3 navbar-service-icon" size={28} />
                    <div>
                      <div className="font-medium">{t('Post-Construction Cleaning')}</div>
                      <div className="text-sm text-gray-500">{t('Final cleaning after construction')}</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        {/* About */}
        <NavigationMenuItem>
          <Link to="/why-us" className={isActive('/why-us') ? classNames.activeLink : classNames.link}>
            {t('Why Us')}
          </Link>
        </NavigationMenuItem>
        
        {/* Areas We Serve */}
        <NavigationMenuItem>
          <Link to="/contact" className={isActive('/contact') ? classNames.activeLink : classNames.link}>
            <MapPin className="inline-block mr-1" size={16} />
            {t('Areas We Serve')}
          </Link>
        </NavigationMenuItem>
        
        {/* Testimonials */}
        <NavigationMenuItem>
          <Link to="/testimonials" className={isActive('/testimonials') ? classNames.activeLink : classNames.link}>
            <Star className="inline-block mr-1" size={16} />
            {t('Testimonials')}
          </Link>
        </NavigationMenuItem>
        
        {/* Contact */}
        <NavigationMenuItem>
          <Button asChild variant="outline" className={classNames.button}>
            <a href="tel:7788087620">
              <PhoneCall className="mr-2" size={16} />
              778-808-7620
            </a>
          </Button>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Button asChild className="bg-bc-red hover:bg-red-700 text-white">
            <Link to="/contact">
              <MessageSquare className="mr-2" size={16} />
              {t('Get a Quote')}
            </Link>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
